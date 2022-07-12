const userModel = require("../models/userModel");
const { Strategy, ExtractJwt } = require("passport-jwt");
const passport = require("passport");

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
};

module.exports = (passport) => {
    passport.use(
        new Strategy(opts, async (payload, done) => {
            await userModel.findById(payload.user_id)
                .then((user) => {
                    if (user) {
                        return done(null, user);
                    }
                    return done(null, false);
                }).catch((err) => {
                    return done(null, false);
                });
        })
    );
};