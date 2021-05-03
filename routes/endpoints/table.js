const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const db = require("../../db")

const bodyParser = require("body-parser")
const Restaurant = require('../../schema/restaurantSchema')

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({
    extended: true
}))


router.post('/create', async (req, res) => {
    console.log(req.body)
    res.status(200)
    try {
        const result = await db.query("INSERT INTO tables (id_rest, numb_seats) VALUES ($1, $2) returning *",
            [req.body.id_rest, req.body.numb_seats])
        console.log(result.rows)
        res.status(200).json({
            status: "success",
            data: {
                users: result.rows[0],
            }
        })
    } catch (err) {
        console.log(err)
    }
})

// CREATE TABLE    CREATE TABLE    
router.post('/create', async (req, res) => {
    console.log(req.body)
    res.status(200)
    try {
        const result = await db.query("INSERT INTO tables (id_rest, numb_seats) VALUES ($1, $2) returning *",
            [req.body.id_rest, req.body.numb_seats])
        console.log(result.rows)
        res.status(200).json({
            status: "success",
            data: {
                users: result.rows[0],
            }
        })
    } catch (err) {
        console.log(err)
    }
})


module.exports = router