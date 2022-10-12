'use strict';

const { createEnum } = require('./Enums');

/**
 * Sự liệt kê cho các phần.
 * ```js
 * const { Client, Partials } = require('discord.js');
 *
 * const client = new Client({
 *   intents: [
 *     // Intents...
 *   ],
 *   partials: [
 *     Partials.User, // Chúng tôi muốn nhận được những người dùng chưa được xóa!
 *     Partials.Message // Chúng tôi muốn nhận tin nhắn chưa được xóa!
 *   ]
 * });
 * ```
 * @typedef {Object} Partials
 * @property {number} Người dùng Một phần để nhận người dùng chưa được lưu trữ.
 * @property {number} Kênh Một phần để nhận các kênh chưa được xóa.
 * <info> Đây là điều bắt buộc để nhận được tin nhắn trực tiếp! </info>
 * @property {number} GuildMember Một phần để nhận các thành viên của guild chưa được tách biệt.
 * @property {number} Tin nhắn Một phần để nhận các tin nhắn chưa được lưu trữ.
 * @property {number} Phản ứng Một phần để nhận các phản ứng chưa được tẩy trắng.
 * @property {number} GuildScheduledEvent Một phần để nhận các sự kiện đã lên lịch của guild chưa được xóa.
 * @property {number} ThreadMember Một phần để nhận các thành viên chủ đề chưa được lưu trữ.
 */

// JSDoc cho các mục đích IntelliSense
/**
 * @type {Partials}
 * @ignore
 */
module.exports = createEnum([
  'User',
  'Channel',
  'GuildMember',
  'Message',
  'Reaction',
  'GuildScheduledEvent',
  'ThreadMember',
]);
