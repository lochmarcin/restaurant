const express = require('express')
const router = express.Router()
const db = require("../../db")
const check_words = require("../services/check_words")

const authenticate = require('../services/authenticate')

router.get("test", async(req,res)=>{
    console.log(check_words)
})

router.post("/add", async(req,res)=>{
    // authenticate(req,res)
    console.log(req.body)

    try {
        

        const result = await db.query("INSERT INTO rating_comment (id_rest, rating, comment, id_user) VALUES ($1, $2, $3, $4) ",[
            req.body.id_rest, req.body.rating, req.body.comment
            // ,req.user.id
        ])

        res.sendStatus(200)
    } catch (err) {
        console.log(err)
    }

})

module.exports = router