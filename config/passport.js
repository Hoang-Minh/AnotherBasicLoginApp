var LocalStrategy = require("passport-local").Strategy;
var db = require("../models");

module.exports = function(passport){

    passport.serializeUser(function(user, done){
        done(null, user);
    });
    
    passport.deserializeUser(function(user, done){        
        done(null, user);
    });
    
    passport.use("local-signup", new LocalStrategy({
        usernameField: 'username',
        passwordField: 'email',
        passReqToCallback: true
    }, function(req, username, email, done){
        
        console.log("passport - local sign up");        

        db.User.findOne({
            where: {
                email: email
            }
        }).then(function(user){
            if(user){
                return done(null, false);
            }
            var data = {
                username: req.body.username,
                email: req.body.email
            };

            db.User.create(data).then(function(newUser, created){
                if(!newUser){
                    return done(null, false);
                }
                return done(null, true);
            })
        })
    }))
}
