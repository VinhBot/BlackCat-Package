/*----------------------------
# MessageOptions
----------------------------*/
'use strict'; 
const Colors = { DEFAULT: 0x000000, WHITE: 0xffffff, AQUA: 0x1abc9c,
GREEN: 0x57f287, BLUE: 0x3498db, YELLOW: 0xfee75c, PURPLE: 0x9b59b6,
FUCHSIA: 0xeb459e, GOLD: 0xf1c40f, ORANGE: 0xe67e22, RED: 0xed4245,
GREY: 0x95a5a6, NAVY: 0x34495e, DARK_AQUA: 0x11806a, DARK_GREEN: 0x1f8b4c,
DARK_BLUE: 0x206694, DARK_PURPLE: 0x71368a, DARK_VIVID_PINK: 0xad1457, DARK_GOLD: 0xc27c0e,
DARK_ORANGE: 0xa84300, DARK_RED: 0x992d22, DARK_GREY: 0x979c9f, DARKER_GREY: 0x7f8c8d, LIGHT_GREY: 0xbcc0c0,
DARK_NAVY: 0x2c3e50, BLURPLE: 0x5865f2, GREYPLE: 0x99aab5, NOT_QUITE_BLACK: 0x23272a, DARK_BUT_NOT_BLACK: 0x2c2f33, LUMINOUS_VIVID_PINK: 0xe91e63};
let validate = true; var ComponentType; var ButtonStyle;
const isValidationEnabled = () => validate;
const enableValidators = () => validate = true;
const disableValidators = () => validate = false;
(function (ComponentType) {
    ComponentType[ComponentType["ActionRow"] = 1] = "ActionRow";
    ComponentType[ComponentType["Button"] = 2] = "Button";
    ComponentType[ComponentType["SelectMenu"] = 3] = "SelectMenu";
    ComponentType[ComponentType["TextInput"] = 4] = "TextInput";
    
    ComponentType[ComponentType["ACTIONROW"] = 1] = "ACTIONROW";
    ComponentType[ComponentType["BUTTON"] = 2] = "BUTTON";
    ComponentType[ComponentType["SELECTMENU"] = 3] = "SELECTMENU";
    ComponentType[ComponentType["TEXTINPUT"] = 4] = "TEXTINPUT";

    ComponentType[ComponentType["actionrow"] = 1] = "actionrow";
    ComponentType[ComponentType["button"] = 2] = "button";
    ComponentType[ComponentType["selectmenu"] = 3] = "selectmenu";
    ComponentType[ComponentType["textinput"] = 4] = "textinput";
})(ComponentType = exports.ComponentType || (exports.ComponentType = {}));
(function (ButtonStyle) {
    ButtonStyle[ButtonStyle["Primary"] = 1] = "Primary";
    ButtonStyle[ButtonStyle["Secondary"] = 2] = "Secondary";
    ButtonStyle[ButtonStyle["Success"] = 3] = "Success";
    ButtonStyle[ButtonStyle["Danger"] = 4] = "Danger";
    ButtonStyle[ButtonStyle["Link"] = 5] = "Link";
  
    ButtonStyle[ButtonStyle["PRIMARY"] = 1] = "PRIMARY";
    ButtonStyle[ButtonStyle["SECONDARY"] = 2] = "SECONDARY";
    ButtonStyle[ButtonStyle["SUCCESS"] = 3] = "SUCCESS";
    ButtonStyle[ButtonStyle["DANGER"] = 4] = "DANGER";
    ButtonStyle[ButtonStyle["LINK"] = 5] = "LINK";

    ButtonStyle[ButtonStyle["primary"] = 1] = "primary";
    ButtonStyle[ButtonStyle["secondary"] = 2] = "secondary";
    ButtonStyle[ButtonStyle["success"] = 3] = "success";
    ButtonStyle[ButtonStyle["danger"] = 4] = "danger";
    ButtonStyle[ButtonStyle["link"] = 5] = "link";
    // Phân theo màu
    ButtonStyle[ButtonStyle["Blue"] = 1] = "Blue";
    ButtonStyle[ButtonStyle["Grey"] = 2] = "Grey";
    ButtonStyle[ButtonStyle["Green"] = 3] = "Green";
    ButtonStyle[ButtonStyle["Red"] = 4] = "Red";
})(ButtonStyle = exports.ButtonStyle || (exports.ButtonStyle = {}));
const toSnakeCase = function(obj) {
  if (typeof obj !== 'object' || !obj) return obj;
  if (Array.isArray(obj)) return obj.map(toSnakeCase);
  return Object.fromEntries(Object.entries(obj).map(([key, value]) => [snakeCase(key), toSnakeCase(value)]));
};
const createEnum = async function(keys) {
  const obj = {};
  for (const [index, key] of keys.entries()) {
    if (key === null) continue;
    obj[key] = index;
    obj[index] = key;
  }
  return obj;
};
const createComponentBuilder = function(data) {
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
      return new TextInputBuilder(data);
    default:
      throw new Error(`Không thể tuần tự hóa đúng loại thành phần: ${data.type}`);
  };
};
const normalizeArray = function(arr) {
  if (Array.isArray(arr[0]))
    return arr[0];
  return arr;
};
const equal = function(a, b) {
  if (a === b) return true;
  if (a && b && typeof a == 'object' && typeof b == 'object') {
    if (a.constructor !== b.constructor) return false;
    var length, i, keys;
    if (Array.isArray(a)) {
      length = a.length;
      if (length != b.length) return false;
      for (i = length; i-- !== 0;)
        if (!equal(a[i], b[i])) return false;
      return true;
    }
    if (a.constructor === RegExp) return a.source === b.source && a.flags === b.flags;
    if (a.valueOf !== Object.prototype.valueOf) return a.valueOf() === b.valueOf();
    if (a.toString !== Object.prototype.toString) return a.toString() === b.toString();
    keys = Object.keys(a);
    length = keys.length;
    if (length !== Object.keys(b).length) return false;
    for (i = length; i-- !== 0;)
      if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;
    for (i = length; i-- !== 0;) {
      var key = keys[i];
      if (!equal(a[key], b[key])) return false;
    };
    return true;
  };
  return a!==a && b!==b;
};
function resolvePartialEmoji(emoji) {
  if (!emoji) return null;
  if (typeof emoji === 'string') return /^\d{17,19}$/.test(emoji) ? { id: emoji } : parseEmoji(emoji);
  const { id, name, animated } = emoji;
  if (!id && !name) return null;
  return { id, name, animated: Boolean(animated) };
};
function parseEmoji(text) {
  if (text.includes('%')) text = decodeURIComponent(text);
  if (!text.includes(':')) return { animated: false, name: text, id: undefined };
  const match = text.match(/<?(?:(a):)?(\w{2,32}):(\d{17,19})?>?/);
  return match && { animated: Boolean(match[1]), name: match[2], id: match[3] };
};

