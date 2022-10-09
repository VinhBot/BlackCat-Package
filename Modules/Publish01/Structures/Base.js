'use strict';

const { flatten } = require('../Util/Util');

/**
 * Đại diện cho một mô hình dữ liệu mà Snowflake có thể nhận dạng được (tức là các mô hình dữ liệu Discord API).
 * @abstract
 */
class Base {
  constructor(client) {
    Object.defineProperty(this, 'client', { value: client });
  }
  _clone() {
    return Object.assign(Object.create(this), this);
  }
  _patch(data) {
    return data;
  }
  _update(data) {
    const clone = this._clone();
    this._patch(data);
    return clone;
  }
  toJSON(...props) {
    return flatten(this, ...props);
  }
  valueOf() {
    return this.id;
  }
}

module.exports = Base;
