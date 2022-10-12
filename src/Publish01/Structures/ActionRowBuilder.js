'use strict';

const { ActionRowBuilder: BuildersActionRow, isJSONEncodable } = require('../../Publish02/index');
const { createComponentBuilder } = require('../Util/Components');
const { toSnakeCase } = require('../Util/Transformers');

/**
 * Represents an action row builder.
 * @extends {BuildersActionRow}
 */
class ActionRowBuilder extends BuildersActionRow {
  constructor({ components, ...data } = {}) {
    super({
      ...toSnakeCase(data),
      components: components?.map(c => createComponentBuilder(c)),
    });
  }

  /**
   * Creates a new action row builder from JSON data
   * @param {JSONEncodable<APIActionRowComponent<APIActionRowComponentTypes>>
   * |APIActionRowComponent<APIActionRowComponentTypes>} other The other data
   * @returns {ActionRowBuilder}
   */
  static from(other) {
    if (isJSONEncodable(other)) {
      return new this(other.toJSON());
    }
    return new this(other);
  }
}

module.exports = ActionRowBuilder;

/**
 * @external BuildersActionRow
 * @see {@link https://discord.js.org/#/docs/builders/main/class/ActionRowBuilder}
 */
