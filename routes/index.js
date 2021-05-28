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

// Authentication requires
const session = require('express-session')


router.use(bodyParser.json())
router.use(bodyParser.urlencoded({
    extended: true
}))

router.use(session({
    secret: 'asdfghjkl',
    resave: false,
    saveUninitialized: false
    // cookie: { secure: true }  if https !
}))


router.use('/login', login)
router.use('/google', google)
router.use('/fb', facebook)
router.use('/restaurant', restaurant)
router.use('/user', userEdit)
router.use('/table', table)



module.exports = router