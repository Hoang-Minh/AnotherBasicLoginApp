var db = require("../models");

module.exports = function (app, passport) {   

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/ok',
        failureRedirect: '/signup',
        session: false
    }));
}