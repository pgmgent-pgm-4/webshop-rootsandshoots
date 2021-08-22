import passportLocal from 'passport-local'
import { Sequelize } from "sequelize"
import bcrypt from "bcrypt"

const LocalStrategy = passportLocal.Strategy;

import User from "../models/Users.js"

const auth = (passport) => {
    passport.use(
        new LocalStrategy({ usernameField: 'username'}, (username, password, done) => {
            User.findOne({ where: { username: username }})
            .then(user => {
                console.log(username);
                if(!user) {
                    console.log('not registered')
                    return done(null, false, { message: 'This username is not registered'});
                }
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    console.log(password, user.password);
                    if(err) throw err;
                    if(isMatch) {
                        console.log('is match')
                        return done(null, user)
                    } else {
                        console.log('password incorr')
                        return done(null, false, { message: 'password incorrect'});
                    }
                })
            })
            .catch(err => console.log(err));
        })
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
      });
      
    passport.deserializeUser((user, done) => {
        return done(null, user);
    });
}

export default auth