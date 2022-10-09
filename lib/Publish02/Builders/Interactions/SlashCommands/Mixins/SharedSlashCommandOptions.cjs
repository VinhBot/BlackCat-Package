'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const Assertions = require('../Assertions.cjs');
const attachment = require('../Options/attachment.cjs');
const boolean = require('../Options/boolean.cjs');
const channel = require('../Options/channel.cjs');
const integer = require('../Options/integer.cjs');
const mentionable = require('../Options/mentionable.cjs');
const number = require('../Options/number.cjs');
const role = require('../Options/role.cjs');
const string = require('../Options/string.cjs');
const user = require('../Options/user.cjs');

class SharedSlashCommandOptions {
  addBooleanOption(input) {
    return this._sharedAddOptionMethod(input, boolean.SlashCommandBooleanOption);
  }
  addUserOption(input) {
    return this._sharedAddOptionMethod(input, user.SlashCommandUserOption);
  }
  addChannelOption(input) {
    return this._sharedAddOptionMethod(input, channel.SlashCommandChannelOption);
  }
  addRoleOption(input) {
    return this._sharedAddOptionMethod(input, role.SlashCommandRoleOption);
  }
  addAttachmentOption(input) {
    return this._sharedAddOptionMethod(input, attachment.SlashCommandAttachmentOption);
  }
  addMentionableOption(input) {
    return this._sharedAddOptionMethod(input, mentionable.SlashCommandMentionableOption);
  }
  addStringOption(input) {
    return this._sharedAddOptionMethod(input, string.SlashCommandStringOption);
  }
  addIntegerOption(input) {
    return this._sharedAddOptionMethod(input, integer.SlashCommandIntegerOption);
  }
  addNumberOption(input) {
    return this._sharedAddOptionMethod(input, number.SlashCommandNumberOption);
  }
  _sharedAddOptionMethod(input, Instance) {
    const { options } = this;
    Assertions.validateMaxOptionsLength(options);
    const result = typeof input === "function" ? input(new Instance()) : input;
    Assertions.assertReturnOfBuilder(result, Instance);
    options.push(result);
    return this;
  }
}

exports.SharedSlashCommandOptions = SharedSlashCommandOptions;
//# sourceMappingURL=SharedSlashCommandOptions.cjs.map
