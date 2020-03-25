"use strict";

class UpdatePost {
  get validateAll() {
    return true;
  }
  get rules() {
    return {
      // validation rules
      title: "string",
      tag: "string",
      description: "string"
    };
  }
}

module.exports = UpdatePost;
