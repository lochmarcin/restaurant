const express = require('express')
const router = express.Router()
const db = require("../../db")
const bad_words = require("../services/check_words")

const authenticate = require('../services/authenticate')


// const authenticate = require('../services/authenticate')


router.delete("/delete/:id", async (req, res) => {
    console.log(req.params)

    try {
        const result = await db.query("DELETE FROM rating_comment WHERE id=$1", [
            req.params.id
        ])
        console.log(result.rows)
        res.status(200).send("Usunięto komentarz")
    } catch (err) {
        console.log(err)
    }
})

router.get("/getOne/:id", async (req, res) => {
    console.log(req.params)

    try {
        const result = await db.query("SELECT * FROM rating_comment WHERE id_rest=$1",)
        console.log(result.rows)
        res.status(200).json({
            status: "success",
            data: {
                comment: result.rows
            }
        })
    } catch (err) {
        console.log(err)
    }
})

// pobieranie wszystkich komentarzy dla danej restauracji 
router.get("/getAll", async (req, res) => {
    authenticate(req, res)

    console.log(req.params.id)


    try {
        const result = await db.query("SELECT * FROM rating_comment WHERE id_rest=$1 ORDER BY date_comment DESC", [req.user.rest_id])
        console.log(result.rows)
        res.status(200).json({
            status: "success",
            data: {
                comment: result.rows
            }
        })
    } catch (err) {
        console.log(err)
    }
})

// od strony użytkownik dodawanie komentarzy 
router.post("/add/:id", async (req, res) => {
    // authenticate(req,res)
    console.log(req.body)
    console.log(req.params.id)

    try {
        if (bad_words(req.body.comment))
            res.send("nie używaj brzydkich słów :(")
        else {
            const result = await db.query("INSERT INTO rating_comment (id_rest, rating, comment, id_user, date_comment) VALUES ($1, $2, $3, $4, $5) returning *", [
                req.params.id, req.body.rating, req.body.comment, 1, new Date().toJSON()
                // req.user.id
            ])
            console.log(result.rows[0])
            res.status(200)
            // .json({
            //     status: "success",
            //     data: {
            //         comment: result.rows[0],
            //     }
            // })
        }

    } catch (err) {
        console.log(err)
    }

})

module.exports = router