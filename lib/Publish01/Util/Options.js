'use strict';

const process = require('node:process');
const { DefaultRestOptions } = require('../../Publish02/index');
const { toSnakeCase } = require('./Transformers');

/**
 * @typedef {Function} CacheFactory
 * @param {Function} manager The manager class the cache is being requested from.
 * @param {Function} holds The class that the cache will hold.
 * @returns {Collection} A Collection used to store the cache of the manager.
 */

/**
 * Các tùy chọn cho một khách hàng.
 * @typedef {Object} ClientOptions
 * @property {number|number[]|string} [shards] The shard's id to run, or an array of shard ids. If not specified,
 * the client will spawn {@link ClientOptions#shardCount} shards. If set to `auto`, it will fetch the
 * recommended amount of shards from Discord and spawn that amount
 * @property {number} [closeTimeout=5_000] The amount of time in milliseconds to wait for the close frame to be received
 * from the WebSocket. Don't have this too high/low. Its best to have it between 2_000-6_000 ms.
 * @property {number} [shardCount=1] The total amount of shards used by all processes of this bot
 * (e.g. recommended shard count, shard count of the ShardingManager)
 * @property {CacheFactory} [makeCache] Function to create a cache.
 * You can use your own function, or the {@link Options} class to customize the Collection used for the cache.
 * <warn>Overriding the cache used in `GuildManager`, `ChannelManager`, `GuildChannelManager`, `RoleManager`,
 * and `PermissionOverwriteManager` is unsupported and **will** break functionality</warn>
 * @property {MessageMentionOptions} [allowedMentions] Default value for {@link MessageOptions#allowedMentions}
 * @property {Partials[]} [partials] Structures allowed to be partial. This means events can be emitted even when
 * they're missing all the data for a particular structure. See the "Partial Structures" topic on the
 * [guide](https://discordjs.guide/popular-topics/partials.html) for some
 * important usage information, as partials require you to put checks in place when handling data.
 * @property {boolean} [failIfNotExists=true] Default value for {@link ReplyMessageOptions#failIfNotExists}
 * @property {PresenceData} [presence={}] Presence data to use upon login
 * @property {IntentsResolvable} intents Intents to enable for this connection
 * @property {number} [waitGuildTimeout=15_000] Time in milliseconds that clients with the
 * {@link GatewayIntentBits.Guilds} gateway intent should wait for missing guilds to be received before being ready.
 * @property {SweeperOptions} [sweepers={}] Options for cache sweeping
 * @property {WebsocketOptions} [ws] Options for the WebSocket
 * @property {RESTOptions} [rest] Options for the REST manager
 * @property {Function} [jsonTransformer] A function used to transform outgoing json data
 */

/**
 * Options for {@link Sweepers} defining the behavior of cache sweeping
 * @typedef {Object<SweeperKey, SweepOptions>} SweeperOptions
 */

/**
 * Options for sweeping a single type of item from cache
 * @typedef {Object} SweepOptions
 * @property {number} interval The interval (in seconds) at which to perform sweeping of the item
 * @property {number} [lifetime] How long an item should stay in cache until it is considered sweepable.
 * <warn>This property is only valid for the `invites`, `messages`, and `threads` keys. The `filter` property
 * is mutually exclusive to this property and takes priority</warn>
 * @property {GlobalSweepFilter} filter The function used to determine the function passed to the sweep method
 * <info>This property is optional when the key is `invites`, `messages`, or `threads` and `lifetime` is set</info>
 */

/**
 * WebSocket options (these are left as snake_case to match the API)
 * @typedef {Object} WebsocketOptions
 * @property {number} [large_threshold=50] Number of members in a guild after which offline users will no longer be
 * sent in the initial guild member list, must be between 50 and 250
 * @property {number} [version=10] The Discord gateway version to use <warn>Changing this can break the library;
 * only set this if you know what you are doing</warn>
 */

class OptionS extends null {
  static createDefault() {
    return {
      closeTimeout: 5_000,
      waitGuildTimeout: 15_000,
      shardCount: 1,
      makeCache: this.cacheWithLimits(this.DefaultMakeCacheSettings),
      partials: [],
      failIfNotExists: true,
      presence: {},
      sweepers: this.DefaultSweeperSettings,
      ws: {
        large_threshold: 50,
        compress: false,
        properties: {
          os: process.platform,
          browser: 'discord.js',
          device: 'discord.js',
        },
        version: 10,
      },
      rest: DefaultRestOptions,
      jsonTransformer: toSnakeCase,
    };
  }

