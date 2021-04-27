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
    // try {
    //     const result = await db.query("INSERT INTO restaurant (user_id, name, description, category, nip, phone, city, street, apart_number) VALUES ($1, $2, $3) returning *", 
    //     [req.body.user_id, req.body.name, req.body.description, req.body.category, req.body.nip, req.body.phone, req.body.city, req.body.street, req.body.apart_number])
    //     console.log(result.rows)
    //     res.status(200).json({
    //         status: "success",
    //         data: {
    //             users: result.rows[0],
    //         }
    //     })
    // } catch (err) {
    //     console.log(err)
    // }
})



// router.post('/', (req,res)=>{
//     console.log(req.body)
//     Restaurant.findOne({
//         nip: req.body.nip.trim()
//     }), async (err,doc) => {
//         if (err) throw err 
//         // throw err
//         if (doc) throw res.json({message:'restaurant exist in database'})    
//         //create Restaurant
//         if (!doc) {
//             const newRestaurant = new Restaurant({
//                 name: req.body.name,
//                 about: req.body.about,
//                 type_restaurant: req.body.typeRestaurant,
//                 logo_url: req.body.logoUrl,
//                 image_url: req.body.imageUrl,
//                 adress: req.body.adress,
//                 locality: req.body.locality,
//                 contact: req.body.contact,
//                 nip: req.body.nip,
//                 number_of_tables: req.body.number_of_tables,
//                 open_hour: req.body.open_hour,
//                 close_hour: req.body.close_hour 
//             })
//             newRestaurant.save()
//             res.status(200).send("Restaurant Created!")
//         }
//     }   
// })


module.exports = router