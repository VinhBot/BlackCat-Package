"use strict";
var __create = Object.create, __defProp = Object.defineProperty, __getOwnPropDesc = Object.getOwnPropertyDescriptor, __getOwnPropNames = Object.getOwnPropertyNames, __getProtoOf = Object.getPrototypeOf, __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps( isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod ));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var __privateMethod = (obj, member, method) => {
  __accessCheck(obj, member, "access private method");
  return method;
};
// src/index.ts
var src_exports = {};
__export(src_exports, {
  BaseManager: () => BaseManager,
  CustomPlugin: () => CustomPlugin,
  DirectLinkPlugin: () => DirectLinkPlugin,
  DisTube: () => DisTube,
  DisTubeBase: () => DisTubeBase,
  DisTubeError: () => DisTubeError,
  DisTubeHandler: () => DisTubeHandler,
  DisTubeStream: () => DisTubeStream,
  DisTubeVoice: () => DisTubeVoice,
  DisTubeVoiceManager: () => DisTubeVoiceManager,
  Events: () => Events,
  ExtractorPlugin: () => ExtractorPlugin,
  FilterManager: () => FilterManager,
  GuildIdManager: () => GuildIdManager,
  Options: () => Options,
  Playlist: () => Playlist,
  Plugin: () => Plugin,
  PluginType: () => PluginType,
  Queue: () => Queue,
  QueueManager: () => QueueManager,
  RepeatMode: () => RepeatMode,
  SearchResultPlaylist: () => SearchResultPlaylist,
  SearchResultType: () => SearchResultType,
  SearchResultVideo: () => SearchResultVideo,
  Song: () => Song,
  StreamType: () => StreamType,
  TaskQueue: () => TaskQueue,
  checkIntents: () => checkIntents,
  checkInvalidKey: () => checkInvalidKey,
  chooseBestVideoFormat: () => chooseBestVideoFormat,
  default: () => DisTube,
  defaultFilters: () => defaultFilters,
  defaultOptions: () => defaultOptions,
  formatDuration: () => formatDuration,
  isClientInstance: () => isClientInstance,
  isGuildInstance: () => isGuildInstance,
  isMemberInstance: () => isMemberInstance,
  isMessageInstance: () => isMessageInstance,
  isObject: () => isObject,
  isRecord: () => isRecord,
  isSnowflake: () => isSnowflake,
  isSupportedVoiceChannel: () => isSupportedVoiceChannel,
  isTextChannelInstance: () => isTextChannelInstance,
  isURL: () => isURL,
  isVoiceChannelEmpty: () => isVoiceChannelEmpty,
  objectKeys: () => objectKeys,
  parseNumber: () => parseNumber,
  resolveGuildId: () => resolveGuildId,
  toSecond: () => toSecond,
  version: () => version
});
module.exports = __toCommonJS(src_exports);

// src/type.ts
var RepeatMode = ((RepeatMode2) => {
  RepeatMode2[RepeatMode2["DISABLED"] = 0] = "DISABLED";
  RepeatMode2[RepeatMode2["SONG"] = 1] = "SONG";
  RepeatMode2[RepeatMode2["QUEUE"] = 2] = "QUEUE";
  return RepeatMode2;
})(RepeatMode || {});
var PluginType = ((PluginType2) => {
  PluginType2["CUSTOM"] = "custom";
  PluginType2["EXTRACTOR"] = "extractor";
  return PluginType2;
})(PluginType || {});
var SearchResultType = ((SearchResultType2) => {
  SearchResultType2["VIDEO"] = "video";
  SearchResultType2["PLAYLIST"] = "playlist";
  return SearchResultType2;
})(SearchResultType || {});
var StreamType = ((StreamType2) => {
  StreamType2[StreamType2["OPUS"] = 0] = "OPUS";
  StreamType2[StreamType2["RAW"] = 1] = "RAW";
  return StreamType2;
})(StreamType || {});
var Events = ((Events2) => {
  Events2["ERROR"] = "error";
  Events2["ADD_LIST"] = "addList";
  Events2["ADD_SONG"] = "addSong";
  Events2["PLAY_SONG"] = "playSong";
  Events2["FINISH_SONG"] = "finishSong";
  Events2["EMPTY"] = "empty";
  Events2["FINISH"] = "finish";
  Events2["INIT_QUEUE"] = "initQueue";
  Events2["NO_RELATED"] = "noRelated";
  Events2["DISCONNECT"] = "disconnect";
  Events2["DELETE_QUEUE"] = "deleteQueue";
  Events2["SEARCH_CANCEL"] = "searchCancel";
  Events2["SEARCH_NO_RESULT"] = "searchNoResult";
  Events2["SEARCH_DONE"] = "searchDone";
  Events2["SEARCH_INVALID_ANSWER"] = "searchInvalidAnswer";
  Events2["SEARCH_RESULT"] = "searchResult";
  return Events2;
})(Events || {});

// src/constant.ts
var defaultFilters = { "3d": "apulsator=hz=0.125", bassboost: "bass=g=10", echo: "aecho=0.8:0.9:1000:0.3", flanger: "flanger", gate: "agate", haas: "haas", karaoke: "stereotools=mlev=0.1", nightcore: "asetrate=48000*1.25,aresample=48000,bass=g=5", reverse: "areverse", vaporwave: "asetrate=48000*0.8,aresample=48000,atempo=1.1", mcompand: "mcompand", phaser: "aphaser", tremolo: "tremolo", surround: "surround", earwax: "earwax" };
var defaultOptions = {
  plugins: [],
  emitNewSongOnly: false,
  leaveOnEmpty: true,
  leaveOnFinish: false,
  leaveOnStop: true,
  savePreviousSongs: true,
  searchSongs: 0,
  ytdlOptions: {},
  searchCooldown: 60,
  emptyCooldown: 60,
  nsfw: false,
  emitAddSongWhenCreatingQueue: true,
  emitAddListWhenCreatingQueue: true,
  joinNewVoiceChannel: true,
  streamType: 0,
  directLink: true
};
// DisTubeError.ts
var import_node_util = require("util");
var ERROR_MESSAGES = {
  INVALID_TYPE: (expected, got, name) => `Expected ${Array.isArray(expected) ? expected.map((e) => typeof e === "number" ? e : `'${e}'`).join(" or ") : `'${expected}'`}${name ? ` for '${name}'` : ""}, but got ${(0, import_node_util.inspect)(got)} (${typeof got})`,
  NUMBER_COMPARE: (name, expected, value) => `'${name}' must be ${expected} ${value}`,
  EMPTY_ARRAY: (name) => `'${name}' is an empty array`,
  EMPTY_FILTERED_ARRAY: (name, type) => `There is no valid '${type}' in the '${name}' array`,
  EMPTY_STRING: (name) => `'${name}' string must not be empty`,
  INVALID_KEY: (obj, key) => `'${key}' does not need to be provided in ${obj}`,
  MISSING_KEY: (obj, key) => `'${key}' needs to be provided in ${obj}`,
  MISSING_KEYS: (obj, key, all) => `${key.map((k) => `'${k}'`).join(all ? " and " : " or ")} need to be provided in ${obj}`,
  MISSING_INTENTS: (i) => `${i} intent must be provided for the Client`,
  DISABLED_OPTION: (o) => `DisTubeOptions.${o} is disabled`,
  ENABLED_OPTION: (o) => `DisTubeOptions.${o} is enabled`,
  NOT_IN_VOICE: "User is not in any voice channel",
  VOICE_FULL: "The voice channel is full",
  VOICE_CONNECT_FAILED: (s) => `Cannot connect to the voice channel after ${s} seconds`,
  VOICE_MISSING_PERMS: "I do not have permission to join this voice channel",
  VOICE_RECONNECT_FAILED: "Cannot reconnect to the voice channel",
  VOICE_DIFFERENT_GUILD: "Cannot join a voice channel in a different guild",
  VOICE_DIFFERENT_CLIENT: "Cannot join a voice channel created by a different client",
  NO_QUEUE: "There is no playing queue in this guild",
  QUEUE_EXIST: "This guild has a Queue already",
  PAUSED: "The queue has been paused already",
  RESUMED: "The queue has been playing already",
  NO_PREVIOUS: "There is no previous song in this queue",
  NO_UP_NEXT: "There is no up next song",
  NO_SONG_POSITION: "Does not have any song at this position",
  NO_PLAYING: "There is no playing song in the queue",
  NO_RESULT: "No result found",
  NO_RELATED: "Cannot find any related songs",
  CANNOT_PLAY_RELATED: "Cannot play the related song",
  UNAVAILABLE_VIDEO: "This video is unavailable",
  UNPLAYABLE_FORMATS: "No playable format found",
  NON_NSFW: "Cannot play age-restricted content in non-NSFW channel",
  NOT_SUPPORTED_URL: "This url is not supported",
  CANNOT_RESOLVE_SONG: (t) => `Cannot resolve ${(0, import_node_util.inspect)(t)} to a Song`,
  NO_VALID_SONG: "'songs' array does not have any valid Song, SearchResult or url",
  EMPTY_FILTERED_PLAYLIST: "There is no valid video in the playlist\nMaybe age-restricted contents is filtered because you are in non-NSFW channel",
  EMPTY_PLAYLIST: "There is no valid video in the playlist"
};
var haveCode = __name((code) => Object.keys(ERROR_MESSAGES).includes(code), "haveCode");
var parseMessage = __name((m, ...args) => typeof m === "string" ? m : m(...args), "parseMessage");
var getErrorMessage = __name((code, ...args) => haveCode(code) ? parseMessage(ERROR_MESSAGES[code], ...args) : args[0], "getErrorMessage");
var DisTubeError = class extends Error {
  constructor(code, ...args) {
    super(getErrorMessage(code, ...args));
    __publicField(this, "errorCode");
    this.errorCode = code;
    if (Error.captureStackTrace)
      Error.captureStackTrace(this, DisTubeError);
  }
  get name() {
    return `DisTubeError [${this.errorCode}]`;
  }
  get code() {
    return this.errorCode;
  }
};
__name(DisTubeError, "DisTubeError");

// src/struct/TaskQueue.ts
var Task = class {
  constructor(resolveInfo) {
    __publicField(this, "resolve");
    __publicField(this, "promise");
    __publicField(this, "resolveInfo");
    this.resolveInfo = resolveInfo;
    this.promise = new Promise((res) => {
      this.resolve = res;
    });
  }
};
__name(Task, "Task");
var _tasks;
var TaskQueue = class {
  constructor() {
    __privateAdd(this, _tasks, []);
  }
  queuing(resolveInfo = false) {
    const next = this.remaining ? __privateGet(this, _tasks)[__privateGet(this, _tasks).length - 1].promise : Promise.resolve();
    __privateGet(this, _tasks).push(new Task(resolveInfo));
    return next;
  }
  resolve() {
    __privateGet(this, _tasks).shift()?.resolve();
  }
  get remaining() {
    return __privateGet(this, _tasks).length;
  }
  get hasResolveTask() {
    return !!__privateGet(this, _tasks).find((t) => t.resolveInfo);
  }
};
__name(TaskQueue, "TaskQueue");
_tasks = new WeakMap();

