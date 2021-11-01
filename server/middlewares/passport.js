require('dotenv').config({path: '../.env'});
const Users = require("../models/users_db");
const SECRET = process.env.ACCESS_TOKEN_SECRET;
const { Strategy, ExtractJwt } = require("passport-jwt");

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: SECRET
};

module.exports = passport => {
    passport.use(
        new Strategy(opts, (payload, done) => {
            Users.findOne({username: payload.username}).exec()
            .then(data => {data ? done(null, data) : done(null, false)})
            .catch(err => {done(null, false)});
        })
    );
};