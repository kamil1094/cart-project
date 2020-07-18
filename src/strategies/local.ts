import passport from "passport";
import passportLocal from "passport-local";
import { User } from "../models/user";

const LocalStrategy = passportLocal.Strategy;

export default passport.use(new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
  try {

    const user = await User.findOne({ email });

    if (!user) return done(undefined, false, { message: `User ${email} does not exist.` });

    if (await user.auth(password, email)) return done(null, user);

    return done (null, false, { message: "Invalid username or password." });
  } catch (err) {
    return done(err)
  }
}));