// src/struct/Playlist.ts
var _metadata, _member;
var Playlist = class {
  constructor(playlist, options = {}) {
    __publicField(this, "source");
    __publicField(this, "songs");
    __publicField(this, "name");
    __privateAdd(this, _metadata, void 0);
    __privateAdd(this, _member, void 0);
    __publicField(this, "url");
    __publicField(this, "thumbnail");
    const { member, properties, metadata } = options;
    if (typeof playlist !== "object" || !Array.isArray(playlist) && ["source", "songs"].some((key) => !(key in playlist))) {
      throw new DisTubeError("INVALID_TYPE", ["Array<Song>", "PlaylistInfo"], playlist, "playlist");
    }
    if (typeof properties !== "undefined" && !isRecord(properties)) {
      throw new DisTubeError("INVALID_TYPE", "object", properties, "properties");
    }
    if (Array.isArray(playlist)) {
      this.source = "youtube";
      if (!playlist.length)
        throw new DisTubeError("EMPTY_PLAYLIST");
      this.songs = playlist;
      this.name = this.songs[0].name ? `${this.songs[0].name} and ${this.songs.length - 1} more songs.` : `${this.songs.length} songs playlist`;
      this.thumbnail = this.songs[0].thumbnail;
      this.member = member || void 0;
    } else {
      this.source = (playlist.source || "youtube").toLowerCase();
      if (!Array.isArray(playlist.songs) || !playlist.songs.length)
        throw new DisTubeError("EMPTY_PLAYLIST");
      this.songs = playlist.songs;
      this.name = playlist.name || playlist.title || (this.songs[0].name ? `${this.songs[0].name} and ${this.songs.length - 1} more songs.` : `${this.songs.length} songs playlist`);
      this.url = playlist.url || playlist.webpage_url;
      this.thumbnail = playlist.thumbnail || this.songs[0].thumbnail;
      this.member = member || playlist.member || void 0;
    } 
    this.songs.map((s) => s.constructor.name === "Song" && (s.playlist = this));
    if (properties)
      for (const [key, value] of Object.entries(properties))
        this[key] = value;
    this.metadata = metadata;
  }
  get duration() {
    return this.songs?.reduce((prev, next) => prev + (next.duration || 0), 0) || 0;
  }
  get formattedDuration() {
    return formatDuration(this.duration);
  }
  get member() {
    return __privateGet(this, _member);
  }
  set member(member) {
    if (!isMemberInstance(member))
      return;
    __privateSet(this, _member, member);
    this.songs.map((s) => s.constructor.name === "Song" && (s.member = this.member));
  }
  get user() {
    return this.member?.user;
  }
  get metadata() {
    return __privateGet(this, _metadata);
  }
  set metadata(metadata) {
    __privateSet(this, _metadata, metadata);
    this.songs.map((s) => s.constructor.name === "Song" && (s.metadata = metadata));
  }
};
__name(Playlist, "Playlist");
_metadata = new WeakMap();
_member = new WeakMap();

// src/struct/SearchResult.ts
var ISearchResult = class {
  constructor(info) {
    __publicField(this, "source");
    __publicField(this, "id");
    __publicField(this, "name");
    __publicField(this, "url");
    __publicField(this, "uploader");
    this.source = "youtube";
    this.id = info.id;
    this.name = info.name;
    this.url = info.url;
    this.uploader = {
      name: void 0,
      url: void 0
    };
  }
};
__name(ISearchResult, "ISearchResult");
var SearchResultVideo = class extends ISearchResult {
  constructor(info) {
    super(info);
    __publicField(this, "type");
    __publicField(this, "views");
    __publicField(this, "isLive");
    __publicField(this, "duration");
    __publicField(this, "formattedDuration");
    __publicField(this, "thumbnail");
    if (info.type !== "video")
      throw new DisTubeError("INVALID_TYPE", "video", info.type, "type");
    this.type = "video" /* VIDEO */;
    this.views = info.views;
    this.isLive = info.isLive;
    this.duration = this.isLive ? 0 : toSecond(info.duration);
    this.formattedDuration = this.isLive ? "Live" : formatDuration(this.duration);
    this.thumbnail = info.thumbnail;
    this.uploader = {
      name: info.author?.name,
      url: info.author?.url
    };
  }
};
__name(SearchResultVideo, "SearchResultVideo");
var SearchResultPlaylist = class extends ISearchResult {
  constructor(info) {
    super(info);
    __publicField(this, "type");
    __publicField(this, "length");
    if (info.type !== "playlist")
      throw new DisTubeError("INVALID_TYPE", "playlist", info.type, "type");
    this.type = "playlist" /* PLAYLIST */;
    this.length = info.length;
    this.uploader = {
      name: info.owner?.name,
      url: info.owner?.url
    };
  }
};
__name(SearchResultPlaylist, "SearchResultPlaylist");
// src/struct/Song.ts
var _metadata2, _member2, _playlist;
var _Song = class {
  constructor(info, options = {}) {
    __publicField(this, "source");
    __privateAdd(this, _metadata2, void 0);
    __publicField(this, "formats");
    __privateAdd(this, _member2, void 0);
    __publicField(this, "id");
    __publicField(this, "name");
    __publicField(this, "isLive");
    __publicField(this, "duration");
    __publicField(this, "formattedDuration");
    __publicField(this, "url");
    __publicField(this, "streamURL");
    __publicField(this, "thumbnail");
    __publicField(this, "related");
    __publicField(this, "views");
    __publicField(this, "likes");
    __publicField(this, "dislikes");
    __publicField(this, "uploader");
    __publicField(this, "age_restricted");
    __publicField(this, "chapters");
    __publicField(this, "reposts");
    __privateAdd(this, _playlist, void 0);
    const { member, source, metadata } = { source: "youtube", ...options };
    if (typeof source !== "string" || info.src && typeof info.src !== "string") {
      throw new DisTubeError("INVALID_TYPE", "string", source, "source");
    }
    this.source = (info?.src || source).toLowerCase();
    this.metadata = metadata;
    this.member = member;
    if (this.source === "youtube") {
      this._patchYouTube(info);
    } else {
      this._patchOther(info);
    }
  }
  _patchYouTube(i) {
    const info = i;
    if (info.full === true) {
      this.formats = info.formats;
      const err = require("@distube/ytdl-core/lib/utils").playError(info.player_response, [ "UNPLAYABLE", "LIVE_STREAM_OFFLINE", "LOGIN_REQUIRED" ]);
      if (err)
        throw err;
      if (!info.formats?.length)
        throw new DisTubeError("UNAVAILABLE_VIDEO");
    }
    const details = info.videoDetails || info;
    this.id = details.videoId || details.id;
    this.name = details.title || details.name;
    this.isLive = !!details.isLive;
    this.duration = this.isLive ? 0 : toSecond(details.lengthSeconds || details.length_seconds || details.duration);
    this.formattedDuration = this.isLive ? "Live" : formatDuration(this.duration);
    this.url = `https://www.youtube.com/watch?v=${this.id}`;
    this.streamURL = void 0;
    this.thumbnail = details.thumbnails?.sort((a, b) => b.width - a.width)?.[0]?.url || details.thumbnail?.url || details.thumbnail;
    this.related = info?.related_videos || details.related || [];
    if (!Array.isArray(this.related))
      throw new DisTubeError("INVALID_TYPE", "Array", this.related, "Song#related");
    this.related = this.related.map((v) => new _Song(v, { source: this.source, metadata: this.metadata }));
    this.views = parseNumber(details.viewCount || details.view_count || details.views);
    this.likes = parseNumber(details.likes);
    this.dislikes = parseNumber(details.dislikes);
    this.uploader = {
      name: info.uploader?.name || details.author?.name,
      url: info.uploader?.url || details.author?.channel_url || details.author?.url
    };
    this.age_restricted = !!details.age_restricted;
    this.chapters = details.chapters || [];
    this.reposts = 0;
  }
  _patchOther(info) {
    this.id = info.id;
    this.name = info.title || info.name;
    this.isLive = Boolean(info.is_live || info.isLive);
    this.duration = this.isLive ? 0 : toSecond(info._duration_raw || info.duration);
    this.formattedDuration = this.isLive ? "Live" : formatDuration(this.duration);
    this.url = info.webpage_url || info.url;
    this.thumbnail = info.thumbnail;
    this.related = info.related || [];
    if (!Array.isArray(this.related))
      throw new DisTubeError("INVALID_TYPE", "Array", this.related, "Song#related");
    this.related = this.related.map((i) => new _Song(i, { source: this.source, metadata: this.metadata }));
    this.views = parseNumber(info.view_count || info.views);
    this.likes = parseNumber(info.like_count || info.likes);
    this.dislikes = parseNumber(info.dislike_count || info.dislikes);
    this.reposts = parseNumber(info.repost_count || info.reposts);
    if (typeof info.uploader === "string") {
      this.uploader = {
        name: info.uploader,
        url: info.uploader_url
      };
    } else {
      this.uploader = {
        name: info.uploader?.name,
        url: info.uploader?.url
      };
    }
    this.age_restricted = info.age_restricted || !!info.age_limit && parseNumber(info.age_limit) >= 18;
    this.chapters = info.chapters || [];
  }
  get playlist() {
    return __privateGet(this, _playlist);
  }
  set playlist(playlist) {
    if (!(playlist instanceof Playlist))
      throw new DisTubeError("INVALID_TYPE", "Playlist", playlist, "Song#playlist");
    __privateSet(this, _playlist, playlist);
    this.member = playlist.member;
  }
  get member() {
    return __privateGet(this, _member2);
  }
  set member(member) {
    if (isMemberInstance(member))
      __privateSet(this, _member2, member);
  }
  get user() {
    return this.member?.user;
  }
  get metadata() {
    return __privateGet(this, _metadata2);
  }
  set metadata(metadata) {
    __privateSet(this, _metadata2, metadata);
  }
};
var Song = _Song;
__name(Song, "Song");
_metadata2 = new WeakMap();
_member2 = new WeakMap();
_playlist = new WeakMap();

// src/core/DisTubeBase.ts
var DisTubeBase = class {
  constructor(distube) {
    __publicField(this, "distube");
    this.distube = distube;
  }
  emit(eventName, ...args) {
    return this.distube.emit(eventName, ...args);
  }
  emitError(error, channel) {
    this.distube.emitError(error, channel);
  }
  get queues() {
    return this.distube.queues;
  }
  get voices() {
    return this.distube.voices;
  }
  get client() {
    return this.distube.client;
  }
  get options() {
    return this.distube.options;
  }
  get handler() {
    return this.distube.handler;
  }
};
__name(DisTubeBase, "DisTubeBase");

