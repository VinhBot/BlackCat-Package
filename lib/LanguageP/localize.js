"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const I18nProvider__ = require("./I18nProvider");
const provider = new I18nProvider__.I18nProvider();
const loadFromLocale = (locale) => provider.loadFromLocale(locale);
const Language_Changer = (id, replacements) => provider.__(id, replacements);
const LanguageP = (setLang) => {
  return loadFromLocale(setLang.language);
};
exports.default = { LanguageP, Language_Changer };