const validateRequiredButtonParameters = function(style, label, emoji, customId, url) {
  if (url && customId) {
    throw new RangeError("URL và id tùy chỉnh không được lẫn nhau");
  };
  if (!label && !emoji) {
    throw new RangeError("Các nút phải có nhãn và hoặc biểu tượng cảm xúc");
  };
  if (style === ButtonStyle.Link) {
    if (!url) {
      throw new RangeError("Các nút liên kết phải có url");
    };
  } else if (url) {
    throw new RangeError("Các nút không liên kết không được có url");
  };
};
const resolveColor = function(color) {
  if (typeof color === 'string') {
    if (color === 'Random') return Math.floor(Math.random() * (0xffffff + 1));
    if (color === 'Default') return 0;
    color = Colors[color] ?? parseInt(color.replace('#', ''), 16);
  } else if (Array.isArray(color)) {
    color = (color[0] << 16) + (color[1] << 8) + color[2];
  };
  if (color < 0 || color > 0xffffff) throw new RangeError("ColorRange");
  else if (Number.isNaN(color)) throw new TypeError("ColorConvert");
  return color;
};
const isJSONEncodable = function(maybeEncodable) {
  return maybeEncodable !== null && typeof maybeEncodable === "object" && "toJSON" in maybeEncodable;
};
/*----------------------------
# Hỗ trợ MessageOptions
----------------------------*/
var INFINITY = 1 / 0;
var symbolTag = '[object Symbol]';
var reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;
var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;
var rsAstralRange = '\\ud800-\\udfff', rsComboMarksRange = '\\u0300-\\u036f\\ufe20-\\ufe23', rsComboSymbolsRange = '\\u20d0-\\u20f0', rsDingbatRange = '\\u2700-\\u27bf', rsLowerRange = 'a-z\\xdf-\\xf6\\xf8-\\xff', rsMathOpRange = '\\xac\\xb1\\xd7\\xf7', rsNonCharRange = '\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf', rsPunctuationRange = '\\u2000-\\u206f', rsSpaceRange = ' \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000', rsUpperRange = 'A-Z\\xc0-\\xd6\\xd8-\\xde', rsVarRange = '\\ufe0e\\ufe0f', rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;
var rsApos = "['\u2019]", rsBreak = '[' + rsBreakRange + ']', rsCombo = '[' + rsComboMarksRange + rsComboSymbolsRange + ']', rsDigits = '\\d+', rsDingbat = '[' + rsDingbatRange + ']', rsLower = '[' + rsLowerRange + ']', rsMisc = '[^' + rsAstralRange + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + ']', rsFitz = '\\ud83c[\\udffb-\\udfff]', rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')', rsNonAstral = '[^' + rsAstralRange + ']', rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}', rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]', rsUpper = '[' + rsUpperRange + ']', rsZWJ = '\\u200d';
var rsLowerMisc = '(?:' + rsLower + '|' + rsMisc + ')', rsUpperMisc = '(?:' + rsUpper + '|' + rsMisc + ')', rsOptLowerContr = '(?:' + rsApos + '(?:d|ll|m|re|s|t|ve))?', rsOptUpperContr = '(?:' + rsApos + '(?:D|LL|M|RE|S|T|VE))?', reOptMod = rsModifier + '?', rsOptVar = '[' + rsVarRange + ']?', rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*', rsSeq = rsOptVar + reOptMod + rsOptJoin, rsEmoji = '(?:' + [rsDingbat, rsRegional, rsSurrPair].join('|') + ')' + rsSeq;
var reApos = RegExp(rsApos, 'g');
var reComboMark = RegExp(rsCombo, 'g');
var reUnicodeWord = RegExp([ rsUpper + '?' + rsLower + '+' + rsOptLowerContr + '(?=' + [rsBreak, rsUpper, '$'].join('|') + ')', rsUpperMisc + '+' + rsOptUpperContr + '(?=' + [rsBreak, rsUpper + rsLowerMisc, '$'].join('|') + ')', rsUpper + '?' + rsLowerMisc + '+' + rsOptLowerContr, rsUpper + '+' + rsOptUpperContr, rsDigits, rsEmoji ].join('|'), 'g');
var reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2,}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;
var root = freeGlobal || freeSelf || Function('return this')();
var objectProto = Object.prototype;
var objectToString = objectProto.toString;
var Symbol = root.Symbol;
var symbolProto = Symbol ? Symbol.prototype : undefined, symbolToString = symbolProto ? symbolProto.toString : undefined;
var deburredLetters = {};
var arrayReduce = function(array, iteratee, accumulator, initAccum) {
  var index = -1, length = array ? array.length : 0;
  if (initAccum && length) {
    accumulator = array[++index];
  }
  while (++index < length) {
    accumulator = iteratee(accumulator, array[index], index, array);
  }
  return accumulator;
};
var asciiWords = function(string) {
  return string.match(reAsciiWord) || [];
};
var basePropertyOf = function(object) {
  return function(key) {
    return object == null ? undefined : object[key];
  };
};
var deburrLetter = basePropertyOf(deburredLetters);
function hasUnicodeWord(string) {
  return reHasUnicodeWord.test(string);
};
function unicodeWords(string) {
  return string.match(reUnicodeWord) || [];
};
function baseToString(value) {
  if (typeof value == 'string') {
    return value;
  };
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  };
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
};
function createCompounder(callback) {
  return function(string) {
    return arrayReduce(words(deburr(string).replace(reApos, '')), callback, '');
  };
};
function isObjectLike(value) {
  return !!value && typeof value == 'object';
};
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
};
function toString(value) {
  return value == null ? '' : baseToString(value);
};
function deburr(string) {
  string = toString(string);
  return string && string.replace(reLatin, deburrLetter).replace(reComboMark, '');
};
function words(string, pattern, guard) {
  string = toString(string);
  pattern = guard ? undefined : pattern;
  if (pattern === undefined) {
    return hasUnicodeWord(string) ? unicodeWords(string) : asciiWords(string);
  };
  return string.match(pattern) || [];
};
var snakeCase = createCompounder(function(result, word, index) {
  return result + (index ? '_' : '') + word.toLowerCase();
});
module.exports = {
  disableValidators, enableValidators, isValidationEnabled, createEnum, equal, resolvePartialEmoji,
  ButtonStyle, ComponentType, resolveColor, normalizeArray, toSnakeCase, parseEmoji, snakeCase,
  createComponentBuilder, validateRequiredButtonParameters, isJSONEncodable, 
};