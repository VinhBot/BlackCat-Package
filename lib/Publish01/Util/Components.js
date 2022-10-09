'use strict';
const { ComponentBuilder } = require('../../Publish02/index');
const { ComponentType } = require('../../Publish02/api');

function createComponent(data) {
  if (data instanceof Component) {
    return data;
  }
  switch (data.type) {
    case ComponentType.ActionRow:
      return new ActionRow(data);
    case ComponentType.Button:
      return new ButtonComponent(data);
    case ComponentType.SelectMenu:
      return new SelectMenuComponent(data);
    case ComponentType.TextInput:
      return new TextInputComponent(data);
    default:
      throw new Error(`Found unknown component type: ${data.type}`);
  }
}

function createComponentBuilder(data) {
  if (data instanceof ComponentBuilder) {
    return data;
  }
  switch (data.type) {
    case ComponentType.ActionRow:
      return new ActionRowBuilder(data);
    case ComponentType.Button:
      return new ButtonBuilder(data);
    case ComponentType.SelectMenu:
      return new SelectMenuBuilder(data);
    case ComponentType.TextInput:
      return new TextInputComponent(data);
    default:
      throw new Error(`Found unknown component type: ${data.type}`);
  }
}
module.exports = { createComponent, createComponentBuilder };
const ActionRow = require('../Structures/ActionRow');
const ActionRowBuilder = require('../Structures/ActionRowBuilder');
const ButtonBuilder = require('../Structures/ButtonBuilder');
const ButtonComponent = require('../Structures/ButtonComponent');
const Component = require('../Structures/Component');
const SelectMenuBuilder = require('../Structures/SelectMenuBuilder');
const SelectMenuComponent = require('../Structures/SelectMenuComponent');
const TextInputComponent = require('../Structures/TextInputComponent');