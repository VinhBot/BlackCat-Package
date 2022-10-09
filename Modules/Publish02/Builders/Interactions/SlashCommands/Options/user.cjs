'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const v10 = require('../../../../api');
const ApplicationCommandOptionBase = require('../Mixins/ApplicationCommandOptionBase.cjs');

class SlashCommandUserOption extends ApplicationCommandOptionBase.ApplicationCommandOptionBase {
  constructor() {
    super(...arguments);
    this.type = v10.ApplicationCommandOptionType.User;
  }
  toJSON() {
    this.runRequiredValidations();
    return { ...this };
  }
}

exports.SlashCommandUserOption = SlashCommandUserOption;