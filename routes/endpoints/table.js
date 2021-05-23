const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const db = require("../../db")

const bodyParser = require("body-parser")
const Restaurant = require('../../schema/restaurantSchema')
const imageProcess = require('./../services/imageProcess')

const multer = require("multer")

const storage = multer.memoryStorage()
const upload = multer({storage}) 


router.use(bodyParser.json())
router.use(bodyParser.urlencoded({
    extended: true
}))

router.get("/me", async (req, res) => {
    res.status(200).json(req.user)
  })

// DELETE ONE TABLE 
router.delete('/delete/:id', async (req, res) => {
    console.log(req.body)
    console.log(req.params)
    try {
        const result = await db.query("SELECT * FROM restaurant WHERE id_user = $1",
            [req.params.id_user])
        console.log(result.rows)
        res.status(200).json({
            status: "success",
            data: {
                restaurant: result.rows[0],
            }
        })
    } catch (err) {
        console.log(err)
    }
})

// GET ONE TABLE 
router.get('/get/:id_user', async (req, res) => {
    console.log(req.body)
    console.log(req.params)
    try {
        const result = await db.query("SELECT * FROM restaurant WHERE id_user = $1",
            [req.params.id_user])
        console.log(result.rows)
        res.status(200).json({
            status: "success",
            data: {
                restaurant: result.rows[0],
            }
        })
    } catch (err) {
        console.log(err)
    }
})

// GET ONE TABLE 
router.get('/get/:id', async (req, res) => {
    console.log(req.body)
    console.log(req.params)
    try {
        const result = await db.query("SELECT * FROM restaurant WHERE id = $1",
            [req.params.id])
        console.log(result.rows)
        res.status(200).json({
            status: "success",
            data: {
                restaurant: result.rows[0],
            }
        })
    } catch (err) {
        console.log(err)
    }
})

// UPDATE TABLE     UPDATE TABLE
router.put('/update/:id ', async (req, res) => {
    console.log(req.body)
    res.status(200)
    try {
        const result = await db.query("UPDATE tables SET numb_seats=$1 image_url=$1 returning *",
            [req.body.numb_seats, req.file.path])
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
// router.post('/create', upload.single('image'), async (req, res) => {
//     console.log('body', req.body)
//     console.log('file', req.file)
        
//     const image = await imageProcess(req)
//     console.log(image)
    
//     try {
//         const result = await db.query("INSERT INTO tables (id_rest, numb_seats, imageUrl) VALUES ($1, $2, $3) returning *",
//             [req.body.id_rest, req.body.numb_seats, image])
//         console.log(result.rows)
//         res.status(200).json({
//             status: "success",
//             data: {
//                 users: result.rows[0],
//             }
//         })
//     } catch (err) {
//         console.log(err)
//     }
// })


// CREATE  MANY MAAAAAANYYYYYYYYYYYYY  TABLES    CREATE TABLE    
router.post('/create', upload.array('image', 100), async (req, res) => {
    console.log('body', req.body)
    console.log('file', req.files)
        
    const image = await imageProcess(req)
    console.log(image)
    
    // try {
    //     const result = await db.query("INSERT INTO tables (id_rest, numb_seats, imageUrl) VALUES ($1, $2, $3) returning *",
    //         [req.body.id_rest, req.body.numb_seats, image])
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

router.post("/test", (req,res)=>{
    const data = req.body
    res.send(data[2])
})



module.exports = router