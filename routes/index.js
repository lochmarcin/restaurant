const express = require('express')
const router = express.Router()
// const { routes } = require('../app')


const restaurant = require('./endpoints/restaurant')
const google = require("./auth/log_google")
const comment = require("./endpoints/rating_comment")
const admin = require("./endpoints/admin")
const reserwation = require("./endpoints/reserwation")
const table = require("./endpoints/table")
const log = require("./auth/log")

router.use('/admin', admin)
router.use('/comment', comment)
router.use('/login', log)
router.use('/google', google)
router.use('/restaurant', restaurant)
router.use('/table', table)
router.use('/reserwation', reserwation)



module.exports = router