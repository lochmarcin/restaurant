const express = require('express')
const app = require('../app')
const router = express.Router()
const bodyParser = require("body-parser")

const restaurant = require('./endpoints/restaurant')
const google = require("./auth/log_google")
const facebook = require("./auth/log_fb")
const comment = require("./endpoints/rating_comment")
const admin = require("./endpoints/admin")

const reserwation = require("./endpoints/reserwation")
const table = require("./endpoints/table")
const log = require("./auth/log")
const { routes } = require('../app')





router.use(bodyParser.json())
router.use(bodyParser.urlencoded({
    extended: true
}))



router.use('/admin', admin)
router.use('/comment', comment)
router.use('/login', log)
router.use('/google', google)
router.use('/restaurant', restaurant)
router.use('/table', table)
router.use('/reserwation', reserwation)



module.exports = router