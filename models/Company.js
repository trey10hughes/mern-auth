const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Load Employee model
const Employee = require("Employee");
console.log(Employee)

// Create Schema
const CompanySchema = new Schema({
    Company_ID: {
    type: Int32Array,
    required: true
  },
  Company_Name: {
    type: String,
    required: true
  },
  Company_Description: {
    type: String,
    required: true
  },
  Company_Notes: {
    type: Date,
    default: Date.now
  },
  Employees: [Employee]
});

module.exports = Company = mongoose.model("company", CompanySchema);