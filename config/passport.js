const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const Employee = mongoose.model("employee");
const keys = require("../config/keys");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      Employee.findById(jwt_payload.id)
        .then(employee => {
          if (employee) {
            return done(null, employee);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};