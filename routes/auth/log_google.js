const express = require('express')
const router = express.Router()
const cors = require("cors")
const bodyParser = require("body-parser")
const passport = require("passport")
const cookieSession = require('cookie-session')
require('./passport-setup')
const db = require("../../db")
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')

const authenticate = require('../services/authenticate')


const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

// https://www.youtube.com/watch?v=hNinO6-bDVM
// https://www.youtube.com/watch?v=gTowbsNPp9I

router.use(cors())

router.use(bodyParser.urlencoded({
  extended: true
}))

router.use(bodyParser.json())

// router.use(cookieSession({
//   name: 'g-session',
//   keys: ['key1', 'key2']
// }))

// const isLogin = (req, res, next) => {
//   if (req.user)
//     next()
//   else {
//     res.sendStatus(401)
//   }
// }


// router.use(passport.initialize());
// router.use(passport.session());

// router.use(async (req, res, next) => {
//   try {
//     const user = await db.query("SELECT * FROM users WHERE id=$1", [req.session.userId])
//     req.user = user.rows[0]
//     next()
//   } catch (error) {
//     console.log(error)
//   }
//   // const user = await db.user.findFirst({ where: { id: req.session.userId } })
// })


// router.get('/', (req, res) => res.send("You aren't logged in"))
// router.get('/good', isLogin, (req, res) => {
//   res.send(no elo ${req.user.id}, ${req.user.displayName}, ${req.user.emails[0].value})
//   // console.log(req.user)
// })



router.post("/api/v1/auth/google", async (req, res) => {
  const role = req.body.role
  const token = req.body.idToken
  console.log(token)

  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID
  });
  // const  name, email  = ticket.getPayload();
  console.log(ticket)
  const name = ticket.getPayload();

  console.log(name.name)
  console.log(name.email)


  // moje
  try {
    let user = await db.query("INSERT INTO users (name, email, role) VALUES ($1, $2, $3) ON CONFLICT (email) DO UPDATE SET name = EXCLUDED.name returning *", [name.name, name.email, role])
    
    let restaurant = await db.query("SELECT restaurant.id AS id_rest FROM restaurant INNER JOIN users on users.id = restaurant.user_id")
    console.log(restaurant.rows[0].id_rest)
    
    console.log(user.rows[0].id)
    if (user.rows[0] == null)
      console.log("No user")
    else {
      const user_id = user.rows[0].id
      // req.login(user_id)

      const accessToken = jwt.sign({ id: user_id }, process.env.TOKEN_SECRET, { expiresIn: "7d" })
      const refreshToken = jwt.sign({ id: user_id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "30d" })

      // const userToken = await db.query("UPDATE users SET refresh_token=$1 WHERE email=$2",[refreshToken,name.email])

      // IF COOKIE :)
      res.cookie('JWT', accessToken, {
        maxAge: 86400000,
        httpOnly: true
      })

      res.status(200).json({
        status: "success",
        data: {
          id: user.rows[0].id,
          name: user.rows[0].name,
          email: user.rows[0].email,
        }
      })
    }
  } catch (error) {
    console.log("Error: ", error)
  }

  //
  // const user = await db.user.upsert({
  //   where: { email: email },
  //   update: { name, picture },
  //   create: { name, email, picture }
  // })
  // req.session.userId = user.id
})


router.get("/me", async (req, res) => {
  authenticate(req, res)
  console.log(req.user)

  res.send(req.user)
})

router.delete("/api/v1/auth/logout", async (req, res) => {
  req.session = null
  res.status(200).json({
    message: "Logged out successfully"
  })
})


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