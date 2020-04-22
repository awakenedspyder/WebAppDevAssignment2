"use strict";

const cloudinary = require("cloudinary");
const logger = require("../utils/logger");

try {
  const env = require("../.data/.env.json");
  cloudinary.config(env.cloudinary);
} catch (e) {
  logger.info("You must provide a Cloudinary credentials file - see README.md");
  process.exit(1);
}

const _ = require("lodash");
const JsonStore = require("./json-store");

const companyStore = {
  store: new JsonStore("./models/company-store.json", {
    companyList: []
  }),
  list: "companyList",

  getAllCompanies() {
    return this.store.findAll(this.list);
  },

  getCompany(id) {
    return this.store.findOneBy(this.list, { id: id });
  },

  addCompany(company, response) {
    company.picture.mv("tempimage", err => {
      if (!err) {
        cloudinary.uploader.upload("tempimage", result => {
          console.log(result);
          company.picture = result.url;
          response();
        });
      }
    });
    this.store.add(this.list, company);
  },
  editCompany(id, updatedCompany) {
    const company = this.getCompany(id);
    company.title = updatedCompany.title;
  },
  removeCompany(id) {
    const company = this.getCompany(id);
    this.store.remove(this.list, company);
  },

  removeAllCompanies() {
    this.store.removeAll(this.list);
  },
  addPhone(id, phone, response) {
    phone.picture.mv("tempimage", err => {
      if (!err) {
        cloudinary.uploader.upload("tempimage", result => {
          console.log(result);
          phone.picture = result.url;
          response();
        });
      }
    });
    const company = this.getCompany(id);
    company.phones.push(phone);
  },
  removePhone(id, phoneId) {
    const company = this.getCompany(id);
    const phones = company.phones;
    _.remove(phones, { id: phoneId });
  },
  editPhone(id, phoneId, updatedPhone) {
    const company = this.getCompany(id);
    const phones = company.phones;
    const index = phones.findIndex(phone => phone.id === phoneId);
    phones[index].title = updatedPhone.title;
    phones[index].releaseYear = updatedPhone.releaseYear;
    phones[index].price = updatedPhone.price;
  },
  getUserCompanies(userid) {
    return this.store.findBy(this.list, { userid: userid });
  }
};

module.exports = companyStore;
