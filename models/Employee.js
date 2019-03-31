const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const EmployeeSchema = new Schema({
  Emp_FirstName: {
    type: String,
    required: true
  },
  Emp_LastName: {
    type: String,
    required: true
  },
  Emp_Role: {
    type: String,
    default: ""
  },
  Emp_SecurityAccess: {
    type: String,
    default: ""
  },
  Emp_EmploymentStatus: {
    type: String,
    default: ""
  },
  Emp_Phone: {
    type: String,
    default: ""
  },
  Emp_Address: {
    type: String,
    default: ""
  },
  Emp_LocationStatus: {
    type: String,
    default: ""
  },
  Emp_Email: {
    type: String,
    required: true
  },
  Emp_Password: {
    type: String,
    required: true
  },
  Emp_AddedDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = Employee = mongoose.model("employee", EmployeeSchema);