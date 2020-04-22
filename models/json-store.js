"use strict";

const low = require("lowdb");
const fileAsync = require("lowdb/lib/file-async");

class JsonStore {
  constructor(file, defaults) {
    this.db = low(file, { storage: fileAsync });
    this.db.defaults(defaults).value();
  }

  add(list, obj) {
    this.db
      .get(list)
      .push(obj)
      .last()
      .value();
  }

  remove(list, obj) {
    this.db
      .get(list)
      .remove(obj)
      .value();
  }

  removeAll(list) {
    this.db
      .get(list)
      .remove()
      .value();
  }

  findAll(list) {
    return this.db.get(list).value();
  }

  findOneBy(list, filter) {
    const results = this.db
      .get(list)
      .filter(filter)
      .value();
    return results[0];
  }

  findByIds(list, ids) {
    return this.db
      .get(list)
      .keyBy("id")
      .at(ids)
      .value();
  }

  findBy(list, filter) {
    return this.db
      .get(list)
      .filter(filter)
      .value();
  }
}

module.exports = JsonStore;
