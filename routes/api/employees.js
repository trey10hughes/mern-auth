const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load Company model
const Company = require("../../models/Company");



// @route POST api/employees/register
// @desc Register employee
// @access Public
router.post("/register", (req, res) => {
// Form validation
console.log(req.body);
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
    Company.findOne({ 'Employees.Emp_Email': req.body.email }).then(employee => {
        if (employee) {
            return res.status(400).json({ email: "Email already exists" });
        } 

        console.log('employee did not exist, setting up new employee');
        const newEmployee = new Employee({
          Emp_FirstName: req.body.firstname,
          Emp_LastName: req.body.lastname,
          Emp_Role: undefined,
          Emp_SecurityAccess: undefined,
          Emp_EmploymentStatus: undefined,
          Emp_Phone: undefined,
          Emp_Address: undefined,
          Emp_LocationStatus: undefined,
          Emp_Email: req.body.email,
          Emp_Password: req.body.password,
          Emp_AddedDate: undefined,
                });

            // Hash password before saving in database
            bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newEmployee.Emp_Password, salt, (err, hash) => {
                if (err) throw err;
                newEmployee.Emp_Password = hash;
                console.log(newEmployee)
                Company.update(
                  {Company_ID: 0},
                  { $push: {Employees: newEmployee}}
                )
                .then(employee => res.json(employee))
                .catch(err => console.log(err));
            });
            });    
    });
});

// @route POST api/employees/login
// @desc Login employee and return JWT token
// @access Public
router.post("/login", (req, res) => {
// Form validation
console.log ("login req body");
console.log (req.body);
  const { errors, isValid } = validateLoginInput(req.body);
  // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    Company.aggregate(
      [
        // Get just the docs that contain a shapes element where color is 'red'
        {$match: {'Employees.Emp_Email': email}},
        {$project: {
            employees: {$filter: {
                input: '$Employees',
                as: 'employee',
                cond: {$eq: ['$$employee.Emp_Email', email]}
            }}
        }}
    ], function(err, employee) {
        // Check if employee exists
          if (!employee) {
            return res.status(404).json({ emailnotfound: "Email not found" });
          }

          console.log("employee data here");
          console.log(employee[0].employees[0]);
          const employee_data = employee[0].employees[0];

          // Check password
          bcrypt.compare(password, employee_data.Emp_Password).then(isMatch => {
            
              if (isMatch) {
                  // Employee matched
                  // Create JWT Payload
                  console.log(employee_data.id);
                  console.log(employee_data.Emp_FirstName);
                  console.log(employee_data.Emp_LastName);
                  const payload = {
                      id: employee_data._id,
                      firstname: employee_data.Emp_FirstName,
                      lastname: employee_data.Emp_LastName
                  };

                  // Sign token
                  jwt.sign(
                      payload,
                      keys.secretOrKey,
                      {
                      expiresIn: 31556926 // 1 year in seconds
                      },
                      (err, token) => {
                      res.json({
                          success: true,
                          token: "Bearer " + token
                      });
                      }
                  );

              } else {
              return res
                  .status(400)
                  .json({ passwordincorrect: "Password incorrect" });
              }
        });
      })
});

  // Find employee by email
  //   Company.findOne({"Employees.Emp_Email": email}, function(err, employee) {
      
  //   })
  // });

  module.exports = router;
  
  