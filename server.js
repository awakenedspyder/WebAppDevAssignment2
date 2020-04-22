// use javascript in strict mode
"use strict";

// import all required modules
const express = require("express");
const logger = require("./utils/logger");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");

// initialise project
const app = express();

// static files output to public folder
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(fileUpload());

// use handlebars as view engine
app.engine(
  ".hbs",
  exphbs({
    extname: ".hbs",
    defaultLayout: "main"
  })
);
app.set("view engine", ".hbs");

// import routes file and use this for routing
const routes = require("./routes");
app.use("/", routes);

// listen for requests :)
const listener = app.listen(process.env.PORT || 4000, function() {
  logger.info(
    `glitch-SmartphoneApp started on port ${listener.address().port}`
  );
});

// use handlebars as view engine
app.engine(
  ".hbs",
  exphbs({
    extname: ".hbs",
    defaultLayout: "main",
    helpers: {
      uppercase: function(word) {
        return word.toUpperCase();
      },
      formatDate: function(date) {
        let d = new Date(date);
        let dayNum = d.getDay();
        let dateNum = d.getDate();
        let month = d.getMonth();
        let year = d.getFullYear();

        let months = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec"
        ];
        let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

        let monthname = months[month];
        let dayname = days[dayNum];

        return dayname + " " + monthname + " " + dateNum + ", " + year;
      },
      capitalise: function(word) {
        let capitalisedWord = word[0].toUpperCase() + word.slice(1);
        return capitalisedWord;
      },
      //To ensure year entered shows only 4 digits
      year: function(year) {
        let finalyear = year.slice(0, 4);
        return finalyear;
      },
      //To get rid of the extra spaces (if any) in the names of the collections/phones
      //Since i was using two helpers at a time, my format was: {{helper1 (helper2 item)}} and it works!
      trimName: function(name) {
        let final = name.trim();
        return final;
      }
    }
  })
);
app.set("view engine", ".hbs");
