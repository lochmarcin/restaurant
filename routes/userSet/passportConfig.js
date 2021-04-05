const userModel = require('../../schema/userModel')
const bcrypt = require('bcryptjs')
const passport = require("passport")
const localStrategy = require('passport-local').Strategy

module.exports = function(passport){
    passport.use(
        new localStrategy((username, password, done) =>{
            userModel.findOne({username: username}, (err,user)=>{
                if (err) throw err;
                if (!user) return done(null, false)
                bcrypt.compare(password, user.password, (err, result)=>{
                    if(err) throw err
                    if (result === true)
                        return done(null, user)
                    else
                        return done(null, false)
                })
            })
        })
    )
}

passport.serializeUser((user,cd)=>{
    cd(null,user.id)
})

passport.deserializeUser((id,cd)=>{
    userModel.findOne({_id:id}, (err,user)=>{
        cd(err, user)
    })
})