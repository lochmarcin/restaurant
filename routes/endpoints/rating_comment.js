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

router.delete("/delete/:id", async (req, res) => {
    console.log(req.params)

    try {
        const result = await db.query("DELETE FROM rating_comment WHERE id=$1", [
            req.params.id
        ])
        console.log(result.rows)
        res.sendStatus(200)
    } catch (err) {
        console.log(err)
    }
})

router.get("/getOne/:id", async (req, res) => {
    console.log(req.params)

    try {
        const result = await db.query("SELECT * FROM rating_comment WHERE id_rest=$1", )
        console.log(result.rows)
        res.status(200).json({
            status: "success",
            data: {
                comments: result.rows
            }
        })
    } catch (err) {
        console.log(err)
    }
})

// pobieranie wszystkich komentarzy dla danej restauracji 
router.get("/getAll/:id", async (req, res) => {
    console.log(req.params)

    try {
        const result = await db.query("SELECT * FROM rating_comment WHERE id_rest=$1", )
        console.log(result.rows)
        res.status(200).json({
            status: "success",
            data: {
                comments: result.rows
            }
        })
    } catch (err) {
        console.log(err)
    }
})

router.post("/add/:id", async (req, res) => {
    // authenticate(req,res)
    console.log(req.body)
    console.log(req.params.id)

    try {
        if (!bad_words(req.body.comment))
            res.status(300).send("nie używaj brzydkich słów :(")
        else {
            const result = await db.query("INSERT INTO rating_comment (id_rest, rating, comment, id_user) VALUES ($1, $2, $3, $4) returning *", [
                req.params.id_rest, req.body.rating, req.body.comment, 1
                // req.user.id
            ])
            console.log(result.rows[0])
            res.status(200).json({
                status: "success",
                data: {
                    tables: result.rows[0],
                }
            })
        }

    } catch (err) {
        console.log(err)
    }

})

module.exports = router