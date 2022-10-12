'use strict';

const Action = require('./Action');
const Events = require('../../Util/Events');

/**
 * Dữ liệu nhận được trong sự kiện {@link Client#event:applicationCommandPermissionsUpdate}
 * @typedef {Object} ApplicationCommandPermissionsUpdateData
 * @property {Snowflake} Id của lệnh hoặc thực thể toàn cầu đã được cập nhật
 * @property {Snowflake} guildId Id của guild trong đó các quyền đã được cập nhật
 * @property {Snowflake} applicationId Id của ứng dụng sở hữu lệnh hoặc thực thể đang được cập nhật
 * @property {ApplicationCommandPermissions[]} quyền Các quyền được cập nhật
 */

class ApplicationCommandPermissionsUpdateAction extends Action {
  handle(data) {
    const client = this.client;
    /** 
    * Được cấp bất cứ khi nào quyền đối với lệnh ứng dụng trong bang hội được cập nhật. 
    * <warn> Điều này bao gồm các bản cập nhật quyền cho các ứng dụng khác ngoài ứng dụng khách đã đăng nhập, 
    * kiểm tra `data.applicationId` để xác minh bản cập nhật dành cho ứng dụng nào </warn> 
    * @event Client #applicationCommandPermissionsUpdate Dữ liệu
    * @param {ApplicationCommandPermissionsUpdateData} Các quyền đã cập nhật
    */
    client.emit(Events.ApplicationCommandPermissionsUpdate, {
      permissions: data.permissions,
      id: data.id,
      guildId: data.guild_id,
      applicationId: data.application_id,
    });
  }
}

module.exports = ApplicationCommandPermissionsUpdateAction;
