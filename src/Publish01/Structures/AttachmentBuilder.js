'use strict';
const { basename, flatten } = require('../Util/Util');
class AttachmentBuilder {
  constructor(attachment, data = {}) {
    this.attachment = attachment;
    this.name = data.name;
    this.description = data.description;
  }
  setDescription(description) {
    this.description = description;
    return this;
  }
  setFile(attachment) {
    this.attachment = attachment;
    return this;
  }
  setName(name) {
    this.name = name;
    return this;
  }
  setSpoiler(spoiler = true) {
    if (spoiler === this.spoiler) return this;
    if (!spoiler) {
      while (this.spoiler) {
        this.name = this.name.slice('SPOILER_'.length);
      }
      return this;
    }
    this.name = `SPOILER_${this.name}`;
    return this;
  }
  get spoiler() {
    return basename(this.name).startsWith('SPOILER_');
  }
  toJSON() {
    return flatten(this);
  }
  static from(other) {
    return new AttachmentBuilder(other.attachment, {
      name: other.name,
      description: other.description,
    });
  }
}

module.exports = AttachmentBuilder;