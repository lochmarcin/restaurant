const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const db = require("../../db")

const bodyParser = require("body-parser")
const Restaurant = require('../../schema/restaurantSchema')

const multer = require("multer")

const fileFilter = (req, file, cb) =>{
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    }
    else{
        cb(null, false)
    }
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __dirname + './../../uploads/')
      },
    filename: function(req, file,cb){
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname)
    }
})

const upload = multer({
    storage: storage,
    limits:{
        fileSize: 1024 * 1024 *5
    },
    fileFilter: fileFilter
})

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({
    extended: true
}))


// router.post('/create', async (req, res) => {
//     console.log(req.body)
//     res.status(200)
//     try {
//         const result = await db.query("INSERT INTO tables (id_rest, numb_seats) VALUES ($1, $2) returning *",
//             [req.body.id_rest, req.body.numb_seats])
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
router.post('/create', upload.single('table'), async (req, res) => {
    console.log(req.body)
    console.log(req.file)
    res.status(200)
    try {
        const result = await db.query("INSERT INTO tables (id_rest, numb_seats, image_url) VALUES ($1, $2, $3) returning *",
            [req.body.id_rest, req.body.numb_seats, req.file.path])
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