  /**
   * Tạo một nhà máy sản xuất bộ nhớ cache bằng cách sử dụng các cài đặt được xác định trước để quét hoặc giới hạn. 
   * @param {Object <string, LimitedCollectionOptions | number>} [settings = {}] Các cài đặt được chuyển cho hàm tạo có liên quan. 
   * Nếu không có cài đặt nào được cung cấp cho người quản lý, thì nó sẽ sử dụng Bộ sưu tập.
   * Nếu một số được cung cấp cho người quản lý, nó sẽ sử dụng số đó làm kích thước tối đa cho Bộ sưu tập giới hạn.
   * Nếu LimitedCollectionOptions được cung cấp cho người quản lý, nó sẽ sử dụng các cài đặt đó để tạo thành LimitedCollection. 
   * @returns {CacheFactory} 
   * @thí dụ
   * // Lưu trữ tối đa 200 tin nhắn cho mỗi kênh và 200 thành viên mỗi bang hội, luôn giữ thành viên khách hàng.
   * Options.cacheWithLimits({
   *    MessageManager: 200,
   *    GuildMemberManager: {
   *      maxSize: 200,
   *      keepOverLimit: (member) => member.id === client.user.id,
   *    },
   *  });
   */
  static cacheWithLimits(settings = {}) {
    const { Collection } = require('../../Publish02/index');
    const LimitedCollection = require('./LimitedCollection');

    return manager => {
      const setting = settings[manager.name];
      /* eslint-disable-next-line eqeqeq */
      if (setting == null) {
        return new Collection();
      }
      if (typeof setting === 'number') {
        if (setting === Infinity) {
          return new Collection();
        }
        return new LimitedCollection({ maxSize: setting });
      }
      /* eslint-disable-next-line eqeqeq */
      const noLimit = setting.maxSize == null || setting.maxSize === Infinity;
      if (noLimit) {
        return new Collection();
      }
      return new LimitedCollection(setting);
    };
  }

  /**
   * Tạo một nhà máy sản xuất bộ nhớ cache luôn lưu trữ mọi thứ.
   * @returns {CacheFactory}
   */
  static cacheEverything() {
    const { Collection } = require('../../Publish02/index');
    return () => new Collection();
  }

  /**
   * Cài đặt mặc định được chuyển đến {@link Options.cacheWithLimits}. 
   * Bộ nhớ đệm mà điều này thay đổi là: 
       ** `MessageManager` - Giới hạn 200 tin nhắn 
       ** `ChannelManager` - Dọn dẹp các chuỗi đã lưu trữ 
       ** `GuildChannelManager` - Quét các chuỗi đã lưu trữ 
       ** `ThreadManager` - Dọn dẹp các chủ đề đã lưu trữ 
   * <info>Nếu bạn muốn giữ hành vi mặc định và thêm vào bên trên nó, bạn có thể sử dụng đối tượng này và thêm vào nó, ví dụ: 
   *`makeCache: Options.cacheWithLimits ({... Options.DefaultMakeCacheSettings, ReactionManager: 0})` </info> 
   * @type {Object <string, LimitedCollectionOptions | number>}
   */
  static get DefaultMakeCacheSettings() {
    return {
      MessageManager: 200,
    };
  }

  /**
   * The default settings passed to {@link Options.sweepers} (for v14).
   * The sweepers that this changes are:
   * * `threads` - Sweep archived threads every hour, removing those archived more than 4 hours ago
   * <info>If you want to keep default behavior and add on top of it you can use this object and add on to it, e.g.
   * `sweepers: { ...Options.DefaultSweeperSettings, messages: { interval: 300, lifetime: 600 } })`</info>
   * @type {SweeperOptions}
   */
  static get DefaultSweeperSettings() {
    return {
      threads: {
        interval: 3600,
        lifetime: 14400,
      },
    };
  }
}

module.exports = OptionS;

/**
 * @external RESTOptions
 * @see {@link https://discord.js.org/#/docs/rest/main/typedef/RESTOptions}
 */
