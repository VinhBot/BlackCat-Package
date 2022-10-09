'use strict';
const ErrorCodes = require('./ErrorCodes');
const Messages = require('./Messages');
function makeDiscordjsError(Base) {
  return class DiscordjsError extends Base {
    constructor(code, ...args) {
      super(message(code, args));
      this.code = code;
      Error.captureStackTrace?.(this, DiscordjsError);
    }
    get name() {
      return `${super.name} [${this.code}]`;
    }
  };
}

function message(code, args) {
  if (!(code in ErrorCodes)) throw new Error('Mã lỗi phải là DiscordjsErrorCodes hợp lệ');
  const msg = Messages[code];
  if (!msg) throw new Error(`Không có thông báo nào liên quan đến mã lỗi: ${code}.`);
  if (typeof msg === 'function') return msg(...args);
  if (!args?.length) return msg;
  args.unshift(msg);
  return String(...args);
}

module.exports = {
  Error: makeDiscordjsError(Error),
  TypeError: makeDiscordjsError(TypeError),
  RangeError: makeDiscordjsError(RangeError),
};
