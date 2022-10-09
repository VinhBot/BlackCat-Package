'use strict';

const Action = require('./Action');
const Events = require('../../Util/Events');

class GuildBanAdd extends Action {
  handle(data) {
    const client = this.client;
    const guild = client.guilds.cache.get(data.guild_id);
    if (guild) client.emit(Events.GuildBanAdd, guild.bans._add(data));
  }
}

module.exports = GuildBanAdd;
