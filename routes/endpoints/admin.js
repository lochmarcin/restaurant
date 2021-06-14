const express = require('express')
const router = express.Router()
const db = require("../../db")

router.get("/getUsers", async(req,res)=>{
    try {
        const result = await db.query("SELECT users.id, users.name, restaurant.name FROM users INNER JOIN restaurant ON users.id != restaurant.user_id")
        console.log(result.rows)
        res.status(200).json({
            data: result.rows
        })
        
    } catch (error) {
        console.log(error)
    }
})

router.get("/getAllUsers", async(req,res)=>{
    try {
        const result = await db.query("SELECT users.id, users.name, restaurant.name FROM users INNER JOIN restaurant ON users.id != restaurant.user_id")
        console.log(result.rows)
        res.status(200).json({
            data: result.rows
        })
        
    } catch (error) {
        console.log(error)
    }
})

router.get("/getRestaurant/:id", async(req,res)=>{
    try {
        console.log(req.params)
        const param = req.params
        const result = await db.query("SELECT users.id, users.name AS user_name, restaurant.name AS res_name, restaurant.category, restaurant.phone, restaurant.city, restaurant.street, restaurant.apart_number FROM users INNER JOIN restaurant ON users.id = restaurant.user_id WHERE users.id = $1",[param])
        console.log(result.rows[0])
        res.status(200).json({
            data: result.rows[0]
        })
        
    } catch (error) {
        console.log(error)
    }
})

router.get("/getAllRestaurant", async(req,res)=>{
    try {
        const result = await db.query("SELECT users.id, users.name AS user_name, restaurant.name AS res_name FROM users INNER JOIN restaurant ON users.id = restaurant.user_id")
        console.log(result.rows)
        res.status(200).json({
            data: result.rows
        })
        
    } catch (error) {
        console.log(error)
    }
})


module.exports = router