// src/core/DisTubeVoice.ts
var import_discord = require("discord.js");
var import_tiny_typed_emitter = require("events").EventEmitter;
var import_voice = require("@discordjs/voice");
var _channel, _volume, _br, br_fn, _join, join_fn;
var DisTubeVoice = class extends import_tiny_typed_emitter.TypedEmitter {
  constructor(voiceManager, channel) {
    super();
    __privateAdd(this, _br);
    __privateAdd(this, _join);
    __publicField(this, "id");
    __publicField(this, "voices");
    __publicField(this, "audioPlayer");
    __publicField(this, "connection");
    __publicField(this, "audioResource");
    __publicField(this, "emittedError");
    __publicField(this, "isDisconnected", false);
    __privateAdd(this, _channel, void 0);
    __privateAdd(this, _volume, 100);
    this.voices = voiceManager;
    this.id = channel.guildId;
    this.channel = channel;
    this.voices.add(this.id, this);
    this.audioPlayer = (0, import_voice.createAudioPlayer)().on(import_voice.AudioPlayerStatus.Idle, (oldState) => {
      if (oldState.status !== import_voice.AudioPlayerStatus.Idle) {
        delete this.audioResource;
        this.emit("finish");
      }
    }).on(import_voice.AudioPlayerStatus.Playing, () => __privateMethod(this, _br, br_fn).call(this)).on("error", (error) => {
      if (this.emittedError)
        return;
      this.emittedError = true;
      this.emit("error", error);
    });
    this.connection.on(import_voice.VoiceConnectionStatus.Disconnected, (_, newState) => {
      if (newState.reason === import_voice.VoiceConnectionDisconnectReason.Manual) {
        this.leave();
      } else if (newState.reason === import_voice.VoiceConnectionDisconnectReason.WebSocketClose && newState.closeCode === 4014) {
        (0, import_voice.entersState)(this.connection, import_voice.VoiceConnectionStatus.Connecting, 5e3).catch(() => {
          if (![import_voice.VoiceConnectionStatus.Ready, import_voice.VoiceConnectionStatus.Connecting].includes(this.connection.state.status)) {
            this.leave();
          }
        });
      } else if (this.connection.rejoinAttempts < 5) {
        setTimeout(() => {
          this.connection.rejoin();
        }, (this.connection.rejoinAttempts + 1) * 5e3).unref();
      } else if (this.connection.state.status !== import_voice.VoiceConnectionStatus.Destroyed) {
        this.leave(new DisTubeError("VOICE_RECONNECT_FAILED"));
      }
    }).on(import_voice.VoiceConnectionStatus.Destroyed, () => {
      this.leave();
    }).on("error", () => void 0);
    this.connection.subscribe(this.audioPlayer);
  }
  get channelId() {
    return this.connection?.joinConfig?.channelId ?? void 0;
  }
  get channel() {
    if (!this.channelId)
      return __privateGet(this, _channel);
    if (__privateGet(this, _channel)?.id === this.channelId)
      return __privateGet(this, _channel);
    const channel = this.voices.client.channels.cache.get(this.channelId);
    if (!channel)
      return __privateGet(this, _channel);
    for (const type of import_discord.Constants.VoiceBasedChannelTypes) {
      if (channel.type === type) {
        __privateSet(this, _channel, channel);
        return channel;
      }
    }
    return __privateGet(this, _channel);
  }
  set channel(channel) {
    if (!isSupportedVoiceChannel(channel)) {
      throw new DisTubeError("INVALID_TYPE", "BaseGuildVoiceChannel", channel, "DisTubeVoice#channel");
    }
    if (channel.guildId !== this.id)
      throw new DisTubeError("VOICE_DIFFERENT_GUILD");
    if (channel.client.user?.id !== this.voices.client.user?.id)
      throw new DisTubeError("VOICE_DIFFERENT_CLIENT");
    if (channel.id === this.channelId)
      return;
    if (!channel.joinable) {
      if (channel.full)
        throw new DisTubeError("VOICE_FULL");
      else
        throw new DisTubeError("VOICE_MISSING_PERMS");
    }
    this.connection = __privateMethod(this, _join, join_fn).call(this, channel);
    __privateSet(this, _channel, channel);
    __privateMethod(this, _br, br_fn).call(this);
  }
  async join(channel) {
    const TIMEOUT = 3e4;
    if (channel)
      this.channel = channel;
    try {
      await (0, import_voice.entersState)(this.connection, import_voice.VoiceConnectionStatus.Ready, TIMEOUT);
    } catch {
      if (this.connection.state.status === import_voice.VoiceConnectionStatus.Ready)
        return this;
      if (this.connection.state.status !== import_voice.VoiceConnectionStatus.Destroyed)
        this.connection.destroy();
      this.voices.remove(this.id);
      throw new DisTubeError("VOICE_CONNECT_FAILED", TIMEOUT / 1e3);
    }
    return this;
  }
  leave(error) {
    this.stop(true);
    if (!this.isDisconnected) {
      this.emit("disconnect", error);
      this.isDisconnected = true;
    }
    if (this.connection.state.status !== import_voice.VoiceConnectionStatus.Destroyed)
      this.connection.destroy();
    this.voices.remove(this.id);
  }
  stop(force = false) {
    this.audioPlayer.stop(force);
  }
  play(stream) {
    this.emittedError = false;
    stream.stream.on("error", (error) => {
      if (this.emittedError || error.code === "ERR_STREAM_PREMATURE_CLOSE")
        return;
      this.emittedError = true;
      this.emit("error", error);
    });
    this.audioResource = (0, import_voice.createAudioResource)(stream.stream, {
      inputType: stream.type,
      inlineVolume: true
    });
    this.volume = __privateGet(this, _volume);
    this.audioPlayer.play(this.audioResource);
  }
  set volume(volume) {
    if (typeof volume !== "number" || isNaN(volume)) {
      throw new DisTubeError("INVALID_TYPE", "number", volume, "volume");
    }
    if (volume < 0) {
      throw new DisTubeError("NUMBER_COMPARE", "Volume", "bigger or equal to", 0);
    }
    __privateSet(this, _volume, volume);
    this.audioResource?.volume?.setVolume(Math.pow(__privateGet(this, _volume) / 100, 0.5 / Math.log10(2)));
  }
  get volume() {
    return __privateGet(this, _volume);
  }
  get playbackDuration() {
    return (this.audioResource?.playbackDuration ?? 0) / 1e3;
  }
  pause() {
    this.audioPlayer.pause();
  }
  unpause() {
    this.audioPlayer.unpause();
  }
  get selfDeaf() {
    return this.connection.joinConfig.selfDeaf;
  }
  get selfMute() {
    return this.connection.joinConfig.selfMute;
  }
  setSelfDeaf(selfDeaf) {
    if (typeof selfDeaf !== "boolean") {
      throw new DisTubeError("INVALID_TYPE", "boolean", selfDeaf, "selfDeaf");
    }
    return this.connection.rejoin({
      ...this.connection.joinConfig,
      selfDeaf
    });
  }
  setSelfMute(selfMute) {
    if (typeof selfMute !== "boolean") {
      throw new DisTubeError("INVALID_TYPE", "boolean", selfMute, "selfMute");
    }
    return this.connection.rejoin({
      ...this.connection.joinConfig,
      selfMute
    });
  }
  get voiceState() {
    return this.channel?.guild?.members?.me?.voice;
  }
};
__name(DisTubeVoice, "DisTubeVoice");
_channel = new WeakMap();
_volume = new WeakMap();
_br = new WeakSet();
br_fn = /* @__PURE__ */ __name(function() {
  if (this.audioResource?.encoder?.encoder)
    this.audioResource.encoder.setBitrate(this.channel.bitrate);
}, "#br");
_join = new WeakSet();
join_fn = /* @__PURE__ */ __name(function(channel) {
  return (0, import_voice.joinVoiceChannel)({
    channelId: channel.id,
    guildId: this.id,
    adapterCreator: channel.guild.voiceAdapterCreator,
    group: channel.client.user?.id
  });
}, "#join");

