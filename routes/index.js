const express = require('express')
const app = require('../app')
const router = express.Router()
const bodyParser = require("body-parser")
const {use} = require("passport")


const login = require('./userSet/login') 
const restaurant = require('./endpoints/restaurant') 
const userEdit = require("./userSet/userEdit")
const google = require("./auth/log_google")
const facebook = require("./auth/log_fb")
const table = require("./endpoints/table")
const { routes } = require('../app')

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ 
    extended: true
    }))

router.get('/',(req,res)=>{
    res.status(200).send("siema kut...")
})



router.use('/dupa', (req,res)=>res.send("chuj dupa"))
router.use('/login', login)
router.use('/google', google)
router.use('/fb', facebook)
router.use('/restaurant', restaurant)
router.use('/user', userEdit)
router.use('/table', table)



module.exports = router