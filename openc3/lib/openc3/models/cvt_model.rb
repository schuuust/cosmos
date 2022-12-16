# encoding: ascii-8bit

# Copyright 2022 Ball Aerospace & Technologies Corp.
# All Rights Reserved.
#
# This program is free software; you can modify and/or redistribute it
# under the terms of the GNU Affero General Public License
# as published by the Free Software Foundation; version 3 with
# attribution addendums as found in the LICENSE.txt
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU Affero General Public License for more details.

# Modified by OpenC3, Inc.
# All changes Copyright 2022, OpenC3, Inc.
# All Rights Reserved
#
# This file may also be used under the terms of a commercial license
# if purchased from OpenC3, Inc.

require 'openc3/utilities/store'

module OpenC3
  class CvtModel
    VALUE_TYPES = [:RAW, :CONVERTED, :FORMATTED, :WITH_UNITS]
    # Stores telemetry item overrides which are returned on every request to get_item
    @overrides = {}

    def self.build_json_from_packet(packet)
      packet.decom
    end

    # Delete the current value table for a target
    def self.del(target_name:, packet_name:, scope:)
      Store.hdel("#{scope}__tlm__#{target_name}", packet_name)
    end

    # Set the current value table for a target, packet
    def self.set(hash, target_name:, packet_name:, scope:)
      Store.hset("#{scope}__tlm__#{target_name}", packet_name, JSON.generate(hash.as_json(:allow_nan => true)))
    end

    # Set an item in the current value table
    def self.set_item(target_name, packet_name, item_name, value, type:, scope:)
      case type
      when :WITH_UNITS
        field = "#{item_name}__U"
        value = value.to_s # WITH_UNITS should always be a string
      when :FORMATTED
        field = "#{item_name}__F"
        value = value.to_s # FORMATTED should always be a string
      when :CONVERTED
        field = "#{item_name}__C"
      when :RAW
        field = item_name
      else
        raise "Unknown type '#{type}' for #{target_name} #{packet_name} #{item_name}"
      end
      hash = JSON.parse(Store.hget("#{scope}__tlm__#{target_name}", packet_name), :allow_nan => true, :create_additions => true)
      hash[field] = value
      Store.hset("#{scope}__tlm__#{target_name}", packet_name, JSON.generate(hash.as_json(:allow_nan => true)))
    end

    # Get an item from the current value table
    def self.get_item(target_name, packet_name, item_name, type:, scope:)
      if @overrides["#{target_name}__#{packet_name}__#{item_name}__#{type}"]
        return @overrides["#{target_name}__#{packet_name}__#{item_name}__#{type}"]
      end

      types = []
      case type
      when :WITH_UNITS
        types = ["#{item_name}__U", "#{item_name}__F", "#{item_name}__C", item_name]
      when :FORMATTED
        types = ["#{item_name}__F", "#{item_name}__C", item_name]
      when :CONVERTED
        types = ["#{item_name}__C", item_name]
      when :RAW
        types = [item_name]
      else
        raise "Unknown type '#{type}' for #{target_name} #{packet_name} #{item_name}"
      end
      hash = JSON.parse(Store.hget("#{scope}__tlm__#{target_name}", packet_name), :allow_nan => true, :create_additions => true)
      hash.values_at(*types).each do |result|
        if result
          if type == :FORMATTED or type == :WITH_UNITS
            return result.to_s
          end
          return result
        end
      end
      return nil
    end

    # Return all item values and limit state from the CVT
    #
    # @param items [Array<String>] Items to return. Must be formatted as TGT__PKT__ITEM__TYPE
    # @param stale_time [Integer] Time in seconds from Time.now that value will be marked stale
    # @return [Array] Array of values
    def self.get_tlm_values(items, stale_time: 30, scope: $openc3_scope)
      now = Time.now.sys.to_f
      results = []
      lookups = []
      packet_lookup = {}
      # First generate a lookup hash of all the items represented so we can query the CVT
      items.each { |item| _parse_item(lookups, item) }

      lookups.each do |target_packet_key, target_name, packet_name, value_keys|
        unless packet_lookup[target_packet_key]
          packet = Store.hget("#{scope}__tlm__#{target_name}", packet_name)
          raise "Packet '#{target_name} #{packet_name}' does not exist" unless packet
          packet_lookup[target_packet_key] = JSON.parse(packet, :allow_nan => true, :create_additions => true)
        end
        hash = packet_lookup[target_packet_key]
        item_result = []
        if value_keys.is_a?(Hash) # Set in _parse_item to indicate override
          item_result[0] = value_keys['value']
        else
          value_keys.each do |key|
            item_result[0] = hash[key]
            break if item_result[0] # We want the first value
          end
          # If we were able to find a value, try to get the limits state
          if item_result[0]
            if now - hash['RECEIVED_TIMESECONDS'] > stale_time
              item_result[1] = :STALE
            else
              # The last key is simply the name (RAW) so we can append __L
              # If there is no limits then it returns nil which is acceptable
              item_result[1] = hash["#{value_keys[-1]}__L"]
              item_result[1] = item_result[1].intern if item_result[1] # Convert to symbol
            end
          else
            raise "Item '#{target_name} #{packet_name} #{value_keys[-1]}' does not exist" unless hash.key?(value_keys[-1])
            item_result[1] = nil
          end
        end
        results << item_result
      end
      results
    end

    # Override a current value table item such that it always returns the same value
    # for the given type
    def self.override(target_name, packet_name, item_name, value, type: :ALL, scope: $openc3_scope)
      if type == :ALL
        @overrides["#{target_name}__#{packet_name}__#{item_name}__RAW"] = value
        @overrides["#{target_name}__#{packet_name}__#{item_name}__CONVERTED"] = value
        # COSMOS data type contract is that FORMATTED and WITH_UNITS are always strings
        @overrides["#{target_name}__#{packet_name}__#{item_name}__FORMATTED"] = value.to_s
        @overrides["#{target_name}__#{packet_name}__#{item_name}__WITH_UNITS"] = value.to_s
      else
        if VALUE_TYPES.include?(type)
          # COSMOS data type contract is that FORMATTED and WITH_UNITS are always strings
          if type == :FORMATTED or type == :WITH_UNITS
            type = type.to_s
          end
          @overrides["#{target_name}__#{packet_name}__#{item_name}__#{type}"] = value
        else
          raise "Unknown type '#{type}' for #{target_name} #{packet_name} #{item_name}"
        end
      end
    end

    # Normalize a current value table item such that it returns the actual value
    def self.normalize(target_name, packet_name, item_name, type: :ALL, scope: $openc3_scope)
      if type == :ALL
        VALUE_TYPES.each do |type|
          @overrides.delete("#{target_name}__#{packet_name}__#{item_name}__#{type}")
        end
      else
        if VALUE_TYPES.include?(type)
          @overrides.delete("#{target_name}__#{packet_name}__#{item_name}__#{type}")
        else
          raise "Unknown type '#{type}' for #{target_name} #{packet_name} #{item_name}"
        end
      end
    end

    # PRIVATE METHODS

    def self._parse_item(lookups, item)
      # parse item and update lookups with packet_name and target_name and keys
      #
      # return an ordered array of hash with keys
      target_name, packet_name, item_name, value_type = item.split('__')
      raise ArgumentError, "items must be formatted as TGT__PKT__ITEM__TYPE" if target_name.nil? || packet_name.nil? || item_name.nil? || value_type.nil?

      if @overrides["#{target_name}__#{packet_name}__#{item_name}__#{value_type}"]
        # Set the result as a Hash to distingish it from the key array and from an overridden Array value
        keys = {'value' => @overrides["#{target_name}__#{packet_name}__#{item_name}__#{value_type}"]}
      else
        # We build lookup keys by including all the less formatted types to gracefully degrade lookups
        # This allows the user to specify WITH_UNITS and if there is no conversions it will simply return the RAW value
        case value_type.upcase
        when 'RAW'
          keys = [item_name]
        when 'CONVERTED'
          keys = ["#{item_name}__C", item_name]
        when 'FORMATTED'
          keys = ["#{item_name}__F", "#{item_name}__C", item_name]
        when 'WITH_UNITS'
          keys = ["#{item_name}__U", "#{item_name}__F", "#{item_name}__C", item_name]
        else
          raise "Unknown value type #{value_type}"
        end
      end
      lookups << ["#{target_name}__#{packet_name}", target_name, packet_name, keys]
    end
  end
end
