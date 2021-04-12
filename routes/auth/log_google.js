const express = require('express')
const router = express.Router()
const cors = require("cors")
const bodyParser = require("body-parser")
const passport = require("passport")
const cookieSession = require('cookie-session')
require('./passport-setup')

router.use(cors())

router.use(bodyParser.urlencoded({
    extended: true
}))

router.use(bodyParser.json())

router.use(cookieSession({
    name: 'g-session',
    keys: ['key1', 'key2']
  }))

const isLogin = (req,res,next) => {
    if(req.user)
        next()
    else{
        res.sendStatus(401)
    }
} 


router.use(passport.initialize());
router.use(passport.session());

router.get('/', (req,res) => res.send("You aren't logged in"))
router.get('/good', isLogin, (req,res) => res.send(`no elo ${req.user.displayName}`))

router.get('/login',
  passport.authenticate('google', { scope: [' '] }));

router.get('/login/callback', passport.authenticate('google', { failureRedirect: '/failed' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/google/good');
  });

router.get('/logout',(req,res) =>{
    req.session=null
    req.logOut()
    res.redirect('/')
})


module.exports = router