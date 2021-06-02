const express = require('express')
const router = express.Router()
const db = require("../../db")

// GET INFO 1 reserwations BY ID USER
router.get("/get", async (req, res) => {
    try {
        const reserwation = await db.query("SELECT reserwation.id, users.name AS UserName, restaurant.name AS RestaurantName, tables.number_table, reserwation.time_booking, reserwation.time_reserwation FROM reserwation INNER JOIN tables ON reserwation.id_table = tables.id INNER JOIN users ON reserwation.id_user = users.id INNER JOIN restaurant ON reserwation.id_restaurant = restaurant.id WHERE users.id=$1", [
            req.body.id_user
        ])
        console.log(reserwation.rows[0])
        res.status(200).send(reserwation.rows[0])
    } catch (err) {
        console.log(err)
    }
})

// TWORZENIE REZERWACJI 
router.post("/create", async (req, res) => {
    console.log('body', req.body)

    try {
        // const check = await db.query("SELECT * FROM reserwation WHERE id_table = $1 AND time_booking > $2 ",[
        //     req.body.id_table, req.body.time_booking
        // ])

        const reserwation = await db.query("INSERT INTO reserwation (id_user, id_restaurant, id_table, time_booking, time_reserwation) VALUES ($1,$2,$3,$4,$5)", [
            req.body.id_user, req.body.id_restaurant, req.body.id_table, req.body.time_booking, new Date().toJSON()
        ])
    } catch (err) {
        console.log(err)
    }
})

router.delete("/delete", async (req, res) => {
    try {
        const reserwation = await db.query("")
    } catch (err) {
        console.log(err)
    }
})

module.exports = router