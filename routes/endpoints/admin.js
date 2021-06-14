const express = require('express')
const router = express.Router()
const db = require("../../db")


// router.get("/getAllRestaurant", async(req,res)=>{
//     const result = await db.query("SELECT user.id, users.name, restaurant.name FROM users INNER JOIN restaurant ON users.id = restaurant.user_id")
//     console.log(result.rows)
//     res.status(200).json({
//         data: result.rows
//     })
// })

router.get("/getAllRestaurant", async(req,res)=>{
    const result = await db.query("SELECT user.id, users.name, restaurant.name FROM users INNER JOIN restaurant ON users.id = restaurant.user_id")
    console.log(result.rows)
    res.status(200).json({
        data: result.rows
    })
})


module.exports = router