// src/core/DisTubeHandler.ts
var import_ytpl = __toESM(require("@distube/ytpl"));
var import_ytdl_core = __toESM(require("@distube/ytdl-core"));
var DisTubeHandler = class extends DisTubeBase {
  constructor(distube) {
    super(distube);
    const client = this.client;
    if (this.options.leaveOnEmpty) {
      client.on("voiceStateUpdate", (oldState) => {
        if (!oldState?.channel)
          return;
        const queue = this.queues.get(oldState);
        if (!queue) {
          if (isVoiceChannelEmpty(oldState)) {
            setTimeout(() => {
              if (!this.queues.get(oldState) && isVoiceChannelEmpty(oldState))
                this.voices.leave(oldState);
            }, this.options.emptyCooldown * 1e3).unref();
          }
          return;
        }
        if (queue._emptyTimeout) {
          clearTimeout(queue._emptyTimeout);
          delete queue._emptyTimeout;
        }
        if (isVoiceChannelEmpty(oldState)) {
          queue._emptyTimeout = setTimeout(() => {
            delete queue._emptyTimeout;
            if (isVoiceChannelEmpty(oldState)) {
              queue.voice.leave();
              this.emit("empty", queue);
              if (queue.stopped)
                queue.remove();
            }
          }, this.options.emptyCooldown * 1e3).unref();
        }
      });
    }
  }
  get ytdlOptions() {
    const options = this.options.ytdlOptions;
    if (this.options.youtubeCookie) {
      if (!options.requestOptions)
        options.requestOptions = {};
      if (!options.requestOptions.headers)
        options.requestOptions.headers = {};
      options.requestOptions.headers.cookie = this.options.youtubeCookie;
      if (this.options.youtubeIdentityToken) {
        options.requestOptions.headers["x-youtube-identity-token"] = this.options.youtubeIdentityToken;
      }
    }
    return options;
  }
  getYouTubeInfo(url, basic = false) {
    if (basic)
      return import_ytdl_core.default.getBasicInfo(url, this.ytdlOptions);
    return import_ytdl_core.default.getInfo(url, this.ytdlOptions);
  }
  async resolve(song, options = {}) {
    if (song instanceof Song || song instanceof Playlist) {
      if ("metadata" in options)
        song.metadata = options.metadata;
      if ("member" in options)
        song.member = options.member;
      return song;
    }
    if (song instanceof SearchResultVideo)
      return new Song(song, options);
    if (song instanceof SearchResultPlaylist)
      return this.resolvePlaylist(song.url, options);
    if (isObject(song)) {
      if (!("url" in song) && !("id" in song))
        throw new DisTubeError("CANNOT_RESOLVE_SONG", song);
      return new Song(song, options);
    }
    if (import_ytpl.default.validateID(song))
      return this.resolvePlaylist(song, options);
    if (import_ytdl_core.default.validateURL(song))
      return new Song(await this.getYouTubeInfo(song, true), options);
    if (isURL(song)) {
      for (const plugin of this.distube.extractorPlugins) {
        if (await plugin.validate(song))
          return plugin.resolve(song, options);
      }
      throw new DisTubeError("NOT_SUPPORTED_URL");
    }
    throw new DisTubeError("CANNOT_RESOLVE_SONG", song);
  }
  async resolvePlaylist(playlist, options = {}) {
    const { member, source, metadata } = { source: "youtube", ...options };
    if (playlist instanceof Playlist) {
      if ("metadata" in options)
        playlist.metadata = metadata;
      if ("member" in options)
        playlist.member = member;
      return playlist;
    }
    if (typeof playlist === "string") {
      const info = await (0, import_ytpl.default)(playlist, { limit: Infinity });
      const songs = info.items.filter((v) => !v.thumbnail.includes("no_thumbnail")).map((v) => new Song(v, { member, metadata }));
      return new Playlist(
        {
          source,
          songs,
          member,
          name: info.title,
          url: info.url,
          thumbnail: songs[0].thumbnail
        },
        { metadata }
      );
    }
    return new Playlist(playlist, { member, properties: { source }, metadata });
  }
  async searchSong(message, query) {
    if (!isMessageInstance(message))
      throw new DisTubeError("INVALID_TYPE", "Discord.Message", message, "message");
    if (typeof query !== "string")
      throw new DisTubeError("INVALID_TYPE", "string", query, "query");
    if (query.length === 0)
      throw new DisTubeError("EMPTY_STRING", "query");
    const limit = this.options.searchSongs > 1 ? this.options.searchSongs : 1;
    const results = await this.distube.search(query, {
      limit,
      safeSearch: this.options.nsfw ? false : !message.channel?.nsfw
    }).catch(() => {
      if (!this.emit("searchNoResult", message, query)) {
        console.warn("searchNoResult event does not have any listeners! Emits `error` event instead.");
        throw new DisTubeError("NO_RESULT");
      }
    });
    if (!results)
      return null;
    return this.createSearchMessageCollector(message, results, query);
  }
  async createSearchMessageCollector(message, results, query) {
    if (!isMessageInstance(message))
      throw new DisTubeError("INVALID_TYPE", "Discord.Message", message, "message");
    if (!Array.isArray(results) || results.length == 0) {
      throw new DisTubeError("INVALID_TYPE", "Array<SearchResult|Song|Playlist>", results, "results");
    }
    if (this.options.searchSongs > 1) {
      const searchEvents = [
        "searchNoResult",
        "searchResult",
        "searchCancel",
        "searchInvalidAnswer",
        "searchDone"
      ];
      for (const evn of searchEvents) {
        if (this.distube.listenerCount(evn) === 0) {
          console.warn(`"searchSongs" option is disabled due to missing "${evn}" listener.`);
          console.warn(`If you don't want to use "${evn}" event, simply add an empty listener (not recommended): <DisTube>.on("${evn}", () => {})`);
          this.options.searchSongs = 0;
        }
      }
    }
    const limit = this.options.searchSongs > 1 ? this.options.searchSongs : 1;
    let result = results[0];
    if (limit > 1) {
      results.splice(limit);
      this.emit("searchResult", message, results, query);
      const c = message.channel;
      const answers = await c.awaitMessages({
        filter: (m) => m.author.id === message.author.id,
        max: 1,
        time: this.options.searchCooldown * 1e3,
        errors: ["time"]
      }).catch(() => void 0);
      const ans = answers?.first();
      if (!ans) {
        this.emit("searchCancel", message, query);
        return null;
      }
      const index = parseInt(ans.content, 10);
      if (isNaN(index) || index > results.length || index < 1) {
        this.emit("searchInvalidAnswer", message, ans, query);
        return null;
      }
      this.emit("searchDone", message, ans, query);
      result = results[index - 1];
    }
    return result;
  }
  async playPlaylist(voiceChannel, playlist, options = {}) {
    const { textChannel, skip } = { skip: false, ...options };
    const position = Number(options.position) || (skip ? 1 : 0);
    if (!(playlist instanceof Playlist))
      throw new DisTubeError("INVALID_TYPE", "Playlist", playlist, "playlist");
    const queue = this.queues.get(voiceChannel);
    if (!this.options.nsfw && !(queue?.textChannel || textChannel)?.nsfw) {
      playlist.songs = playlist.songs.filter((s) => !s.age_restricted);
    }
    if (!playlist.songs.length) {
      if (!this.options.nsfw && !textChannel?.nsfw) {
        throw new DisTubeError("EMPTY_FILTERED_PLAYLIST");
      }
      throw new DisTubeError("EMPTY_PLAYLIST");
    }
    if (queue) {
      if (this.options.joinNewVoiceChannel)
        queue.voice.channel = voiceChannel;
      queue.addToQueue(playlist.songs, position);
      if (skip)
        queue.skip();
      else
        this.emit("addList", queue, playlist);
    } else {
      const newQueue = await this.queues.create(voiceChannel, playlist.songs, textChannel);
      if (newQueue instanceof Queue) {
        if (this.options.emitAddListWhenCreatingQueue)
          this.emit("addList", newQueue, playlist);
        this.emit("playSong", newQueue, newQueue.songs[0]);
      }
    }
  }
  async playSong(voiceChannel, song, options = {}) {
    if (!(song instanceof Song))
      throw new DisTubeError("INVALID_TYPE", "Song", song, "song");
    const { textChannel, skip } = { skip: false, ...options };
    const position = Number(options.position) || (skip ? 1 : 0);
    const queue = this.queues.get(voiceChannel);
    if (!this.options.nsfw && song.age_restricted && !(queue?.textChannel || textChannel)?.nsfw) {
      throw new DisTubeError("NON_NSFW");
    }
    if (queue) {
      if (this.options.joinNewVoiceChannel)
        queue.voice.channel = voiceChannel;
      queue.addToQueue(song, position);
      if (skip)
        queue.skip();
      else
        this.emit("addSong", queue, song);
    } else {
      const newQueue = await this.queues.create(voiceChannel, song, textChannel);
      if (newQueue instanceof Queue) {
        if (this.options.emitAddSongWhenCreatingQueue)
          this.emit("addSong", newQueue, song);
        this.emit("playSong", newQueue, song);
      }
    }
  }
};
__name(DisTubeHandler, "DisTubeHandler");

// src/core/DisTubeOptions.ts
var _validateOptions, validateOptions_fn;
var Options = class {
  constructor(options) {
    __privateAdd(this, _validateOptions);
    __publicField(this, "plugins");
    __publicField(this, "emitNewSongOnly");
    __publicField(this, "leaveOnFinish");
    __publicField(this, "leaveOnStop");
    __publicField(this, "leaveOnEmpty");
    __publicField(this, "emptyCooldown");
    __publicField(this, "savePreviousSongs");
    __publicField(this, "searchSongs");
    __publicField(this, "searchCooldown");
    __publicField(this, "youtubeCookie");
    __publicField(this, "youtubeIdentityToken");
    __publicField(this, "customFilters");
    __publicField(this, "ytdlOptions");
    __publicField(this, "nsfw");
    __publicField(this, "emitAddSongWhenCreatingQueue");
    __publicField(this, "emitAddListWhenCreatingQueue");
    __publicField(this, "joinNewVoiceChannel");
    __publicField(this, "streamType");
    __publicField(this, "directLink");
    if (typeof options !== "object" || Array.isArray(options)) {
      throw new DisTubeError("INVALID_TYPE", "object", options, "DisTubeOptions");
    }
    const opts = { ...defaultOptions, ...options };
    this.plugins = opts.plugins;
    this.emitNewSongOnly = opts.emitNewSongOnly;
    this.leaveOnEmpty = opts.leaveOnEmpty;
    this.leaveOnFinish = opts.leaveOnFinish;
    this.leaveOnStop = opts.leaveOnStop;
    this.savePreviousSongs = opts.savePreviousSongs;
    this.searchSongs = opts.searchSongs;
    this.youtubeCookie = opts.youtubeCookie;
    this.youtubeIdentityToken = opts.youtubeIdentityToken;
    this.customFilters = opts.customFilters;
    this.ytdlOptions = opts.ytdlOptions;
    this.searchCooldown = opts.searchCooldown;
    this.emptyCooldown = opts.emptyCooldown;
    this.nsfw = opts.nsfw;
    this.emitAddSongWhenCreatingQueue = opts.emitAddSongWhenCreatingQueue;
    this.emitAddListWhenCreatingQueue = opts.emitAddListWhenCreatingQueue;
    this.joinNewVoiceChannel = opts.joinNewVoiceChannel;
    this.streamType = opts.streamType;
    this.directLink = opts.directLink;
    checkInvalidKey(opts, this, "DisTubeOptions");
    __privateMethod(this, _validateOptions, validateOptions_fn).call(this);
  }
};
__name(Options, "Options");
_validateOptions = new WeakSet();
validateOptions_fn = /* @__PURE__ */ __name(function(options = this) {
  if (typeof options.emitNewSongOnly !== "boolean") {
    throw new DisTubeError("INVALID_TYPE", "boolean", options.emitNewSongOnly, "DisTubeOptions.emitNewSongOnly");
  }
  if (typeof options.leaveOnEmpty !== "boolean") {
    throw new DisTubeError("INVALID_TYPE", "boolean", options.leaveOnEmpty, "DisTubeOptions.leaveOnEmpty");
  }
  if (typeof options.leaveOnFinish !== "boolean") {
    throw new DisTubeError("INVALID_TYPE", "boolean", options.leaveOnFinish, "DisTubeOptions.leaveOnFinish");
  }
  if (typeof options.leaveOnStop !== "boolean") {
    throw new DisTubeError("INVALID_TYPE", "boolean", options.leaveOnStop, "DisTubeOptions.leaveOnStop");
  }
  if (typeof options.savePreviousSongs !== "boolean") {
    throw new DisTubeError("INVALID_TYPE", "boolean", options.savePreviousSongs, "DisTubeOptions.savePreviousSongs");
  }
  if (typeof options.joinNewVoiceChannel !== "boolean") {
    throw new DisTubeError(
      "INVALID_TYPE",
      "boolean",
      options.joinNewVoiceChannel,
      "DisTubeOptions.joinNewVoiceChannel"
    );
  }
  if (typeof options.youtubeCookie !== "undefined" && typeof options.youtubeCookie !== "string") {
    throw new DisTubeError("INVALID_TYPE", "string", options.youtubeCookie, "DisTubeOptions.youtubeCookie");
  }
  if (typeof options.youtubeIdentityToken !== "undefined" && typeof options.youtubeIdentityToken !== "string") {
    throw new DisTubeError(
      "INVALID_TYPE",
      "string",
      options.youtubeIdentityToken,
      "DisTubeOptions.youtubeIdentityToken"
    );
  }
  if (typeof options.customFilters !== "undefined" && typeof options.customFilters !== "object" || Array.isArray(options.customFilters)) {
    throw new DisTubeError("INVALID_TYPE", "object", options.customFilters, "DisTubeOptions.customFilters");
  }
  if (typeof options.ytdlOptions !== "object" || Array.isArray(options.ytdlOptions)) {
    throw new DisTubeError("INVALID_TYPE", "object", options.ytdlOptions, "DisTubeOptions.ytdlOptions");
  }
  if (typeof options.searchCooldown !== "number" || isNaN(options.searchCooldown)) {
    throw new DisTubeError("INVALID_TYPE", "number", options.searchCooldown, "DisTubeOptions.searchCooldown");
  }
  if (typeof options.emptyCooldown !== "number" || isNaN(options.emptyCooldown)) {
    throw new DisTubeError("INVALID_TYPE", "number", options.emptyCooldown, "DisTubeOptions.emptyCooldown");
  }
  if (typeof options.searchSongs !== "number" || isNaN(options.searchSongs)) {
    throw new DisTubeError("INVALID_TYPE", "number", options.searchSongs, "DisTubeOptions.searchSongs");
  }
  if (!Array.isArray(options.plugins)) {
    throw new DisTubeError("INVALID_TYPE", "Array<Plugin>", options.plugins, "DisTubeOptions.plugins");
  }
  if (typeof options.nsfw !== "boolean") {
    throw new DisTubeError("INVALID_TYPE", "boolean", options.nsfw, "DisTubeOptions.nsfw");
  }
  if (typeof options.emitAddSongWhenCreatingQueue !== "boolean") {
    throw new DisTubeError(
      "INVALID_TYPE",
      "boolean",
      options.emitAddSongWhenCreatingQueue,
      "DisTubeOptions.emitAddSongWhenCreatingQueue"
    );
  }
  if (typeof options.emitAddListWhenCreatingQueue !== "boolean") {
    throw new DisTubeError(
      "INVALID_TYPE",
      "boolean",
      options.emitAddListWhenCreatingQueue,
      "DisTubeOptions.emitAddListWhenCreatingQueue"
    );
  }
  if (typeof options.streamType !== "number" || isNaN(options.streamType) || !StreamType[options.streamType]) {
    throw new DisTubeError("INVALID_TYPE", "StreamType", options.streamType, "DisTubeOptions.streamType");
  }
  if (typeof options.directLink !== "boolean") {
    throw new DisTubeError("INVALID_TYPE", "boolean", options.directLink, "DisTubeOptions.directLink");
  }
}, "#validateOptions");

