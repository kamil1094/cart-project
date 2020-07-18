import passport from "passport";
import passportJwt from "passport-jwt";

import { User } from "../models/user";

import config from "../config"

const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;


passport.use(new JwtStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.JWT_SECRET
  }, function (jwtPayload, done) {
    User.findOne({ email: jwtPayload.email }, async function (err, user) {
      if (err) return done(err, false);

      if (user) return done(undefined, user , jwtPayload);

      return done(undefined, false);
    });
  }));