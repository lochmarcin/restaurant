const express = require('express')
const router = express.Router()
const cors = require("cors")
const bodyParser = require("body-parser")
const passport = require("passport")
const cookieSession = require('cookie-session')
require('./passport-setup')
const db = require("../../db")


router.use(cors())

router.use(bodyParser.urlencoded({
  extended: true
}))

router.use(bodyParser.json())

router.use(cookieSession({
  name: 'g-session',
  keys: ['key1', 'key2']
}))

const isLogin = (req, res, next) => {
  if (req.user)
    next()
  else {
    res.sendStatus(401)
  }
}


router.use(passport.initialize());
router.use(passport.session());

router.get('/', (req, res) => {
  res.send("You aren't logged in")
})
router.get('/good', isLogin, (req, res) => {
  res.send(`no elo ${req.user.displayName}`)
  console.log(`no elo ${req.user.id}, ${req.user.displayName}, ${req.user.email}`)
  // console.log(req)
})

router.get('/login',
  passport.authenticate('facebook', {
    scope: ['public_profile', 'email']
  }));

router.get('/login/secrets',
  passport.authenticate('facebook', {
    failureRedirect: '/login'
  }),
  async function (req, res) {
    // Successful authentication, redirect home.
    try {
      let result = await db.query("SELECT * FROM users WHERE fb_id=$1", [req.user.id])
      if (result.rows[0]==null) {
        result = await db.query("INSERT INTO users (name, email, fb_id) VALUES ($1, $2, $3) returning *", [req.user.displayName, req.user.email, req.user.id])
        console.log(result.rows)
        res.write.status(200).json({
          status: "success",
          data: {
            users: result.rows[0],
          }
        })
        res.write.redirect("/fb/good")
        res.end()
      } else {
        console.log("User exist")
        res.write().status(200).json({
          status: "warning",
          message: "User exist"
        })
        res.write().redirect("/fb/good")
        res.end()
      }
    } catch (err) {
      console.log(err)
    }
  });


router.get('/logout', (req, res) => {
  req.session = null
  req.logOut()
  res.redirect('/')
})


async function add_user_db(id, name, email) {
  try {
    const result = await db.query("INSERT INTO users (id, name, email) VALUES ($1, $2, $3)", [id, name, email])
    console.log(result.rows)
    res.status(200).json({
      status: "success",
      results: result.rows.length,
      data: {
        users: result.rows,
      }
    })
  } catch (err) {
    console.log(err)
  }
}



module.exports = router