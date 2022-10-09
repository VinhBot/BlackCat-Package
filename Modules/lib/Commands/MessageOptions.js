/*-------------------------------------------------
# mã nguồn được sử dụng riêng của Nguyễn Vinh
# The source code is used exclusively by Nguyen Vinh
--------------------------------------------------*/
'use strict'; 
const { ModalBuilder: Xay_dung_Modal, EmbedBuilder: Xay_dung_embeds, ButtonBuilder: Xay_dung_Button, ActionRowBuilder: Xay_dung_ActionRow, SelectMenuBuilder: Xay_dung_SelectMenu,  } = require("../Functions/functionsMessageOptions2");
const { toSnakeCase, ButtonStyle, resolveColor, ComponentType, normalizeArray, isJSONEncodable, resolvePartialEmoji, createEnum } = require("../Functions/functionsMessageOptions");
/*-------------------------
# 
--------------------------*/
class EmbedBuilder extends Xay_dung_embeds {
  constructor(Du_lieu) {
    super(toSnakeCase(Du_lieu));
  }
  setColor(Mau_Emneds) {
    return super.setColor(Mau_Emneds && resolveColor(Mau_Emneds));
  }
  static from(Muc_khac) {
    if (isJSONEncodable(Muc_khac)) {
      return new this(Muc_khac.toJSON());
    }
    return new this(Muc_khac);
  }
}
/*-------------------------
#
--------------------------*/
class ButtonBuilder extends Xay_dung_Button {
  constructor({ emoji, ...Du_lieu } = {}) {
    super(toSnakeCase({ ...Du_lieu, emoji: emoji && typeof emoji === 'string' ? resolvePartialEmoji(emoji) : emoji }));
  }
  setEmoji(emoji) {
    if (typeof emoji === 'string') {
      return super.setEmoji(resolvePartialEmoji(emoji));
    }
    return super.setEmoji(emoji);
  }
  static from(Muc_khac) {
    if (isJSONEncodable(Muc_khac)) {
      return new this(Muc_khac.toJSON());
    }
    return new this(Muc_khac);
  }
}
/*-------------------------
#
--------------------------*/
class ActionRowBuilder extends Xay_dung_ActionRow {
  constructor({ components, ...Du_lieu } = {}) {
    super({...toSnakeCase(Du_lieu), components: components?.map(c => (c instanceof ComponentBuilder ? c : createComponentBuilder(c)))});
  }
  static from(Muc_khac) {
    if (isJSONEncodable(Muc_khac)) {
      return new this(Muc_khac.toJSON());
    }
    return new this(Muc_khac);
  }
}
/*-------------------------
#
--------------------------*/
class SelectMenuBuilder extends Xay_dung_SelectMenu {
  constructor({ options, ...Du_lieu } = {}) {
    super( toSnakeCase({ ...Du_lieu, options: options?.map(({ emoji, ...option }) => ({ ...option, emoji: emoji && typeof emoji === 'string' ? resolvePartialEmoji(emoji) : emoji }))}));
  }
  static normalizeEmoji(selectMenuOption) {
    if (isJSONEncodable(selectMenuOption)) {
      return selectMenuOption;
    }
    const { emoji, ...option } = selectMenuOption;
    return { ...option, emoji: typeof emoji === 'string' ? resolvePartialEmoji(emoji) : emoji };
  }
  addOptions(...options) {
    return super.addOptions(normalizeArray(options).map(option => SelectMenuBuilder.normalizeEmoji(option)));
  }
  setOptions(...options) {
    return super.setOptions(normalizeArray(options).map(option => SelectMenuBuilder.normalizeEmoji(option)));
  }
  static from(Muc_khac) {
    if (isJSONEncodable(Muc_khac)) {
      return new this(Muc_khac.toJSON());
    }
    return new this(Muc_khac);
  }
}
/*-------------------------
#
--------------------------*/
class ModalBuilder extends Xay_dung_Modal {
  constructor({ components, ...Du_lieu } = {}) {
    super({...toSnakeCase(Du_lieu), components: components?.map(c => (c instanceof ComponentBuilder ? c : toSnakeCase(c)))});
  }
  static from(Muc_khac) {
    if (isJSONEncodable(Muc_khac)) {
      return new this(Muc_khac.toJSON());
    }
    return new this(Muc_khac);
  }
}
/*-------------------------
# BaseMessageComponent, button, row
--------------------------*/
const MessageButtonStyles = createEnum([null, 'PRIMARY', 'SECONDARY', 'SUCCESS', 'DANGER', 'LINK', 'Primary', 'Secondary', "Success", "Danger", "Link"]);
const MessageComponentTypes = createEnum([null, 'ACTION_ROW', 'BUTTON', 'Actionrow', 'Button',]);
class BaseMessageComponent {
  constructor(data) {
    this.type = 'type' in data ? BaseMessageComponent.resolveType(data.type) : null;
  }
  static create(data, client) {
    let component;
    let type = data.type;
    if (typeof type === 'string') type = MessageComponentTypes[type];
    switch (type) {
      case MessageComponentTypes.ACTION_ROW: {
        component = data instanceof ButtonActionRow ? data : new ButtonActionRow(data, client);
        break;
      }
      case MessageComponentTypes.BUTTON: {
        component = data instanceof MessageButton ? data : new MessageButton(data);
        break;
      }
      default:
        if (client) {
          client.emit(debug, `[BaseMessageComponent] Thành phần đã nhận với loại không xác định: ${data.type}`);
        } else {
          throw new TypeError('INVALID_TYPE', 'data.type', 'valid MessageComponentType');
        }
    }
    return component;
  }
  static resolveType(type) {
    return typeof type === 'string' ? type : MessageComponentTypes[type];
  }
}
class MessageButton extends BaseMessageComponent {
  constructor(data = {}) {
    super({ type: 'BUTTON' });
    this.setup(data);
  }
  setup(data) {
    this.label = data.label ?? null;
    this.customId = data.custom_id ?? data.customId ?? null;
    this.style = data.style ? MessageButton.resolveStyle(data.style) : null;
    this.emoji = data.emoji ? MessageButton.resolvePartialEmoji(data.emoji) : null;
    this.url = data.url ?? null;
    this.disabled = data.disabled ?? false;
  }
  setCustomId(customId) {
    this.customId = MessageButton.verifyString(customId, RangeError, 'BUTTON_CUSTOM_ID');
    return this;
  }
  setDisabled(disabled = true) {
    this.disabled = disabled;
    return this;
  }
  setEmoji(emoji) {
    this.emoji = MessageButton.resolvePartialEmoji(emoji);
    return this;
  }
  setLabel(label) {
    this.label = MessageButton.verifyString(label, RangeError, 'BUTTON_LABEL');
    return this;
  }
  setStyle(style) {
    this.style = MessageButton.resolveStyle(style);
    return this;
  }
  setURL(url) {
    this.url = MessageButton.verifyString(url, RangeError, 'BUTTON_URL');
    return this;
  }
  toJSON() {
    return {
      custom_id: this.customId,
      disabled: this.disabled,
      emoji: this.emoji,
      label: this.label,
      style: MessageButtonStyles[this.style],
      type: MessageComponentTypes[this.type],
      url: this.url,
    };
  }
  static resolveStyle(style) {
    return typeof style === 'string' ? style : MessageButtonStyles[style];
  }
  static resolvePartialEmoji(emoji) {
    if (!emoji) return null;
    if (typeof emoji === 'string') return /^\d{17,19}$/.test(emoji) ? { id: emoji } : MessageButton.parseEmoji(emoji);
    const { id, name, animated } = emoji;
    if (!id && !name) return null;
    return { id, name, animated: Boolean(animated) };
  }
  static parseEmoji(text) {
    if (text.includes('%')) text = decodeURIComponent(text);
    if (!text.includes(':')) return { animated: false, name: text, id: null };
    const match = text.match(/<?(?:(a):)?(\w{2,32}):(\d{17,19})?>?/);
    return match && { animated: Boolean(match[1]), name: match[2], id: match[3] ?? null };
  }
  static verifyString( data, error = Error, errorMessage = `Mong đợi một chuỗi, thay vào đó, có ${data}.`, allowEmpty = true) {
    if (typeof data !== 'string') throw new error(errorMessage);
    if (!allowEmpty && data.length === 0) throw new error(errorMessage);
    return data;
  }
}
class ButtonActionRow extends BaseMessageComponent {
  constructor(data = {}, client = null) {
    super({ type: 'ACTION_ROW' });
    this.components = data.components?.map(c => BaseMessageComponent.create(c, client)) ?? [];
  }
  addComponents(...components) {
    this.components.push(...components.flat(Infinity).map(c => BaseMessageComponent.create(c)));
    return this;
  }
  setComponents(...components) {
    this.spliceComponents(0, this.components.length, components);
    return this;
  }
  spliceComponents(index, deleteCount, ...components) {
    this.components.splice(index, deleteCount, ...components.flat(Infinity).map(c => BaseMessageComponent.create(c)));
    return this;
  }
  toJSON() {
    return {
      components: this.components.map(c => c.toJSON()),
      type: MessageComponentTypes[this.type],
    };
  };
};
/*-------------------------
# Kết thúc
--------------------------*/
module.exports = { ButtonStyle, EmbedBuilder, ModalBuilder, ButtonBuilder, ComponentType, ButtonActionRow, ActionRowBuilder, SelectMenuBuilder, Embed: EmbedBuilder, Button: ButtonBuilder, ActionRow: ActionRowBuilder, SelectMenu: SelectMenuBuilder, MessageEmbed: EmbedBuilder, MessageButton: ButtonBuilder, MessageActionRow: ActionRowBuilder, MessageSelectMenu: SelectMenuBuilder };