'use strict';

const { ButtonBuilder: BuildersButton, isJSONEncodable } = require('../../Publish02/index');
const { toSnakeCase } = require('../Util/Transformers');
const { resolvePartialEmoji } = require('../Util/Util');

/**
 * Represents a button builder.
 * @extends {BuildersButton}
 */
class ButtonBuilder extends BuildersButton {
  constructor({ emoji, ...data } = {}) {
    super(toSnakeCase({ ...data, emoji: emoji && typeof emoji === 'string' ? resolvePartialEmoji(emoji) : emoji }));
  }

  /**
   * Sets the emoji to display on this button
   * @param {string|APIMessageComponentEmoji} emoji The emoji to display on this button
   * @returns {ButtonBuilder}
   */
  setEmoji(emoji) {
    if (typeof emoji === 'string') {
      return super.setEmoji(resolvePartialEmoji(emoji));
    }
    return super.setEmoji(emoji);
  }

  /**
   * Creates a new button builder from JSON data
   * @param {JSONEncodable<APIButtonComponent>|APIButtonComponent} other The other data
   * @returns {ButtonBuilder}
   */
  static from(other) {
    if (isJSONEncodable(other)) {
      return new this(other.toJSON());
    }
    return new this(other);
  }
}

module.exports = ButtonBuilder;

/**
 * @external BuildersButton
 * @see {@link https://discord.js.org/#/docs/builders/main/class/ButtonBuilder}
 */
