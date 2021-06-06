const express = require('express')
const router = express.Router()
const db = require("../../db")
const authenticate = require('../services/authenticate')




// usuwanie rezerwacji 


// GET INFO 1 reserwations BY ID USER
router.get("/get", async (req, res) => {
    authenticate(req, res)
    try {
        const reserwation = await db.query("SELECT reserwation.id, users.name, restaurant.name, tables.number_table,reserwation.date_booking, reserwation.time_booking, reserwation.time_reserwation FROM reserwation INNER JOIN tables ON reserwation.id_table = tables.id INNER JOIN users ON reserwation.id_user = users.id INNER JOIN restaurant ON reserwation.id_restaurant = restaurant.id WHERE users.id=$1 AND date_booking >= CURRENT_DATE", [
            req.user.id,
        ])
        console.log(reserwation.rows[0])
        res.status(200).send(reserwation.rows[0])
    } catch (err) {
        console.log(err)
    }
})

// TWORZENIE REZERWACJI 
router.post("/create", async (req, res) => {
    authenticate(req, res)
    console.log('body', req.body)

    try {
        const date_booking = `${req.body.year}-${req.body.month}-${req.body.day}`
        const time_booking = `${req.body.hour}:${req.body.min}:00`

        const check = await db.query("SELECT * FROM reserwation WHERE id_table = $1 AND date_booking=$2 AND time_booking >= $3 ", [
            req.body.id_table, date_booking, time_booking
        ])
        if (check.rows[0] != null)
            res.status(401).send("Stolik jest już zarezerwowany :(")



        const reserwation = await db.query("INSERT INTO reserwation (id_user, id_restaurant, id_table, time_reserwation, time_booking, date_booking) VALUES ($1,$2,$3,$4,$5,$6)", [
            req.user.id, req.body.id_restaurant, req.body.id_table, new Date().toJSON(), time_booking, date_booking
        ])
        res.status(200).send("Zarezerwowano ! :)")

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