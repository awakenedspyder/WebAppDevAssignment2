"use strict";

const _ = require("lodash");
const JsonStore = require("./json-store");

const commentStore = {
  store: new JsonStore("./models/comment-store.json", { commentList: [] }),
  list: "commentList",

  getAllComments() {
    return this.store.findAll(this.list);
  },
  addComment(comment) {
    this.store.add(this.list, comment);
  }
};

// export the comments object so it can be used elsewhere
module.exports = commentStore;
