"use strict";

// import express and initialise router
const express = require("express");
const router = express.Router();

// import controllers
const start = require("./controllers/start.js");
const dashboard = require("./controllers/dashboard.js");
const about = require("./controllers/about.js");
const company = require("./controllers/company.js");
const accounts = require("./controllers/accounts.js");
const index = require("./controllers/index.js");

// connect routes to controllers
router.get("/start", start.index);
router.get("/dashboard", dashboard.index);
router.get("/about", about.index);
router.get("/company/:id", company.index);

router.get("/company/:id/deletePhone/:phoneid", company.deletePhone);
router.get("/dashboard/deletecompany/:id", dashboard.deleteCompany);
router.post("/company/:id/addphone", company.addPhone);
router.post("/dashboard/editCompany/:id", dashboard.editCompany);
router.post("/dashboard/addcompany", dashboard.addCompany);
router.post("/company/:id/updatePhone/:phoneId", company.updatePhone);

router.get("/", index.index);
router.get("/login", accounts.login);
router.get("/signup", accounts.signup);
router.get("/logout", accounts.logout);
router.post("/register", accounts.register);
router.post("/authenticate", accounts.authenticate);
router.post("/addcomment", about.addComment);

// export router module
module.exports = router;
