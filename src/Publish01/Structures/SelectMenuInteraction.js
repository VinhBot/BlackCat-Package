'use strict';

const MessageComponentInteraction = require('./MessageComponentInteraction');

/**
 * Represents a select menu interaction.
 * @extends {MessageComponentInteraction}
 */
class SelectMenuInteraction extends MessageComponentInteraction {
  constructor(client, data) {
    super(client, data);
    this.values = data.data.values ?? [];
  }
}

module.exports = SelectMenuInteraction;
