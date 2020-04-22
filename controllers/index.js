"use strict";

// import all required modules
const logger = require("../utils/logger");
const accounts = require("./accounts.js");
const User = require("../models/user-store.js");
const companiesStore = require("../models/company-store.js");
const commentStore = require("../models/comment-store.js");

("use strict");

const index = {
  index(request, response) {
    logger.info("index rendering");

    const users = User.getAllUsers();
    let numMember = users.length;

    const companies = companiesStore.getAllCompanies();

    let numCompanies = companies.length;

    let numPhones = 0;

    for (let i in companies) {
      numPhones = numPhones + companies[i].phones.length;
    }

    const comments = commentStore.getAllComments();

    let numComments = comments.length;

    const viewData = {
      totalUsers: numMember,
      totalPhones: numPhones,
      totalCompanies: numCompanies,
      totalComments: numComments
    };

    response.render("index", viewData);
  }
};

module.exports = index;
