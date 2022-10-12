'use strict';

const Events = require('../../Util/Events');

/**
 * Quản lý kết nối voice cho máy khách
 */
class ClientVoiceManager {
  constructor(client) {
    /**
     * Khách hàng đã khởi tạo trình quản lý giọng nói này
     * @loại hình {Client}
     * @chỉ đọc
     * @Tên ClientVoiceManager#client
     */
    Object.defineProperty(this, 'client', { value: client });

    /**
     * Các id guild trên bản đồ cho bộ điều hợp giọng nói được tạo để sử dụng với @discordjs/voice.
     * @loại hình {Map<Snowflake, Object>}
     */
    this.adapters = new Map();

    client.on(Events.ShardDisconnect, (_, shardId) => {
      for (const [guildId, adapter] of this.adapters.entries()) {
        if (client.guilds.cache.get(guildId)?.shardId === shardId) {
          adapter.destroy();
        }
      }
    });
  }

  onVoiceServer(payload) {
    this.adapters.get(payload.guild_id)?.onVoiceServerUpdate(payload);
  }

  onVoiceStateUpdate(payload) {
    if (payload.guild_id && payload.session_id && payload.user_id === this.client.user?.id) {
      this.adapters.get(payload.guild_id)?.onVoiceStateUpdate(payload);
    }
  }
}

module.exports = ClientVoiceManager;