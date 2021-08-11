const localStrategy = require('passport-local').Strategy;
const User = require('./models/user');
const bcrypt = require('bcrypt');

function initializepassport(passport){

    function authenticateUser(email, password, done){
        User.findOne({email: req.body.email}, async function (err, user){
            if (err){
                return done(err);
            }
            if (!user){
                return done(null, false, {message: 'User does not exist'})
            }
            try {
                if (await bcrypt.compare(password, user.password)){
                    return done(null, user)
                }
            } catch (error) {
                return done(error);
            }
        })
    }

    passport.use(new localStrategy({ usernameField: 'email'}, authenticateUser(email, password)))
}

module.exports = initializepassport