"use strict";
const accounts = require("./accounts.js");

// import all required modules
const logger = require("../utils/logger");
const developerStore = require("../models/developer-store");
const comStore = require("../models/comment-store");

const about = {
  index(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    logger.info("about rendering");
    if (loggedInUser) {
      const viewData = {
        title: "About the Smartphones App!",
        developers: developerStore.getAllDevelopers(),
        fullname: loggedInUser.firstName + " " + loggedInUser.lastName,
        picture: loggedInUser.picture,
        commentList: comStore.getAllComments()
      };

      logger.info("about to render", viewData.developers);
      response.render("about", viewData);
    } else response.redirect("/");
  },
  addComment(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const newComment = {
      text: request.body.text,
      date: new Date(),
      fullname: loggedInUser.firstName + " " + loggedInUser.lastName,
      picture: loggedInUser.picture
    };
    comStore.addComment(newComment);
    response.redirect("/about");
  }
};
module.exports = about;
