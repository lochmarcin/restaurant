const express = require('express')
const router = express.Router()
const db = require("../../db")

const authenticate = require('../services/authenticate')

router.post("/add", async(req,res)=>{
    // authenticate(req,res)
    console.log(req.body)

    try {
        
        const result = await db.query("INSERT INTO rating_comment (id_rest, rating, comment, id_user) VALUES ($1, $2, $3, $4) ",[
            req.body.id_rest, req.body.rating, req.body.comment, req.user.id
        ])
    } catch (err) {
        console.log(err)
    }

})

module.exports = router