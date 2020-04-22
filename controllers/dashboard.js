"use strict";
const accounts = require("./accounts.js");

const logger = require("../utils/logger");
const companiestore = require("../models/company-store.js");
const uuid = require("uuid");

const dashboard = {
  index(request, response) {
    logger.info("dashboard rendering");
    const loggedInUser = accounts.getCurrentUser(request);
    if (loggedInUser) {
      const viewData = {
        title: "Smartphones App Dashboard",
        companies: companiestore.getUserCompanies(loggedInUser.id),
        fullname: loggedInUser.firstName + " " + loggedInUser.lastName,
        picture: loggedInUser.picture
      };

      logger.info("about to render", viewData.companies);
      response.render("dashboard", viewData);
    } else response.redirect("/");
  },
  deleteCompany(request, response) {
    const companyId = request.params.id;
    logger.debug(`Deleting Company ${companyId}`);
    companiestore.removeCompany(companyId);
    response.redirect("/dashboard");
  },
  addCompany(request, response) {
    const date = new Date();
    const loggedInUser = accounts.getCurrentUser(request);
    const newCompany = {
      id: uuid(),
      userid: loggedInUser.id,
      title: request.body.title,
      picture: request.files.picture,
      date: date,
      phones: []
    };
    logger.debug("Creating a new Company" + newCompany);
    companiestore.addCompany(newCompany, function() {
      response.redirect("/dashboard");
    });
  },
  editCompany(request, response) {
    const companyId = request.params.id;
    const updatedCompany = {
      title: request.body.title
    };
    logger.debug("Updating Company" + updatedCompany);
    companiestore.editCompany(companyId, updatedCompany);
    response.redirect("/dashboard");
  }
};

// export the dashboard module
module.exports = dashboard;
