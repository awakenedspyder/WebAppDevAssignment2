"use strict";
const accounts = require("./accounts.js");

const logger = require("../utils/logger");
const companyStore = require("../models/company-store");
const uuid = require("uuid");

const company = {
  index(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const companyId = request.params.id;
    logger.debug("Company id = " + companyId);
    if (loggedInUser) {
      const viewData = {
        title: "Company",
        company: companyStore.getCompany(companyId),
        fullname: loggedInUser.firstName + " " + loggedInUser.lastName,
        picture: loggedInUser.picture
      };
      response.render("company", viewData);
    } else response.redirect("/");
  },
  deletePhone(request, response) {
    const companyId = request.params.id;
    const phoneId = request.params.phoneid;
    logger.debug(`Deleting Phone ${phoneId} from Company ${companyId}`);
    companyStore.removePhone(companyId, phoneId);
    response.redirect("/company/" + companyId);
  },
  addPhone(request, response) {
    const companyId = request.params.id;
    const company = companyStore.getUserCompanies(companyId);
    const newPhone = {
      id: uuid(),
      title: request.body.title,
      releaseYear: request.body.releaseYear,
      price: request.body.price,
      picture: request.files.picture
    };
    companyStore.addPhone(companyId, newPhone, function() {
      response.redirect("/company/" + companyId);
    });
  },
  updatePhone(request, response) {
    const companyId = request.params.id;
    const phoneId = request.params.phoneId;
    logger.debug("updating phone " + phoneId);
    const updatedPhone = {
      title: request.body.title,
      releaseYear: request.body.releaseYear,
      price: request.body.price
    };
    companyStore.editPhone(companyId, phoneId, updatedPhone);
    response.redirect("/company/" + companyId);
  }
};

module.exports = company;
