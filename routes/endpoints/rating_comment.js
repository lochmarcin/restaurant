const express = require('express')
const router = express.Router()
const db = require("../../db")
const bad_words = require("../services/check_words")

// const authenticate = require('../services/authenticate')

// let zdanie = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

// router.get("/test", (req, res) => {
//     console.log(bad_words(zdanie))
//     if (bad_words(zdanie))
//         console.log(":(")
//     else {
//         console.log(":)")
//     }

// })

router.post("/add", async (req, res) => {
    // authenticate(req,res)
    console.log(req.body)

    try {


        const result = await db.query("INSERT INTO rating_comment (id_rest, rating, comment, id_user) VALUES ($1, $2, $3, $4) ", [
            req.body.id_rest, req.body.rating, req.body.comment
            // ,req.user.id
        ])

        res.sendStatus(200)
    } catch (err) {
        console.log(err)
    }

})

module.exports = router