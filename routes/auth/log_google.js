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

router.get('/', (req, res) => res.send("You aren't logged in"))
router.get('/good', isLogin, (req, res) => {
  res.send(`no elo ${req.user.id}, ${req.user.displayName}, ${req.user.emails[0].value}`)
  // console.log(req.user)
})

router.get('/login',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  }));

// router.get('/login',
//   passport.authenticate('google', {
//     scope: ['profile', 'email']
//   }));

// router.get('/login/callback', passport.authenticate('google', {
//     failureRedirect: '/failed'
//   }),
//   async function (req, res) {
//     // Successful authentication, redirect home.
//     try {
//       let result = await db.query("SELECT * FROM users WHERE google_id=$1", [req.user.id])
//       if (result.rows[0] == null) {
//         result = await db.query("INSERT INTO users (google_id, name, email) VALUES ($1, $2, $3) returning *", [req.user.id, req.user.displayName, req.user.emails[0].value])
//         console.log(result.rows)
//         res.status(200).json({
//           status: "success",
//           data: {
//             users: result.rows[0],
//           }
//         })
//       } else {
//         console.log("User exist")
//         res.status(200).json({
//           status: "warning",
//           message: "User exist",
//           data: {
//             users: result.rows[0],
//           }
//         })
//       }
//     } catch (err) {
//       console.log(err)
//     }
//   });

// router.get('/logout', (req, res) => {
//   req.session = null
//   req.logOut()
//   res.redirect('/')
// })




module.exports = router