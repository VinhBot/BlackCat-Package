'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const v10 = require('../../../../api');
const ApplicationCommandOptionBase = require('../Mixins/ApplicationCommandOptionBase.cjs');

class SlashCommandBooleanOption extends ApplicationCommandOptionBase.ApplicationCommandOptionBase {
  constructor() {
    super(...arguments);
    this.type = v10.ApplicationCommandOptionType.Boolean;
  }
  toJSON() {
    this.runRequiredValidations();
    return { ...this };
  }
}

exports.SlashCommandBooleanOption = SlashCommandBooleanOption;