// src/core/DisTubeStream.ts
var import_prism_media = require("prism-media");
var import_voice2 = require("@discordjs/voice");
var chooseBestVideoFormat = /* @__PURE__ */ __name((formats, isLive = false) => {
  let filter = /* @__PURE__ */ __name((format) => format.hasAudio, "filter");
  if (isLive)
    filter = /* @__PURE__ */ __name((format) => format.hasAudio && format.isHLS, "filter");
  formats = formats.filter(filter).sort((a, b) => Number(b.audioBitrate) - Number(a.audioBitrate) || Number(a.bitrate) - Number(b.bitrate));
  return formats.find((format) => !format.hasVideo) || formats.sort((a, b) => Number(a.bitrate) - Number(b.bitrate))[0];
}, "chooseBestVideoFormat");
var DisTubeStream = class {
  constructor(url, options) {
    __publicField(this, "type");
    __publicField(this, "stream");
    __publicField(this, "url");
    this.url = url;
    this.type = !options.type ? import_voice2.StreamType.OggOpus : import_voice2.StreamType.Raw;
    const args = [
      "-reconnect",
      "1",
      "-reconnect_streamed",
      "1",
      "-reconnect_delay_max",
      "5",
      "-i",
      url,
      "-analyzeduration",
      "0",
      "-loglevel",
      "0",
      "-ar",
      "48000",
      "-ac",
      "2",
      "-f"
    ];
    if (!options.type) {
      args.push("opus", "-acodec", "libopus");
    } else {
      args.push("s16le");
    }
    if (typeof options.seek === "number" && options.seek > 0) {
      args.unshift("-ss", options.seek.toString());
    }
    if (Array.isArray(options.ffmpegArgs)) {
      args.push(...options.ffmpegArgs);
    }
    this.stream = new import_prism_media.FFmpeg({ args, shell: false });
    this.stream._readableState && (this.stream._readableState.highWaterMark = 1 << 25);
  }
  static YouTube(formats, options = {}) {
    if (!formats || !formats.length)
      throw new DisTubeError("UNAVAILABLE_VIDEO");
    if (!options || typeof options !== "object" || Array.isArray(options)) {
      throw new DisTubeError("INVALID_TYPE", "object", options, "options");
    }
    const bestFormat = chooseBestVideoFormat(formats, options.isLive);
    if (!bestFormat)
      throw new DisTubeError("UNPLAYABLE_FORMATS");
    return new DisTubeStream(bestFormat.url, options);
  }
  static DirectLink(url, options = {}) {
    if (!options || typeof options !== "object" || Array.isArray(options)) {
      throw new DisTubeError("INVALID_TYPE", "object", options, "options");
    }
    if (typeof url !== "string" || !isURL(url)) {
      throw new DisTubeError("INVALID_TYPE", "an URL", url);
    }
    return new DisTubeStream(url, options);
  }
};
__name(DisTubeStream, "DisTubeStream");

// src/core/manager/BaseManager.ts
var import_discord2 = require("discord.js");
var BaseManager = class extends DisTubeBase {
  constructor() {
    super(...arguments);
    __publicField(this, "collection", new import_discord2.Collection());
  }
  get size() {
    return this.collection.size;
  }
};
__name(BaseManager, "BaseManager");

// src/core/manager/GuildIdManager.ts
var GuildIdManager = class extends BaseManager {
  add(idOrInstance, data) {
    const id = resolveGuildId(idOrInstance);
    const existing = this.get(id);
    if (existing)
      return this;
    return this.collection.set(id, data);
  }
  get(idOrInstance) {
    return this.collection.get(resolveGuildId(idOrInstance));
  }
  remove(idOrInstance) {
    return this.collection.delete(resolveGuildId(idOrInstance));
  }
  has(idOrInstance) {
    return this.collection.has(resolveGuildId(idOrInstance));
  }
};
__name(GuildIdManager, "GuildIdManager");

// src/core/manager/DisTubeVoiceManager.ts
var import_voice3 = require("@discordjs/voice");
var DisTubeVoiceManager = class extends GuildIdManager {
  create(channel) {
    const existing = this.get(channel.guildId);
    if (existing) {
      existing.channel = channel;
      return existing;
    }
    return new DisTubeVoice(this, channel);
  }
  join(channel) {
    const existing = this.get(channel.guildId);
    if (existing)
      return existing.join(channel);
    return this.create(channel).join();
  }
  leave(guild) {
    const voice = this.get(guild);
    if (voice) {
      voice.leave();
    } else {
      const connection = (0, import_voice3.getVoiceConnection)(resolveGuildId(guild), this.client.user?.id) ?? (0, import_voice3.getVoiceConnection)(resolveGuildId(guild));
      if (connection && connection.state.status !== import_voice3.VoiceConnectionStatus.Destroyed) {
        connection.destroy();
      }
    }
  }
};
__name(DisTubeVoiceManager, "DisTubeVoiceManager");

// src/core/manager/FilterManager.ts
var _validate, validate_fn, _resolveName, resolveName_fn, _resolveValue, resolveValue_fn, _apply, apply_fn;
var FilterManager = class extends BaseManager {
  constructor(queue) {
    super(queue.distube);
    __privateAdd(this, _validate);
    __privateAdd(this, _resolveName);
    __privateAdd(this, _resolveValue);
    __privateAdd(this, _apply);
    __publicField(this, "queue");
    this.queue = queue;
  }
  add(filterOrFilters, override = false) {
    if (Array.isArray(filterOrFilters)) {
      const resolvedFilters = filterOrFilters.map((f) => __privateMethod(this, _validate, validate_fn).call(this, f));
      const newFilters = resolvedFilters.reduceRight((unique, o) => {
        if (!unique.some((obj) => obj === o && obj.name === o) && !unique.some((obj) => obj !== o.name && obj.name !== o.name)) {
          if (!this.has(o))
            unique.push(o);
          if (this.has(o) && override) {
            this.remove(o);
            unique.push(o);
          }
        }
        return unique;
      }, []).reverse();
      return this.set([...this.collection.values(), ...newFilters]);
    }
    return this.set([...this.collection.values(), filterOrFilters]);
  }
  clear() {
    return this.set([]);
  }
  set(filters) {
    this.collection.clear();
    for (const filter of filters) {
      const resolved = __privateMethod(this, _validate, validate_fn).call(this, filter);
      this.collection.set(__privateMethod(this, _resolveName, resolveName_fn).call(this, resolved), resolved);
    }
    __privateMethod(this, _apply, apply_fn).call(this);
    return this;
  }
  remove(filterOrFilters) {
    const remove = /* @__PURE__ */ __name((f) => this.collection.delete(__privateMethod(this, _resolveName, resolveName_fn).call(this, __privateMethod(this, _validate, validate_fn).call(this, f))), "remove");
    if (Array.isArray(filterOrFilters))
      filterOrFilters.map(remove);
    else
      remove(filterOrFilters);
    __privateMethod(this, _apply, apply_fn).call(this);
    return this;
  }
  has(filter) {
    return this.collection.has(__privateMethod(this, _resolveName, resolveName_fn).call(this, filter));
  }
  get names() {
    return this.collection.map((f) => __privateMethod(this, _resolveName, resolveName_fn).call(this, f));
  }
  get values() {
    return this.collection.map((f) => __privateMethod(this, _resolveValue, resolveValue_fn).call(this, f));
  }
  toString() {
    return this.names.toString();
  }
};
__name(FilterManager, "FilterManager");
_validate = new WeakSet();
validate_fn = /* @__PURE__ */ __name(function(filter) {
  if (typeof filter === "string" && Object.prototype.hasOwnProperty.call(this.distube.filters, filter) || typeof filter === "object" && typeof filter.name === "string" && typeof filter.value === "string") {
    return filter;
  }
  throw new DisTubeError("INVALID_TYPE", "FilterResolvable", filter, "filter");
}, "#validate");
_resolveName = new WeakSet();
resolveName_fn = /* @__PURE__ */ __name(function(filter) {
  return typeof filter === "string" ? filter : filter.name;
}, "#resolveName");
_resolveValue = new WeakSet();
resolveValue_fn = /* @__PURE__ */ __name(function(filter) {
  return typeof filter === "string" ? this.distube.filters[filter] : filter.value;
}, "#resolveValue");
_apply = new WeakSet();
apply_fn = /* @__PURE__ */ __name(function() {
  this.queue.beginTime = this.queue.currentTime;
  this.queues.playSong(this.queue);
}, "#apply");

