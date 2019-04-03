const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const employees = require("./routes/api/employees");

const Company = require("./models/Company");

const app = express();

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));



// Check if a company already exists in db
Company.countDocuments({Company_ID: 0}, function (err, count){ 
  if(count>0){
      //document exists });
  } else {
    // Create default company if none existed already
    Company.create({Company_ID: undefined, Company_Name: undefined, Company_Description: undefined, Company_Notes: undefined, Company_AuthorizedViewers: undefined}, function(err, doc) {
      // At this point the company collection is created.
    });
  }
}); 

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api/employees", employees);

const port = process.env.PORT || 5000; // process.env.port is Heroku's port if you choose to deploy the app there

app.listen(port, () => console.log(`Server up and running on port ${port} !`));
