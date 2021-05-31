const express = require('express')
const app = require('../app')
const router = express.Router()
const bodyParser = require("body-parser")
const { use } = require("passport")


const login = require('./userSet/login')
const restaurant = require('./endpoints/restaurant')
const userEdit = require("./userSet/userEdit")
const google = require("./auth/log_google")
const facebook = require("./auth/log_fb")
const table = require("./endpoints/table")
const { routes } = require('../app')
const { Pool } = require("pg");

// Authentication requires
const session = require('express-session')
const passport = require('passport')
const pgSession = require('connect-pg-simple')(session)


router.use(bodyParser.json())
router.use(bodyParser.urlencoded({
    extended: true
}))

const pgPool = new Pool(
    {
      user: process.env.PGUSER,
      host: process.env.PGHOST,
      database: process.env.PGPASSWORD,
      password: process.env.PGDATABASE,
      port: process.env.PGPORT
    }
  );

router.use(session({
    store: new pgSession({
        pool : pgPool,                // Connection pool
        tableName : 'user_sessions'   // Use another table-name than the default "session" one
      }),
    secret: 'asdfghjkl',
    resave: false,
    saveUninitialized: false
    // cookie: { secure: true }  if https !
}))
router.use(passport.initialize())
router.use(passport.session())


router.use('/login', login)
router.use('/google', google)
router.use('/fb', facebook)
router.use('/restaurant', restaurant)
router.use('/user', userEdit)
router.use('/table', table)



module.exports = router