// src/core/manager/QueueManager.ts
var _voiceEventHandler, voiceEventHandler_fn, _handleSongFinish, handleSongFinish_fn, _handlePlayingError, handlePlayingError_fn, _emitPlaySong, emitPlaySong_fn;
var QueueManager = class extends GuildIdManager {
  constructor() {
    super(...arguments);
    __privateAdd(this, _voiceEventHandler);
    __privateAdd(this, _handleSongFinish);
    __privateAdd(this, _handlePlayingError);
    __privateAdd(this, _emitPlaySong);
  }
  async create(channel, song, textChannel) {
    if (this.has(channel.guildId))
      throw new DisTubeError("QUEUE_EXIST");
    const voice = this.voices.create(channel);
    const queue = new Queue(this.distube, voice, song, textChannel);
    await queue._taskQueue.queuing();
    try {
      await voice.join();
      __privateMethod(this, _voiceEventHandler, voiceEventHandler_fn).call(this, queue);
      this.add(queue.id, queue);
      this.emit("initQueue", queue);
      const err = await this.playSong(queue);
      return err || queue;
    } finally {
      queue._taskQueue.resolve();
    }
  }
  createStream(queue) {
    const { duration, formats, isLive, source, streamURL } = queue.songs[0];
    const ffmpegArgs = queue.filters.size ? ["-af", queue.filters.values.join(",")] : void 0;
    const seek = duration ? queue.beginTime : void 0;
    const streamOptions = { ffmpegArgs, seek, isLive, type: this.options.streamType };
    if (source === "youtube")
      return DisTubeStream.YouTube(formats, streamOptions);
    return DisTubeStream.DirectLink(streamURL, streamOptions);
  }
  async playSong(queue) {
    if (!queue)
      return true;
    if (!queue.songs.length) {
      queue.stop();
      return true;
    }
    if (queue.stopped)
      return false;
    try {
      const song = queue.songs[0];
      const { url, source, formats, streamURL, isLive } = song;
      if (source === "youtube") {
        if (!formats || !chooseBestVideoFormat(formats, isLive)) {
          song._patchYouTube(await this.handler.getYouTubeInfo(url));
        }
      } else if (!streamURL) {
        for (const plugin of [...this.distube.extractorPlugins, ...this.distube.customPlugins]) {
          if (await plugin.validate(url)) {
            const info = [plugin.getStreamURL(url), plugin.getRelatedSongs(url)];
            const result = await Promise.all(info);
            song.streamURL = result[0];
            song.related = result[1];
            break;
          }
        }
      }
      const stream = this.createStream(queue);
      queue.voice.play(stream);
      song.streamURL = stream.url;
      if (queue.stopped)
        queue.stop();
      else if (queue.paused)
        queue.voice.pause();
      return false;
    } catch (e) {
      __privateMethod(this, _handlePlayingError, handlePlayingError_fn).call(this, queue, e);
      return true;
    }
  }
};
__name(QueueManager, "QueueManager");
_voiceEventHandler = new WeakSet();
voiceEventHandler_fn = /* @__PURE__ */ __name(function(queue) {
  queue._listeners = {
    disconnect: (error) => {
      queue.remove();
      this.emit("disconnect", queue);
      if (error)
        this.emitError(error, queue.textChannel);
    },
    error: (error) => __privateMethod(this, _handlePlayingError, handlePlayingError_fn).call(this, queue, error),
    finish: () => __privateMethod(this, _handleSongFinish, handleSongFinish_fn).call(this, queue)
  };
  for (const event of objectKeys(queue._listeners)) {
    queue.voice.on(event, queue._listeners[event]);
  }
}, "#voiceEventHandler");
_handleSongFinish = new WeakSet();
handleSongFinish_fn = /* @__PURE__ */ __name(async function(queue) {
  this.emit("finishSong", queue, queue.songs[0]);
  await queue._taskQueue.queuing();
  try {
    if (queue.stopped)
      return;
    if (queue.repeatMode === 2 /* QUEUE */ && !queue._prev)
      queue.songs.push(queue.songs[0]);
    if (queue._prev) {
      if (queue.repeatMode === 2 /* QUEUE */)
        queue.songs.unshift(queue.songs.pop());
      else
        queue.songs.unshift(queue.previousSongs.pop());
    }
    if (queue.songs.length <= 1 && (queue._next || queue.repeatMode === 0 /* DISABLED */)) {
      if (queue.autoplay) {
        try {
          await queue.addRelatedSong();
        } catch {
          this.emit("noRelated", queue);
        }
      }
      if (queue.songs.length <= 1) {
        if (this.options.leaveOnFinish)
          queue.voice.leave();
        if (!queue.autoplay)
          this.emit("finish", queue);
        queue.remove();
        return;
      }
    }
    const emitPlaySong = __privateMethod(this, _emitPlaySong, emitPlaySong_fn).call(this, queue);
    if (!queue._prev && (queue.repeatMode !== 1 /* SONG */ || queue._next)) {
      const prev = queue.songs.shift();
      delete prev.formats;
      delete prev.streamURL;
      if (this.options.savePreviousSongs)
        queue.previousSongs.push(prev);
      else
        queue.previousSongs.push({ id: prev.id });
    }
    queue._next = queue._prev = false;
    queue.beginTime = 0;
    const err = await this.playSong(queue);
    if (!err && emitPlaySong)
      this.emit("playSong", queue, queue.songs[0]);
  } finally {
    queue._taskQueue.resolve();
  }
}, "#handleSongFinish");
_handlePlayingError = new WeakSet();
handlePlayingError_fn = /* @__PURE__ */ __name(function(queue, error) {
  const song = queue.songs.shift();
  try {
    error.name = "PlayingError";
    error.message = `${error.message}
Id: ${song.id}
Name: ${song.name}`;
  } catch {
  }
  this.emitError(error, queue.textChannel);
  if (queue.songs.length > 0) {
    queue._next = queue._prev = false;
    queue.beginTime = 0;
    this.playSong(queue).then((e) => {
      if (!e)
        this.emit("playSong", queue, queue.songs[0]);
    });
  } else {
    queue.stop();
  }
}, "#handlePlayingError");
_emitPlaySong = new WeakSet();
emitPlaySong_fn = /* @__PURE__ */ __name(function(queue) {
  return !this.options.emitNewSongOnly || queue.repeatMode === 1 /* SONG */ && queue._next || queue.repeatMode !== 1 /* SONG */ && queue.songs[0]?.id !== queue.songs[1]?.id;
}, "#emitPlaySong");

// src/struct/Queue.ts
var _filters;
var Queue = class extends DisTubeBase {
  constructor(distube, voice, song, textChannel) {
    super(distube);
    __publicField(this, "id");
    __publicField(this, "voice");
    __publicField(this, "songs");
    __publicField(this, "previousSongs");
    __publicField(this, "stopped");
    __publicField(this, "_next");
    __publicField(this, "_prev");
    __publicField(this, "playing");
    __publicField(this, "paused");
    __publicField(this, "repeatMode");
    __publicField(this, "autoplay");
    __privateAdd(this, _filters, void 0);
    __publicField(this, "beginTime");
    __publicField(this, "textChannel");
    __publicField(this, "_emptyTimeout");
    __publicField(this, "_taskQueue");
    __publicField(this, "_listeners");
    this.voice = voice;
    this.id = voice.id;
    this.volume = 50;
    this.songs = Array.isArray(song) ? [...song] : [song];
    this.previousSongs = [];
    this.stopped = false;
    this._next = false;
    this._prev = false;
    this.playing = true;
    this.paused = false;
    this.repeatMode = 0 /* DISABLED */;
    this.autoplay = false;
    __privateSet(this, _filters, new FilterManager(this));
    this.beginTime = 0;
    this.textChannel = textChannel;
    this._emptyTimeout = void 0;
    this._taskQueue = new TaskQueue();
    this._listeners = void 0;
  }
  get clientMember() {
    return this.voice.channel.guild.members.me ?? void 0;
  }
  get filters() {
    return __privateGet(this, _filters);
  }
  get formattedDuration() {
    return formatDuration(this.duration);
  }
  get duration() {
    return this.songs.length ? this.songs.reduce((prev, next) => prev + next.duration, 0) : 0;
  }
  get currentTime() {
    return this.voice.playbackDuration + this.beginTime;
  }
  get formattedCurrentTime() {
    return formatDuration(this.currentTime);
  }
  get voiceChannel() {
    return this.clientMember?.voice?.channel ?? null;
  }
  get volume() {
    return this.voice.volume;
  }
  set volume(value) {
    this.voice.volume = value;
  }
  addToQueue(song, position = 0) {
    if (!song || Array.isArray(song) && !song.length) {
      throw new DisTubeError("INVALID_TYPE", ["Song", "Array<Song>"], song, "song");
    }
    if (typeof position !== "number" || !Number.isInteger(position)) {
      throw new DisTubeError("INVALID_TYPE", "integer", position, "position");
    }
    if (position <= 0) {
      if (Array.isArray(song))
        this.songs.push(...song);
      else
        this.songs.push(song);
    } else if (Array.isArray(song)) {
      this.songs.splice(position, 0, ...song);
    } else {
      this.songs.splice(position, 0, song);
    }
    if (Array.isArray(song))
      song.map((s) => delete s.formats);
    else
      delete song.formats;
    return this;
  }
  pause() {
    if (this.paused)
      throw new DisTubeError("PAUSED");
    this.playing = false;
    this.paused = true;
    this.voice.pause();
    return this;
  }
  resume() {
    if (this.playing)
      throw new DisTubeError("RESUMED");
    this.playing = true;
    this.paused = false;
    this.voice.unpause();
    return this;
  }
  setVolume(percent) {
    this.volume = percent;
    return this;
  }
  async skip() {
    await this._taskQueue.queuing();
    try {
      if (this.songs.length <= 1) {
        if (this.autoplay)
          await this.addRelatedSong();
        else
          throw new DisTubeError("NO_UP_NEXT");
      }
      const song = this.songs[1];
      this._next = true;
      this.voice.stop();
      return song;
    } finally {
      this._taskQueue.resolve();
    }
  }
  async previous() {
    await this._taskQueue.queuing();
    try {
      if (!this.options.savePreviousSongs)
        throw new DisTubeError("DISABLED_OPTION", "savePreviousSongs");
      if (this.previousSongs?.length === 0 && this.repeatMode !== 2 /* QUEUE */) {
        throw new DisTubeError("NO_PREVIOUS");
      }
      const song = this.repeatMode === 2 ? this.songs[this.songs.length - 1] : this.previousSongs[this.previousSongs.length - 1];
      this._prev = true;
      this.voice.stop();
      return song;
    } finally {
      this._taskQueue.resolve();
    }
  }
  async shuffle() {
    await this._taskQueue.queuing();
    try {
      const playing = this.songs.shift();
      if (playing === void 0)
        return this;
      for (let i = this.songs.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this.songs[i], this.songs[j]] = [this.songs[j], this.songs[i]];
      }
      this.songs.unshift(playing);
      return this;
    } finally {
      this._taskQueue.resolve();
    }
  }
  async jump(position) {
    await this._taskQueue.queuing();
    try {
      if (typeof position !== "number")
        throw new DisTubeError("INVALID_TYPE", "number", position, "position");
      if (!position || position > this.songs.length || -position > this.previousSongs.length) {
        throw new DisTubeError("NO_SONG_POSITION");
      }
      let nextSong;
      if (position > 0) {
        const nextSongs = this.songs.splice(position - 1);
        if (this.options.savePreviousSongs) {
          this.previousSongs.push(...this.songs);
        } else {
          this.previousSongs.push(...this.songs.map((s) => ({ id: s.id })));
        }
        this.songs = nextSongs;
        this._next = true;
        nextSong = nextSongs[1];
      } else if (!this.options.savePreviousSongs) {
        throw new DisTubeError("DISABLED_OPTION", "savePreviousSongs");
      } else {
        this._prev = true;
        if (position !== -1)
          this.songs.unshift(...this.previousSongs.splice(position + 1));
        nextSong = this.previousSongs[this.previousSongs.length - 1];
      }
      this.voice.stop();
      return nextSong;
    } finally {
      this._taskQueue.resolve();
    }
  }
  setRepeatMode(mode) {
    if (mode !== void 0 && !Object.values(RepeatMode).includes(mode)) {
      throw new DisTubeError("INVALID_TYPE", ["RepeatMode", "undefined"], mode, "mode");
    }
    if (mode === void 0)
      this.repeatMode = (this.repeatMode + 1) % 3;
    else if (this.repeatMode === mode)
      this.repeatMode = 0 /* DISABLED */;
    else
      this.repeatMode = mode;
    return this.repeatMode;
  }
  seek(time) {
    if (typeof time !== "number")
      throw new DisTubeError("INVALID_TYPE", "number", time, "time");
    if (isNaN(time) || time < 0)
      throw new DisTubeError("NUMBER_COMPARE", "time", "bigger or equal to", 0);
    this.beginTime = time;
    this.queues.playSong(this);
    return this;
  }
  async addRelatedSong() {
    if (!this.songs?.[0])
      throw new DisTubeError("NO_PLAYING");
    const related = this.songs[0].related.find((v) => !this.previousSongs.map((s) => s.id).includes(v.id));
    if (!related || !(related instanceof Song))
      throw new DisTubeError("NO_RELATED");
    const song = await this.handler.resolve(related, { member: this.clientMember, metadata: related.metadata });
    if (!(song instanceof Song))
      throw new DisTubeError("CANNOT_PLAY_RELATED");
    this.addToQueue(song);
    return song;
  }
  async stop() {
    await this._taskQueue.queuing();
    try {
      this.playing = false;
      this.paused = false;
      this.stopped = true;
      if (this.options.leaveOnStop)
        this.voice.leave();
      else
        this.voice.stop();
      this.remove();
    } finally {
      this._taskQueue.resolve();
    }
  }
  remove() {
    this.stopped = true;
    this.songs = [];
    this.previousSongs = [];
    if (this._listeners) {
      for (const event of objectKeys(this._listeners)) {
        this.voice.removeListener(event, this._listeners[event]);
      }
    }
    this.queues.remove(this.id);
    this.emit("deleteQueue", this);
  }
  toggleAutoplay() {
    this.autoplay = !this.autoplay;
    return this.autoplay;
  }
};
__name(Queue, "Queue");
_filters = new WeakMap();

