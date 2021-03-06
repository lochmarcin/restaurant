const express = require('express')
const app = require('../app')
const router = express.Router()
const bodyParser = require("body-parser")
const {use} = require("passport")


const login = require('./userSet/login') 
const restaurant = require('./restaurant/restaurant') 
const userEdit = require("./userSet/userEdit")
const google = require("./auth/log_google")
const { routes } = require('../app')

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ 
    extended: true
    }))

// router.get('/',(req,res)=>{
//     res.status(200).send("siema kut...")
// })
router.use('/',google)


router.use('/dupa', (req,res)=>res.send("chuj dupa"))
router.use('/login', login)
router.use('/google', google)
router.use('/restaurant', restaurant)
router.use('/user', userEdit)

// router.post('/chuj', (req,res)=>{
//     res.send(req.body)
// })


module.exports = router