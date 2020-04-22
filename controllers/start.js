"use strict";
const accounts = require("./accounts.js");

// import all required modules
const logger = require("../utils/logger");
const companyStore = require("../models/company-store.js");
const userStore = require("../models/user-store.js");

// create start object
const start = {
  // index method - responsible for creating and rendering the view
  index(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    logger.info("start rendering");

    if (loggedInUser) {
      const companies = companyStore.getUserCompanies(loggedInUser.id);
      const samples = companyStore.getUserCompanies("");

      let numCompanies = companies.length;

      let numPhones = 0;
      let avPhones = 0;
      let minPhones = 0;
      let maxPhones = 0;
      if (numCompanies > 0) {
        for (let i in companies) {
          numPhones = numPhones + companies[i].phones.length;
        }

        avPhones = Math.round(numPhones / numCompanies);
        //number of Users

        minPhones = companies[0].phones.length;
        maxPhones = companies[0].phones.length;

        for (let i in companies) {
          if (companies[i].phones.length < minPhones) {
            minPhones = companies[i].phones.length;
          }
          for (let i in companies) {
            if (companies[i].phones.length > maxPhones) {
              maxPhones = companies[i].phones.length;
            }
          }
        }
      } else {
        numCompanies = 0;
        numPhones = 0;
        avPhones = 0;
        minPhones = 0;
        maxPhones = 0;
      }
      const users = userStore.getAllUsers();

      let numUsers = users.length;

      // display confirmation message in log
      logger.info("start rendering");

      // create view data object (contains data to be sent to the view e.g. page title)
      const viewData = {
        title: "Welcome to the Smartphones App!",
        totalCompanies: numCompanies,
        totalPhones: numPhones,
        totalUsers: numUsers,
        averagePhones: avPhones,
        minPhones: minPhones,
        maxPhones: maxPhones,
        fullname: loggedInUser.firstName + " " + loggedInUser.lastName,
        picture: loggedInUser.picture
      };

      // render the start view and pass through the data
      response.render("start", viewData);
    } else response.redirect("/");
  }
};

// export the start module
module.exports = start;