// src/struct/Plugin.ts
var Plugin = class {
  constructor() {
    __publicField(this, "distube");
  }
  init(distube) {
    this.distube = distube;
  }
  emit(eventName, ...args) {
    return this.distube.emit(eventName, ...args);
  }
  emitError(error, channel) {
    this.distube.emitError(error, channel);
  }
  get queues() {
    return this.distube.queues;
  }
  get voices() {
    return this.distube.voices;
  }
  get client() {
    return this.distube.client;
  }
  get options() {
    return this.distube.options;
  }
  get handler() {
    return this.distube.handler;
  }
  validate(_string) {
    return false;
  }
  getStreamURL(url) {
    return url;
  }
  getRelatedSongs(_url) {
    return [];
  }
};
__name(Plugin, "Plugin");

// src/struct/CustomPlugin.ts
var CustomPlugin = class extends Plugin {
  constructor() {
    super(...arguments);
    __publicField(this, "type", "custom" /* CUSTOM */);
  }
};
__name(CustomPlugin, "CustomPlugin");

// src/struct/ExtractorPlugin.ts
var ExtractorPlugin = class extends Plugin {
  constructor() {
    super(...arguments);
    __publicField(this, "type", "extractor" /* EXTRACTOR */);
  }
};
__name(ExtractorPlugin, "ExtractorPlugin");

// src/util.ts
var import_url = require("url");
var import_discord3 = require("discord.js");
var formatInt = /* @__PURE__ */ __name((int) => int < 10 ? `0${int}` : int, "formatInt");
function formatDuration(sec) {
  if (!sec || !Number(sec))
    return "00:00";
  const seconds = Math.round(sec % 60);
  const minutes = Math.floor(sec % 3600 / 60);
  const hours = Math.floor(sec / 3600);
  if (hours > 0)
    return `${formatInt(hours)}:${formatInt(minutes)}:${formatInt(seconds)}`;
  if (minutes > 0)
    return `${formatInt(minutes)}:${formatInt(seconds)}`;
  return `00:${formatInt(seconds)}`;
}
__name(formatDuration, "formatDuration");
function toSecond(input) {
  if (!input)
    return 0;
  if (typeof input !== "string")
    return Number(input) || 0;
  if (input.match(/:/g)) {
    const time = input.split(":").reverse();
    let s = 0;
    for (let i = 0; i < 3; i++)
      if (time[i])
        s += Number(time[i].replace(/[^\d.]+/g, "")) * Math.pow(60, i);
    if (time.length > 3)
      s += Number(time[3].replace(/[^\d.]+/g, "")) * 24 * 60 * 60;
    return s;
  } else {
    return Number(input.replace(/[^\d.]+/g, "")) || 0;
  }
}
__name(toSecond, "toSecond");
function parseNumber(input) {
  if (typeof input === "string")
    return Number(input.replace(/[^\d.]+/g, "")) || 0;
  return Number(input) || 0;
}
__name(parseNumber, "parseNumber");
function isURL(input) {
  if (typeof input !== "string" || input.includes(" "))
    return false;
  try {
    const url = new import_url.URL(input);
    if (!["https:", "http:"].includes(url.protocol) || !url.host)
      return false;
  } catch {
    return false;
  }
  return true;
}
__name(isURL, "isURL");
function checkIntents(options) {
  const intents = new import_discord3.IntentsBitField(options.intents);
  if (!intents.has(import_discord3.GatewayIntentBits.GuildVoiceStates))
    throw new DisTubeError("MISSING_INTENTS", "GuildVoiceStates");
}
__name(checkIntents, "checkIntents");
function isVoiceChannelEmpty(voiceState) {
  const guild = voiceState.guild;
  const clientId = voiceState.client.user?.id;
  if (!guild || !clientId)
    return false;
  const voiceChannel = guild.members.me?.voice?.channel;
  if (!voiceChannel)
    return false;
  const members = voiceChannel.members.filter((m) => !m.user.bot);
  return !members.size;
}
__name(isVoiceChannelEmpty, "isVoiceChannelEmpty");
function isSnowflake(id) {
  try {
    return import_discord3.SnowflakeUtil.deconstruct(id).timestamp > import_discord3.SnowflakeUtil.epoch;
  } catch {
    return false;
  }
}
__name(isSnowflake, "isSnowflake");
function isMemberInstance(member) {
  return !!member && isSnowflake(member.id) && isSnowflake(member.guild?.id) && isSnowflake(member.user?.id) && member.id === member.user.id;
}
__name(isMemberInstance, "isMemberInstance");
function isTextChannelInstance(channel) {
  return !!channel && isSnowflake(channel.id) && isSnowflake(channel.guildId) && typeof channel.name === "string" && import_discord3.Constants.TextBasedChannelTypes.includes(channel.type) && typeof channel.nsfw === "boolean" && "messages" in channel && typeof channel.send === "function";
}
__name(isTextChannelInstance, "isTextChannelInstance");
function isMessageInstance(message) {
  return !!message && isSnowflake(message.id) && isSnowflake(message.guildId) && isMemberInstance(message.member) && isTextChannelInstance(message.channel) && import_discord3.Constants.NonSystemMessageTypes.includes(message.type) && message.member.id === message.author?.id;
}
__name(isMessageInstance, "isMessageInstance");
function isSupportedVoiceChannel(channel) {
  return !!channel && isSnowflake(channel.id) && isSnowflake(channel.guildId) && import_discord3.Constants.VoiceBasedChannelTypes.includes(channel.type);
}
__name(isSupportedVoiceChannel, "isSupportedVoiceChannel");
function isGuildInstance(guild) {
  return !!guild && isSnowflake(guild.id) && isSnowflake(guild.ownerId) && typeof guild.name === "string";
}
__name(isGuildInstance, "isGuildInstance");
function resolveGuildId(resolvable) {
  let guildId;
  if (typeof resolvable === "string") {
    guildId = resolvable;
  } else if (isObject(resolvable)) {
    if ("guildId" in resolvable && resolvable.guildId) {
      guildId = resolvable.guildId;
    } else if (resolvable instanceof Queue || resolvable instanceof DisTubeVoice || isGuildInstance(resolvable)) {
      guildId = resolvable.id;
    } else if ("guild" in resolvable && isGuildInstance(resolvable.guild)) {
      guildId = resolvable.guild.id;
    }
  }
  if (!isSnowflake(guildId))
    throw new DisTubeError("INVALID_TYPE", "GuildIdResolvable", resolvable);
  return guildId;
}
__name(resolveGuildId, "resolveGuildId");
function isClientInstance(client) {
  return !!client && typeof client.login === "function";
}
__name(isClientInstance, "isClientInstance");
function checkInvalidKey(target, source, sourceName) {
  if (!isObject(target))
    throw new DisTubeError("INVALID_TYPE", "object", target, sourceName);
  const sourceKeys = Array.isArray(source) ? source : objectKeys(source);
  const invalidKey = objectKeys(target).find((key) => !sourceKeys.includes(key));
  if (invalidKey)
    throw new DisTubeError("INVALID_KEY", sourceName, invalidKey);
}
__name(checkInvalidKey, "checkInvalidKey");
function isObject(obj) {
  return typeof obj === "object" && obj !== null && !Array.isArray(obj);
}
__name(isObject, "isObject");
function isRecord(obj) {
  return isObject(obj);
}
__name(isRecord, "isRecord");
function objectKeys(obj) {
  if (!isObject(obj))
    return [];
  return Object.keys(obj);
}
__name(objectKeys, "objectKeys");

