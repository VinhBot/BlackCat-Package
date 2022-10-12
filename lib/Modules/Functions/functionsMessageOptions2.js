'use strict'; 
const { resolveColor, isJSONEncodable, createComponentBuilder, isValidationEnabled, ButtonStyle, ComponentType, validateRequiredButtonParameters, createEnum, normalizeArray, resolvePartialEmoji } = require("./functionsMessageOptions");
const { s } = require('@sapphire/shapeshift');
const fieldInlinePredicate = s.boolean.optional;
const fieldNamePredicate = s.string.lengthGreaterThanOrEqual(1).lengthLessThanOrEqual(256).setValidationEnabled(isValidationEnabled);
const fieldValuePredicate = s.string.lengthGreaterThanOrEqual(1).lengthLessThanOrEqual(1024).setValidationEnabled(isValidationEnabled);
const embedFieldPredicate = s.object({ name: fieldNamePredicate, value: fieldValuePredicate, inline: fieldInlinePredicate }).setValidationEnabled(isValidationEnabled);
const embedFieldsArrayPredicate = embedFieldPredicate.array.setValidationEnabled(isValidationEnabled);
const fieldLengthPredicate = s.number.lessThanOrEqual(25).setValidationEnabled(isValidationEnabled);
const authorNamePredicate = fieldNamePredicate.nullable.setValidationEnabled(isValidationEnabled);
const imageURLPredicate = s.string.url({ allowedProtocols: ["http:", "https:", "attachment:"] }).nullish.setValidationEnabled(isValidationEnabled);
const urlPredicate = s.string.url({ allowedProtocols: ["http:", "https:"] }).nullish.setValidationEnabled(isValidationEnabled);
const embedAuthorPredicate = s.object({ name: authorNamePredicate, iconURL: imageURLPredicate, url: urlPredicate }).setValidationEnabled(isValidationEnabled);
const RGBPredicate = s.number.int.greaterThanOrEqual(0).lessThanOrEqual(255).setValidationEnabled(isValidationEnabled);
const colorPredicate = s.number.int.greaterThanOrEqual(0).lessThanOrEqual(16777215).or(s.tuple([RGBPredicate, RGBPredicate, RGBPredicate])).nullable.setValidationEnabled(isValidationEnabled);
const descriptionPredicate = s.string.lengthGreaterThanOrEqual(1).lengthLessThanOrEqual(4096).nullable.setValidationEnabled(isValidationEnabled);
const footerTextPredicate = s.string.lengthGreaterThanOrEqual(1).lengthLessThanOrEqual(2048).nullable.setValidationEnabled(isValidationEnabled);
const embedFooterPredicate = s.object({ text: footerTextPredicate, iconURL: imageURLPredicate }).setValidationEnabled(isValidationEnabled);
const timestampPredicate = s.union(s.number, s.date).nullable.setValidationEnabled(isValidationEnabled);
const titlePredicate = fieldNamePredicate.nullable.setValidationEnabled(isValidationEnabled);
const customIdValidator = s.string.lengthGreaterThanOrEqual(1).lengthLessThanOrEqual(100).setValidationEnabled(isValidationEnabled);
const emojiValidator = s.object({ id: s.string, name: s.string, animated: s.boolean }).partial.strict.setValidationEnabled(isValidationEnabled);
const disabledValidator = s.boolean;
const buttonLabelValidator = s.string.lengthGreaterThanOrEqual(1).lengthLessThanOrEqual(80).setValidationEnabled(isValidationEnabled);
const buttonStyleValidator = s.nativeEnum(ButtonStyle);
const placeholderValidator = s.string.lengthLessThanOrEqual(150).setValidationEnabled(isValidationEnabled);
const minMaxValidator = s.number.int.greaterThanOrEqual(0).lessThanOrEqual(25).setValidationEnabled(isValidationEnabled);
const labelValueDescriptionValidator = s.string.lengthGreaterThanOrEqual(1).lengthLessThanOrEqual(100).setValidationEnabled(isValidationEnabled);
const jsonOptionValidator = s.object({ label: labelValueDescriptionValidator, value: labelValueDescriptionValidator, description: labelValueDescriptionValidator.optional, emoji: emojiValidator.optional, default: s.boolean.optional }).setValidationEnabled(isValidationEnabled);
const optionsLengthValidator = s.number.int.greaterThanOrEqual(0).lessThanOrEqual(25).setValidationEnabled(isValidationEnabled);
const urlValidator = s.string.url({ allowedProtocols: ["http:", "https:", "discord:"] }).setValidationEnabled(isValidationEnabled);
const defaultValidator = s.boolean;
const validateFieldLength = (amountAdding, fields) => {fieldLengthPredicate.parse((fields?.length ?? 0) + amountAdding)};
const validateRequiredSelectMenuParameters = (options, customId) => {customIdValidator.parse(customId); optionsValidator.parse(options)};
const validateRequiredSelectMenuOptionParameters = (label, value) => {labelValueDescriptionValidator.parse(label); labelValueDescriptionValidator.parse(value)};
/*---------------------------
# SelectMenuOptionBuildervs2
---------------------------*/
class SelectMenuOptionBuildervs2 {
  constructor(data = {}) {
    this.data = data;
  };
  setLabel(label) {
    this.data.label = labelValueDescriptionValidator.parse(label);
    return this;
  };
  setValue(value) {
    this.data.value = labelValueDescriptionValidator.parse(value);
    return this;
  };
  setDescription(description) {
    this.data.description = labelValueDescriptionValidator.parse(description);
    return this;
  };
  setDefault(isDefault = true) {
    this.data.default = defaultValidator.parse(isDefault);
    return this;
  };
  setEmoji(emoji) {
    this.data.emoji = emojiValidator.parse(emoji);
    return this;
  };
  toJSON() {
    validateRequiredSelectMenuOptionParameters(this.data.label, this.data.value);
    return { ...this.data };
  };
};
/*---------------------------
# ComponentBuilder
---------------------------*/
const optionValidator = s.instance(SelectMenuOptionBuildervs2).setValidationEnabled(isValidationEnabled);
const optionsValidator = optionValidator.array.lengthGreaterThanOrEqual(0).setValidationEnabled(isValidationEnabled);
class ComponentBuilder {
  constructor(Du_lieu) {
    this.data = Du_lieu;
  };
};
/*---------------------------
# TextInputBuilder
---------------------------*/
class TextInputBuilder extends ComponentBuilder {
  constructor(data) {
    super({ type: ComponentType.TextInput, ...data });
  }
  setCustomId(customId) {
    this.data.custom_id = customIdValidator.parse(customId);
    return this;
  }
  setLabel(label) {
    this.data.label = labelValidator.parse(label);
    return this;
  }
  setStyle(style) {
    this.data.style = textInputStyleValidator.parse(style);
    return this;
  }
  setMinLength(minLength) {
    this.data.min_length = minLengthValidator.parse(minLength);
    return this;
  }
  setMaxLength(maxLength) {
    this.data.max_length = maxLengthValidator.parse(maxLength);
    return this;
  }
  setPlaceholder(placeholder) {
    this.data.placeholder = placeholderValidator.parse(placeholder);
    return this;
  }
  setValue(value) {
    this.data.value = valueValidator.parse(value);
    return this;
  }
  setRequired(required = true) {
    this.data.required = requiredValidator.parse(required);
    return this;
  }
  toJSON() {
    validateRequiredParameters(this.data.custom_id, this.data.style, this.data.label);
    return { ...this.data };
  }
  equals(other) {
    if (isJSONEncodable(other)) {
      return isEqual(other.toJSON(), this.data);
    }
    return isEqual(other, this.data);
  }
}
/*---------------------------
# SelectMenuBuilder
---------------------------*/                                        
class SelectMenuBuilder extends ComponentBuilder {
  constructor(data) {
    const { options, ...initData } = data ?? {};
    super({ type: ComponentType.SelectMenu, ...initData });
    this.options = options?.map((o) => new SelectMenuOptionBuildervs2(o)) ?? [];
  }
  setPlaceholder(placeholder) {
    this.data.placeholder = placeholderValidator.parse(placeholder);
    return this;
  }
  setMinValues(minValues) {
    this.data.min_values = minMaxValidator.parse(minValues);
    return this;
  }
  setMaxValues(maxValues) {
    this.data.max_values = minMaxValidator.parse(maxValues);
    return this;
  }
  setCustomId(customId) {
    this.data.custom_id = customIdValidator.parse(customId);
    return this;
  }
  setDisabled(disabled = true) {
    this.data.disabled = disabledValidator.parse(disabled);
    return this;
  }
  addOptions(...options) {
    options = normalizeArray(options);
    optionsLengthValidator.parse(this.options.length + options.length);
    this.options.push(...options.map((option) => option instanceof SelectMenuOptionBuildervs2 ? option : new SelectMenuOptionBuildervs2(jsonOptionValidator.parse(option))));
    return this;
  }
  setOptions(...options) {
    options = normalizeArray(options);
    optionsLengthValidator.parse(options.length);
    this.options.splice(0, this.options.length, ...options.map((option) => option instanceof SelectMenuOptionBuildervs2 ? option : new SelectMenuOptionBuildervs2(jsonOptionValidator.parse(option))));
    return this;
  }
  toJSON() {
    validateRequiredSelectMenuParameters(this.options, this.data.custom_id);
    return {...this.data, options: this.options.map((o) => o.toJSON())};
  }
}
/*---------------------------
# ButtonBuilder
---------------------------*/
class ButtonBuilder extends ComponentBuilder {
  constructor(data) {
    super({ type: ComponentType.Button, ...data });
  }
  setStyle(style) {
    this.data.style = buttonStyleValidator.parse(style);
    return this;
  }
  setURL(url) {
    this.data.url = urlValidator.parse(url);
    return this;
  }
  setCustomId(customId) {
    this.data.custom_id = customIdValidator.parse(customId);
    return this;
  }
  setEmoji(emoji) {
    this.data.emoji = emojiValidator.parse(emoji);
    return this;
  }
  setDisabled(disabled = true) {
    this.data.disabled = disabledValidator.parse(disabled);
    return this;
  }
  setLabel(label) {
    this.data.label = buttonLabelValidator.parse(label);
    return this;
  }
  toJSON() {
    validateRequiredButtonParameters(this.data.style, this.data.label, this.data.emoji, this.data.custom_id, this.data.url);
    return { ...this.data };
  };
};
/*---------------------------
# ActionRowBuilder
---------------------------*/
class ActionRowBuilder extends ComponentBuilder {
  constructor({ components, ...data } = {}) {
    super({ type: ComponentType.ActionRow, ...data });
    this.components = components?.map((c) => createComponentBuilder(c)) ?? [];
  }
  addComponents(...components) {
    this.components.push(...normalizeArray(components));
    return this;
  }
  setComponents(...components) {
    this.components.splice(0, this.components.length, ...normalizeArray(components));
    return this;
  }
  toJSON() {
    return { ...this.data, components: this.components.map((component) => component.toJSON())};
  }
}
/*---------------------------
# EmbedBuilder
---------------------------*/
class EmbedBuilder {
  constructor(data = {}) {
    this.data = { ...data };
    if (data.timestamp)
      this.data.timestamp = new Date(data.timestamp).toISOString();
  }
  addFields(...fields) {
    fields = normalizeArray(fields);
    validateFieldLength(fields.length, this.data.fields);
    embedFieldsArrayPredicate.parse(fields);
    if (this.data.fields) {
      this.data.fields.push(...fields);
    } else {
      this.data.fields = fields;
    };
    return this;
  }
  spliceFields(index, deleteCount, ...fields) {
    validateFieldLength(fields.length - deleteCount, this.data.fields);
    embedFieldsArrayPredicate.parse(fields);
    if (this.data.fields) {
      this.data.fields.splice(index, deleteCount, ...fields);
    } else {
      this.data.fields = fields;
    };
    return this;
  };
  setFields(...fields) {
    this.spliceFields(0, this.data.fields?.length ?? 0, ...normalizeArray(fields));
    return this;
  };
  setAuthor(options) {
    if (options === null) {
      this.data.author = void 0;
      return this;
    };
    embedAuthorPredicate.parse(options);
    this.data.author = { name: options.name, url: options.url, icon_url: options.iconURL };
    return this;
  };
  setColor(color) {
    colorPredicate.parse(color);
    if (Array.isArray(color)) {
      const [red, green, blue] = color;
      this.data.color = (red << 16) + (green << 8) + blue;
      return this;
    };
    this.data.color = color ?? void 0;
    return this;
  };
  setDescription(description) {
    descriptionPredicate.parse(description);
    this.data.description = description ?? void 0;
    return this;
  };
  setFooter(options) {
    if (options === null) {
      this.data.footer = void 0;
      return this;
    };
    embedFooterPredicate.parse(options);
    this.data.footer = { text: options.text, icon_url: options.iconURL };
    return this;
  };
  setImage(url) {
    imageURLPredicate.parse(url);
    this.data.image = url ? { url } : void 0;
    return this;
  };
  setThumbnail(url) {
    imageURLPredicate.parse(url);
    this.data.thumbnail = url ? { url } : void 0;
    return this;
  };
  setTimestamp(timestamp = Date.now()) {
    timestampPredicate.parse(timestamp);
    this.data.timestamp = timestamp ? new Date(timestamp).toISOString() : void 0;
    return this;
  };
  setTitle(title) {
    titlePredicate.parse(title);
    this.data.title = title ?? void 0;
    return this;
  };
  setURL(url) {
    urlPredicate.parse(url);
    this.data.url = url ?? void 0;
    return this;
  };
  toJSON() {
    return { ...this.data };
  };
};
/*---------------------------
# ModalBuilder
---------------------------*/
class ModalBuilder {
  constructor({ components, ...data } = {}) {
    this.components = [];
    this.data = { ...data };
    this.components = components?.map((c) => createComponentBuilder(c)) ?? [];
  }
  setTitle(title) {
    this.data.title = titleValidator.parse(title);
    return this;
  }
  setCustomId(customId) {
    this.data.custom_id = customIdValidator.parse(customId);
    return this;
  }
  addComponents(...components) {
    this.components.push(...normalizeArray(components).map((component) => component instanceof ActionRowBuilder ? component : new ActionRowBuilder(component)));
    return this;
  }
  setComponents(...components) {
    this.components.splice(0, this.components.length, ...normalizeArray(components));
    return this;
  }
  toJSON() {
    validateRequiredParameters(this.data.custom_id, this.data.title, this.components);
    return {
      ...this.data,
      components: this.components.map((component) => component.toJSON())
    };
  }
}
module.exports = { EmbedBuilder, ButtonBuilder, ModalBuilder, SelectMenuBuilder, ActionRowBuilder, TextInputBuilder, ComponentType, resolveColor, ButtonStyle, normalizeArray,  isJSONEncodable, resolvePartialEmoji };