'use strict';
const { snakeCase } = require('../../lib/Functions/functionsMessageOptions');
const toSnakeCase = function(obj) {
  if (typeof obj !== 'object' || !obj) return obj;
  if (obj instanceof Date) return obj;
  if (Array.isArray(obj)) return obj.map(toSnakeCase);
  return Object.fromEntries(Object.entries(obj).map(([key, value]) => [snakeCase(key), toSnakeCase(value)]));
};
module.exports = { toSnakeCase };