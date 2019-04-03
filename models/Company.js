const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Load Employee model
const Employee = require("./Employee");
// console.log(Employee)

// Create Schema
const CompanySchema = new Schema({
    Company_ID: {
    type: Number,
    default: 0
  },
  Company_Name: {
    type: String,
    default: "Enterprise Medical Intelligence"
  },
  Company_Description: {
    type: String,
    default: "clinical data to medical insights"
  },
  Company_Notes: {
    type: Date,
    default: Date.now
  },
  Company_AuthorizedViewers: {
    type: Array,
    default: ["CIO","CEO","CTO"]
  },
  Employees: [Employee.schema]
});

module.exports = Company = mongoose.model("company", CompanySchema);