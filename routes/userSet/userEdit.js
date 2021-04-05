const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const bcrypt = require("bcryptjs")


const bodyParser = require("body-parser")
const User = require('../../schema/userModel')
const passport = require('passport')

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({
    extended: true
}))


router.post("/changePassword", (req,res)=>{
    console.log(req.body)
    
    //await
    const hashPassword = bcrypt.hash(req.body.password, 10)
    console.log(hashPassword)

    // await User.findOneAndUpdate(
    //     {
    //         email: req.body.email
    //     },
    //     {
    //         email: req.body.email,
    //         password: hashPassword
    //     },{
    //         upsert:true
    //     }
    // )
})


module.exports = router