// src/plugin/DirectLink.ts
var import_undici = require("undici");
var DirectLinkPlugin = class extends ExtractorPlugin {
  async validate(url) {
    try {
      const headers = await (0, import_undici.request)(url, { method: "HEAD" }).then((res) => res.headers);
      const type = headers["content-type"];
      if (type?.startsWith("audio"))
        return true;
    } catch {
    }
    return false;
  }
  async resolve(url, options = {}) {
    url = url.replace(/\/+$/, "");
    return new Song(
      {
        name: url.substring(url.lastIndexOf("/") + 1).replace(/((\?|#).*)?$/, "") || url,
        url,
        src: "direct_link"
      },
      options
    );
  }
};
__name(DirectLinkPlugin, "DirectLinkPlugin");

// src/DisTube.ts
var import_ytsr = __toESM(require("@distube/ytsr"));
var import_tiny_typed_emitter2 = require("events").EventEmitter;
var version = require("../../../package.json");
var DisTube = class extends import_tiny_typed_emitter2.TypedEmitter {
  constructor(client, otp = {}) {
    super();
    __publicField(this, "handler");
    __publicField(this, "options");
    __publicField(this, "client");
    __publicField(this, "queues");
    __publicField(this, "voices");
    __publicField(this, "extractorPlugins");
    __publicField(this, "customPlugins");
    __publicField(this, "filters");
    this.setMaxListeners(1);
    if (!isClientInstance(client))
      throw new DisTubeError("INVALID_TYPE", "Discord.Client", client, "client");
    this.client = client;
    checkIntents(client.options);
    this.options = new Options(otp);
    this.voices = new DisTubeVoiceManager(this);
    this.handler = new DisTubeHandler(this);
    this.queues = new QueueManager(this);
    this.filters = { ...defaultFilters, ...this.options.customFilters };
    if (this.options.directLink)
      this.options.plugins.push(new DirectLinkPlugin());
    this.options.plugins.map((p) => p.init(this));
    this.extractorPlugins = this.options.plugins.filter((p) => p.type === "extractor");
    this.customPlugins = this.options.plugins.filter((p) => p.type === "custom");
  }
  static get version() {
    return version;
  }
  get version() {
    return version;
  }
  async play(voiceChannel, song, options = {}) {
    if (!isSupportedVoiceChannel(voiceChannel)) {
      throw new DisTubeError("INVALID_TYPE", "BaseGuildVoiceChannel", voiceChannel, "voiceChannel");
    }
    if (!isObject(options))
      throw new DisTubeError("INVALID_TYPE", "object", options, "options");
    const { textChannel, member, skip, message, metadata } = {
      member: voiceChannel.guild.members.me ?? void 0,
      textChannel: options?.message?.channel,
      skip: false,
      ...options
    };
    const position = Number(options.position) || (skip ? 1 : 0);
    if (message && !isMessageInstance(message)) {
      throw new DisTubeError("INVALID_TYPE", ["Discord.Message", "a falsy value"], message, "options.message");
    }
    if (textChannel && !isTextChannelInstance(textChannel)) {
      throw new DisTubeError("INVALID_TYPE", "Discord.GuildTextBasedChannel", textChannel, "options.textChannel");
    }
    if (member && !isMemberInstance(member)) {
      throw new DisTubeError("INVALID_TYPE", "Discord.GuildMember", member, "options.member");
    }
    const queue = this.getQueue(voiceChannel);
    const queuing = !!queue && !queue._taskQueue.hasResolveTask;
    if (queuing)
      await queue?._taskQueue.queuing(true);
    try {
      if (typeof song === "string") {
        for (const plugin of this.customPlugins) {
          if (await plugin.validate(song)) {
            await plugin.play(voiceChannel, song, options);
            return;
          }
        }
      }
      if (typeof song === "string" && !isURL(song)) {
        if (!message) {
          song = (await this.search(song, { limit: 1 }))[0];
        } else {
          const result = await this.handler.searchSong(message, song);
          if (!result)
            return;
          song = result;
        }
      }
      song = await this.handler.resolve(song, { member, metadata });
      if (song instanceof Playlist) {
        await this.handler.playPlaylist(voiceChannel, song, { textChannel, skip, position });
      } else {
        await this.handler.playSong(voiceChannel, song, { textChannel, skip, position });
      }
    } catch (e) {
      if (!(e instanceof DisTubeError)) {
        try {
          e.name = "PlayError";
          e.message = `${typeof song === "string" ? song : song.url} ${e.message}`;
        } catch {}
      }
      throw e;
    } finally {
      if (queuing)
        queue?._taskQueue.resolve();
    }
  }
  async createCustomPlaylist(songs, options = {}) {
    const { member, properties, parallel, metadata } = { parallel: true, ...options };
    if (!Array.isArray(songs))
      throw new DisTubeError("INVALID_TYPE", "Array", songs, "songs");
    if (!songs.length)
      throw new DisTubeError("EMPTY_ARRAY", "songs");
    const filteredSongs = songs.filter(
      (song) => song instanceof Song || isURL(song) || typeof song !== "string" && song.type === "video" /* VIDEO */
    );
    if (!filteredSongs.length)
      throw new DisTubeError("NO_VALID_SONG");
    if (member && !isMemberInstance(member)) {
      throw new DisTubeError("INVALID_TYPE", "Discord.Member", member, "options.member");
    }
    if (!filteredSongs.length)
      throw new DisTubeError("NO_VALID_SONG");
    let resolvedSongs;
    if (parallel) {
      const promises = filteredSongs.map(
        (song) => this.handler.resolve(song, { member, metadata }).catch(() => void 0)
      );
      resolvedSongs = (await Promise.all(promises)).filter((s) => !!s);
    } else {
      const resolved = [];
      for (const song of filteredSongs) {
        resolved.push(await this.handler.resolve(song, { member, metadata }).catch(() => void 0));
      }
      resolvedSongs = resolved.filter((s) => !!s);
    }
    return new Playlist(resolvedSongs, { member, properties, metadata });
  }
  async search(string, options = {}) {
    const opts = { type: "video" /* VIDEO */, limit: 10, safeSearch: false, ...options };
    if (typeof opts.type !== "string" || !["video", "playlist"].includes(opts.type)) {
      throw new DisTubeError("INVALID_TYPE", ["video", "playlist"], opts.type, "options.type");
    }
    if (typeof opts.limit !== "number")
      throw new DisTubeError("INVALID_TYPE", "number", opts.limit, "options.limit");
    if (opts.limit < 1)
      throw new DisTubeError("NUMBER_COMPARE", "option.limit", "bigger or equal to", 1);
    if (typeof opts.safeSearch !== "boolean") {
      throw new DisTubeError("INVALID_TYPE", "boolean", opts.safeSearch, "options.safeSearch");
    }
    try {
      const search = await (0, import_ytsr.default)(string, opts);
      const results = search.items.map((i) => {
        if (i.type === "video")
          return new SearchResultVideo(i);
        return new SearchResultPlaylist(i);
      });
      if (results.length === 0)
        throw new DisTubeError("NO_RESULT");
      return results;
    } catch (e) {
      if (options.retried)
        throw e;
      options.retried = true;
      return this.search(string, options);
    }
  }
  getQueue(guild) {
    return this.queues.get(guild);
  }
  pause(guild) {
    const q = this.getQueue(guild);
    if (!q)
      throw new DisTubeError("NO_QUEUE");
    return q.pause();
  }
  resume(guild) {
    const q = this.getQueue(guild);
    if (!q)
      throw new DisTubeError("NO_QUEUE");
    return q.resume();
  }
  stop(guild) {
    const q = this.getQueue(guild);
    if (!q)
      throw new DisTubeError("NO_QUEUE");
    return q.stop();
  }
  setVolume(guild, percent) {
    const q = this.getQueue(guild);
    if (!q)
      throw new DisTubeError("NO_QUEUE");
    return q.setVolume(percent);
  }
  skip(guild) {
    const q = this.getQueue(guild);
    if (!q)
      throw new DisTubeError("NO_QUEUE");
    return q.skip();
  }
  previous(guild) {
    const q = this.getQueue(guild);
    if (!q)
      throw new DisTubeError("NO_QUEUE");
    return q.previous();
  }
  shuffle(guild) {
    const q = this.getQueue(guild);
    if (!q)
      throw new DisTubeError("NO_QUEUE");
    return q.shuffle();
  }
  jump(guild, num) {
    const q = this.getQueue(guild);
    if (!q)
      throw new DisTubeError("NO_QUEUE");
    return q.jump(num);
  }
  setRepeatMode(guild, mode) {
    const q = this.getQueue(guild);
    if (!q)
      throw new DisTubeError("NO_QUEUE");
    return q.setRepeatMode(mode);
  }
  toggleAutoplay(guild) {
    const q = this.getQueue(guild);
    if (!q)
      throw new DisTubeError("NO_QUEUE");
    q.autoplay = !q.autoplay;
    return q.autoplay;
  }
  addRelatedSong(guild) {
    const q = this.getQueue(guild);
    if (!q)
      throw new DisTubeError("NO_QUEUE");
    return q.addRelatedSong();
  }
  seek(guild, time) {
    const q = this.getQueue(guild);
    if (!q)
      throw new DisTubeError("NO_QUEUE");
    return q.seek(time);
  }
  emitError(error, channel) {
    if (this.listeners("error").length) {
      this.emit("error", channel, error);
    } else {
      console.error(error);
      console.warn("Sự kiện 'error' chưa được xử lý.");
      console.warn("Xem: https://distube.js.org/#/docs/DisTube/stable/class/DisTube?scrollTo=e-error và https://nodejs.org/api/events.html#events_error_events");
    }
  }
};
__name(DisTube, "DisTube");
// Chú thích các tên xuất CommonJS cho nhập ESM trong nút:
0 && (module.exports = {
  BaseManager,
  CustomPlugin,
  DirectLinkPlugin,
  DisTube,
  DisTubeBase,
  DisTubeError,
  DisTubeHandler,
  DisTubeStream,
  DisTubeVoice,
  DisTubeVoiceManager,
  Events,
  ExtractorPlugin,
  FilterManager,
  GuildIdManager,
  Options,
  Playlist,
  Plugin,
  PluginType,
  Queue,
  QueueManager,
  RepeatMode,
  SearchResultPlaylist,
  SearchResultType,
  SearchResultVideo,
  Song,
  StreamType,
  TaskQueue,
  checkIntents,
  checkInvalidKey,
  chooseBestVideoFormat,
  defaultFilters,
  defaultOptions,
  formatDuration,
  isClientInstance,
  isGuildInstance,
  isMemberInstance,
  isMessageInstance,
  isObject,
  isRecord,
  isSnowflake,
  isSupportedVoiceChannel,
  isTextChannelInstance,
  isURL,
  isVoiceChannelEmpty,
  objectKeys,
  parseNumber,
  resolveGuildId,
  toSecond,
  version
});