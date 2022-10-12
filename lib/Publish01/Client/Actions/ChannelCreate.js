'use strict';

const Action = require('./Action');
const Events = require('../../Util/Events');

class ChannelCreateAction extends Action {
  handle(data) {
    const client = this.client;
    const existing = client.channels.cache.has(data.id);
    const channel = client.channels._add(data);
    if (!existing && channel) {
      /** 
        * Được phát ra bất cứ khi nào kênh guild được tạo. 
        * @event Client # channelCreate 
        * @param {GuildChannel} kênh Kênh đã được tạo
        */
      client.emit(Events.ChannelCreate, channel);
    }
    return { channel };
  }
}

module.exports = ChannelCreateAction;
