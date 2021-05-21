const express = require('express')
const router = express.Router()
const cors = require("cors")
const bodyParser = require("body-parser")
const passport = require("passport")
const cookieSession = require('cookie-session')
require('./passport-setup')
const db = require("../../db")

const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)


router.use(cors())

router.use(bodyParser.urlencoded({
  extended: true
}))

router.use(bodyParser.json())

router.use(cookieSession({
  name: 'g-session',
  keys: ['key1', 'key2']
}))

// const isLogin = (req, res, next) => {
//   if (req.user)
//     next()
//   else {
//     res.sendStatus(401)
//   }
// }


router.use(passport.initialize());
router.use(passport.session());

router.use(async (req, res, next) => {
  const user = await db.query("SELECT * FROM users WHERE id=$1 returning *", [req.session.userId])
  // const user = await db.user.findFirst({ where: { id: req.session.userId } })
  req.user = user.rows[0]
  next()
})


// router.get('/', (req, res) => res.send("You aren't logged in"))
// router.get('/good', isLogin, (req, res) => {
//   res.send(`no elo ${req.user.id}, ${req.user.displayName}, ${req.user.emails[0].value}`)
//   // console.log(req.user)
// })

router.post("/chuj", async (req,res)=>{
  try {
    let result = await db.query("INSERT INTO users (name, email) VALUES ($1, $2) ON CONFLICT (email) DO UPDATE SET name = EXCLUDED.name returning *", [req.body.name, req.body.email])
    console.log(result.rows[0].name)
  } catch (error) {
      console.log(error)
  }
})

router.post("/api/v1/auth/google", async (req, res) => {
  const { token } = req.body
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID
  });
  const { name, email } = ticket.getPayload();
  // moje
  try {
    let user = await db.query("INSERT INTO users (name, email) VALUES ($1, $2) ON CONFLICT (email) DO UPDATE SET name = EXCLUDED.name returning *", [name, email, name])
    if (result.rows[0] == null)
      console.log("No user")
    else{
      req.session.userId = user.rows[0].id
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

  res.status(201)
  res.json(user)
})

router.get("/me", async (req, res) => {
  res.status(200)
  res.json(req.user)
})

router.delete("/api/v1/auth/logout", async (req, res) => {
  await req.session.destroy()
  res.status(200)
  res.json({
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