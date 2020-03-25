"use strict";

class StorePost {
  get validateAll() {
    return true;
  }
  get rules() {
    return {
      // validation rules
      title: "required|string",
      tag: "required|string",
      description: "required|string"
    };
  }
}

module.exports = StorePost;
