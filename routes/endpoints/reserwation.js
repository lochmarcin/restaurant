const express = require('express')
const router = express.Router()
const db = require("../../db")
const authenticate = require('../services/authenticate')
const check_date_time_reserwation = require('../services/check_date_time_reserwation')




// usuwanie rezerwacji 
router.delete("/delete/:id", async (req, res) => {
    // authenticate(req, res)
    console.log(req.params.id)
    try {
        const del = await db.query("DELETE FROM reserwation WHERE id=$1", [
            req.params.id
        ])
        res.status(200).send("Rezerwacja została anulowana ")
    } catch (err) {
        console.log(err)
    }
})


// GET INFO All to restaurant 
router.get("/getAll/:id", async (req, res) => {
    // authenticate(req, res)
    // restaurant.id
    console.log(req.params.id)
    try {
        const reserwation = await db.query("SELECT reserwation.id, users.name, restaurant.name, tables.number_table,reserwation.date_booking, reserwation.time_booking, reserwation.time_reserwation FROM reserwation INNER JOIN tables ON reserwation.id_table = tables.id INNER JOIN users ON reserwation.id_user = users.id INNER JOIN restaurant ON reserwation.id_restaurant = restaurant.id WHERE restaurant.id=$1 ", [
            // req.user.id,
            req.params.id
        ])
        console.log(reserwation.rows)
        res.status(200).send(reserwation.rows)
    } catch (err) {
        console.log(err)
    }
})

// GET INFO 1 reserwations BY ID USER
router.get("/get", async (req, res) => {
    authenticate(req, res)

    // console.log(req.params.id)
    try {
        const reserwation = await db.query("SELECT reserwation.id, users.name AS user_name, restaurant.name AS restaurant_name, tables.number_table, reserwation.date_booking, reserwation.time_booking, reserwation.time_reserwation FROM reserwation INNER JOIN tables ON reserwation.id_table = tables.id INNER JOIN users ON reserwation.id_user = users.id INNER JOIN restaurant ON reserwation.id_restaurant = restaurant.id WHERE users.id=$1", [
            req.user.id
        ])
        console.log(reserwation.rows)
        res.status(200).send(reserwation.rows[0])
    } catch (err) {
        console.log(err)
    }
})


router.post("/check", async (req, res) => {
    const date_booking = `${req.body.year}-${req.body.month}-${req.body.day}`
    const time_booking = `${req.body.hour}:${req.body.min}:00`

    check_date_time_reserwation(date_booking, time_booking, res)
})

// tworznie rezerwacji przez RESTAURATORA
router.post("/create", async (req, res) => {
    authenticate(req, res)
    console.log('user: ', req.user)


    console.log('body: ', req.body)

    const id_user = req.user.id
    const rest_id = req.user.rest_id

    try {
        await reserw(req, id_user, rest_id, res)
    } catch (error) {
        console.log(error)
    }
})

// tworzenie rezerwacji przez KLIENTA
router.post("/create/:id", async (req, res) => {
    authenticate(req, res)
    console.log('user: ', req.user)


    console.log('body: ', req.body)

    const id_user = req.user.id
    const rest_id = req.params.id

    try {
        await reserw(req, id_user, rest_id, res)
    } catch (error) {
        console.log(error)
    }
})
// Funkcja rezerująca ! 
const reserw = async (req, id_user, rest_id, res) => {
    try {
        //     const check = await db.query("SELECT * FROM reserwation WHERE id_table = $1 AND date_booking=$2 AND time_booking >= $3 ", [
        //         req.body.id_table, date_booking, time_booking
        //     ])
        //     if (check.rows[0] != null)
        //         res.status(401).send("Stolik jest już zarezerwowany :(")
        const date_booking = req.body.date_booking
        const time_booking = `${req.body.hour}:${req.body.min}`

        // const reserwation = await db.query("INSERT INTO reserwation (id_user, id_restaurant, id_table, time_reserwation, time_booking, date_booking, date_booking2) VALUES ($1,$2,$3,$4,$5,$6,$7)", [

        const reserwation = await db.query("INSERT INTO reserwation (id_user, id_restaurant, id_table, time_reserwation, time_booking, date_booking) VALUES ($1,$2,$3,$4,$5,$6)", [
            id_user, rest_id, req.body.id_table, new Date().toJSON(), time_booking, date_booking
        ])
        res.status(200).send("Zarezerwowano ! :)")

    } catch (err) {
        console.log(err)
    }
}

router.delete("/delete", async (req, res) => {
    try {
        const reserwation = await db.query("")
    } catch (err) {
        console.log(err)
    }
})

module.exports = router