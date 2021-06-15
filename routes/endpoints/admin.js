const express = require('express')
const router = express.Router()
const db = require("../../db")

router.get("/getUser/:id", async(req,res)=>{
    try {
        const result = await db.query("SELECT users.id, users.name, restaurant.name FROM users INNER JOIN restaurant ON users.id != restaurant.user_id WHERE ")
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
        const result = await db.query("SELECT users.id, users.name, users.email , restaurant.user_id AS rest_user_id FROM users INNER JOIN restaurant ON restaurant.user_id != users.id GROUP BY users.id")
        console.log(result.rows)
        res.status(200).json({
            data: result.rows
        })
        
    } catch (error) {
        console.log(error)
    }
})
//  usuwanie restauracjin i wszystkiego 
router.delete("/DeleteUser/:id", async(req,res)=>{
    try {
        const param = req.params.id
        console.log(param)
        const result = await db.query("SELECT users.id, users.name AS user_name, restaurant.name AS res_name, restaurant.category, restaurant.phone, restaurant.city, restaurant.street, restaurant.apart_number FROM users INNER JOIN restaurant ON users.id = restaurant.user_id WHERE users.id = $1", [param])
        console.log(result.rows[0])
        res.status(200).json({
            data: result.rows[0]
        })
        
    } catch (error) {
        console.log(error)
    }
})

router.get("/getRestaurant/:id", async(req,res)=>{
    try {
        const param = req.params.id
        console.log(param)
        const result = await db.query("SELECT users.id, users.name AS user_name, restaurant.id AS rest_id, restaurant.name AS res_name, restaurant.category, restaurant.phone, restaurant.city, restaurant.street, restaurant.apart_number FROM users INNER JOIN restaurant ON users.id = restaurant.user_id WHERE users.id = $1", [param])
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