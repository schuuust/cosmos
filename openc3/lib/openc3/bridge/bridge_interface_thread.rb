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

require 'openc3/tools/cmd_tlm_server/interface_thread'

module OpenC3
  class BridgeInterfaceThread < InterfaceThread
    protected

    def handle_packet(packet)
      @interface.routers.each do |router|
        if router.connected?
          if router.write_allowed?
            begin
              router.write(packet)
            rescue Exception => err
              Logger.error "Error routing telemetry from #{@interface.name} to router #{router.name}\n#{err.formatted}"
            end
          end
        else
          Logger.error "Attempted to route telemetry from #{@interface.name} to disconnected router #{router.name}"
        end
      end
    end
  end # class BridgeInterfaceThread
end
