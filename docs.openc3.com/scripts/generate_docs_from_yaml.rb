require 'erb'

require 'psych'
require 'tempfile'

class Array
  def to_meta_config_yaml(indentation = 0)
    Psych.dump(self).split("\n")[1..-1].join("\n#{' '*indentation}")
  end
end
class Hash
  def to_meta_config_yaml(indentation = 0)
    Psych.dump(self).split("\n")[1..-1].join("\n#{' '*indentation}")
  end
end

# Reads YAML formatted files describing a configuration file
class MetaConfigParser
  class System
    def self.targets
      { 'Any Target Name' => '' }
    end
  end

  def self.load(filename)
    data = nil
    tf = Tempfile.new("temp.yaml")
    cwd = Dir.pwd
    Dir.chdir(File.dirname(filename))
    data = File.read(File.basename(filename))
    output = ERB.new(data).result(binding)
    tf.write(output)
    tf.close
    begin
      data = Psych.load_file(tf.path, aliases: true)
    rescue => error
      error_file = "ERROR_#{filename}"
      File.open(error_file, 'w') { |file| file.puts output }
      raise error.exception("#{error.message}\n\nParsed output written to #{File.expand_path(error_file)}\n")
    end
    tf.unlink
    Dir.chdir(cwd)
    data
  end

  def self.dump(object, filename)
    File.open(filename, 'w') do |file|
      file.write Psych.dump(object)
    end
  end
end

class CosmosMetaTag
  def initialize(text)
    @yaml_file = text
    @modifiers = {}
    @collection = {}
    @settings = {}
    @level = 2
  end

  def render
    page = ''
    puts "Processing #{@yaml_file}"
    meta = MetaConfigParser.load(@yaml_file)
    build_page(meta, page)
    page
  end

  def build_page(meta, page)
    modifiers = {}
    meta.each do |keyword, data|
      page << "\n#{'#' * @level} #{keyword}\n"
      if data['since']
        page << '<div class="right">'
        page <<  "(Since #{data['since']})"
        page << '</div>'
      end
      page << "**#{data['summary']}**\n\n"

      page << "#{data['description']}\n\n" if data['description']
      if data['warning']
        page << ":::warning\n"
        page << "#{data['warning']}\n"
        page << ":::\n\n"
      end
      if data['parameters']
        page << "| Parameter | Description | Required |\n"
        page << "|-----------|-------------|----------|\n"
        build_parameters(data['parameters'], page)
      end
      if data['example']
        page << "\nExample Usage:\n"
        page << "```ruby\n"
        page << "#{data['example'].strip}\n"
        page << "```\n"
      end
      saved_level = @level
      if data['modifiers']
        bump_level = false
        unless @modifiers.values.include?(data['modifiers'].keys)
          if bump_level == false
            bump_level = true
            @level += 1
          end
          @modifiers[keyword] = data['modifiers'].keys
          page << "\n#{'#' * (@level - 1)} #{keyword} Modifiers\n"
          page << "The following keywords must follow a #{keyword} keyword.\n"
          build_page(data['modifiers'], page)
        end
      end
      if data['collection']
        bump_level = false
        unless @collection.values.include?(data['collection'].keys)
          if bump_level == false
            bump_level = true
            @level += 1
          end
          @collection[keyword] = data['collection'].keys
          build_page(data['collection'], page)
        end
      end
      if data['settings']
        bump_level = false
        # unless @settings.values.include?(data['settings'].keys)
          if bump_level == false
            bump_level = true
            @level += 1
          end
          # @settings[keyword] = data['settings'].keys
          # page << "\n#{'#' * (@level - 1)} #{keyword} Settings\n"
          page << "The following settings apply to #{keyword}. They are applied using the SETTING keyword."
          build_page(data['settings'], page)
        # end
      end
      @level = saved_level
    end
  end

  def build_parameters(parameters, page)
    parameters.each do |param|
      description = param['description']
      if param['warning']
        description << '<br/><br/><span class="param_warning">'
        description << "Warning: #{param['warning']}"
        description << "</span>"
      end
      if param['values'].is_a?(Hash)
        description << "<br/><br/>Valid Values: <span class=\"values\">#{param["values"].keys.join(", ")}</span>"
        page << "| #{param['name']} | #{description} | #{param['required'] ? 'True' : 'False'} |\n"
        subparams = {}
        param['values'].each do |keyword, data|
          subparams[data['parameters']] ||= []
          subparams[data['parameters']] << keyword
        end
        # Special key that means we don't traverse subparameters but instead
        # just use the special documentation given
        if param.keys.include?('documentation')
          page << "\n#{param['documentation']}\n"
        else
          subparams.each do |parameters, keywords|
            if parameters
              page << "\nWhen #{param['name']} is #{keywords.join(', ')} the remaining parameters are:\n\n"
              build_parameters(parameters, page)
            end
          end
        end
      elsif param['values'].is_a? Array
        description << "<br/><br/>Valid Values: <span class=\"values\">#{param["values"].join(", ")}</span>"
        page << "| #{param['name']} | #{description} | #{param['required'] ? 'True' : 'False'} |\n"
      else
        page << "| #{param['name']} | #{description} | #{param['required'] ? 'True' : 'False'} |\n"
      end
    end
  end
end

if ARGV[0] == 'PLUGIN'
  docs = [
    ['../docs/configuration/_target.md', '/openc3/data/config/target_config.yaml'],
    ['../docs/configuration/_table.md', '/openc3/data/config/table_manager.yaml'],
    ['../docs/configuration/_telemetry-screens.md', '/openc3/data/config/screen.yaml'],
    ['../docs/configuration/_command.md', '/openc3/data/config/command.yaml'],
    ['../docs/configuration/_plugins.md', '/openc3/data/config/plugins.yaml'],
    ['../docs/configuration/_telemetry.md', '/openc3/data/config/telemetry.yaml'],
  ]
else
  docs = [
    ['../docs/configuration/_target.md', '../../openc3/data/config/target_config.yaml'],
    ['../docs/configuration/_table.md', '../../openc3/data/config/table_manager.yaml'],
    ['../docs/configuration/_telemetry-screens.md', '../../openc3/data/config/screen.yaml'],
    ['../docs/configuration/_command.md', '../../openc3/data/config/command.yaml'],
    ['../docs/configuration/_plugins.md', '../../openc3/data/config/plugins.yaml'],
    ['../docs/configuration/_telemetry.md', '../../openc3/data/config/telemetry.yaml'],
  ]
end

docs.each do |partial, yaml_file|
  tag = CosmosMetaTag.new(yaml_file)
  content = tag.render
  partial_contents = File.read(partial)
  partial_contents.gsub!("COSMOS_META", content)
  dirname = File.dirname(partial)
  basename = File.basename(partial)
  new_basename = File.join(dirname, basename[1..-1])
  File.open(new_basename, 'w') do |file|
    file.write(partial_contents)
  end
  puts "Wrote: #{new_basename}"
end
