"use strict";

const _ = require("lodash");
const JsonStore = require("./json-store");

const developerStore = {
  store: new JsonStore("./models/developer.json", { developers: [] }),
  list: "developers",

  getAllDevelopers() {
    return this.store.findAll(this.list);
  },
  getDeveloper(id) {
    return this.store.findOneBy(this.list, { id: id });
  }
};

// export the developers object so it can be used elsewhere
module.exports = developerStore;
