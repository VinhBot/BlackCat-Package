'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const v10 = require('../../api');
const ActionRow = require('./ActionRow.cjs');
const Component = require('./Component.cjs');
const Button = require('./Button/Button.cjs');
const SelectMenu = require('./SelectMenu/SelectMenu.cjs');
const TextInput = require('./TextInput/TextInput.cjs');

function createComponentBuilder(data) {
  if (data instanceof Component.ComponentBuilder) {
    return data;
  }
  switch (data.type) {
    case v10.ComponentType.ActionRow:
      return new ActionRow.ActionRowBuilder(data);
    case v10.ComponentType.Button:
      return new Button.ButtonBuilder(data);
    case v10.ComponentType.SelectMenu:
      return new SelectMenu.SelectMenuBuilder(data);
    case v10.ComponentType.TextInput:
      return new TextInput.TextInputBuilder(data);
    default:
      throw new Error(`Không thể tuần tự hóa đúng loại thành phần: ${data.type}`);
  }
}

exports.createComponentBuilder = createComponentBuilder;