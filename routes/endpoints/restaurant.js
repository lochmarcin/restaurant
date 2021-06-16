const express = require('express')
const router = express.Router()
const db = require("../../db")

const bodyParser = require("body-parser")
const Restaurant = require('../../schema/restaurantSchema')

const imageProcess = require('./../services/imageProcess')
const menu = require("./menuAdd")
const openTime = require("./open_time")

const authenticate = require('../services/authenticate')

const multer = require("multer")

const storage = multer.memoryStorage()
const upload = multer({
    storage
})

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({
    extended: true
}))

router.use('/menu', menu)
router.use('/openTime', openTime)

// GET ALL RESTAURANT         GET ALL RESTAURANT
router.get('/getAll', async (req, res) => {
    console.log(req.body)
    try {

        const result = await db.query("SELECT * FROM restaurant")
        console.log(result.rows)
        res.status(200).json({
            status: "success",
            data: {
                restaurant: result.rows,
            }
        })
    } catch (err) {
        console.log(err)
    }
})
// GET ALL RESTAURANT BY CITY   
router.get('/getByCity/:city', async (req, res) => {
    console.log(req.body)
    try {
        const result = await db.query("SELECT * FROM restaurant WHERE city=$1", [req.params.city])
        console.log(result.rows)
        res.status(200).json({
            status: "success",
            data: {
                restaurant: result.rows,
            }
        })
    } catch (err) {
        console.log(err)
    }
})

// GET ALL RESTAURANT BY NAME       GET ALL RESTAURANT BY CITY 
router.get('/getByName/:name', async (req, res) => {
    console.log(req.body)
    try {
        const result = await db.query("SELECT * FROM restaurant WHERE name=$1", [req.params.name])
        console.log(result.rows)
        res.status(200).json({
            status: "success",
            data: {
                restaurant: result.rows,
            }
        })
    } catch (err) {
        console.log(err)
    }
})

router.get('/getInfo/:id_rest', async (req, res) => {
    console.log(req.params)
    try {
        const info = await db.query("SELECT name, description, category, phone, city, street, apart_number FROM restaurant WHERE id=$1", [req.params.id_rest])
        res.status(200).json({
            status: "success",
            data: {
                restaurant: info.rows[0],
            }
        })
    } catch (err) {
        console.log(err)
    }
})

router.get('/getBasicInfo/:id_rest?', async (req, res) => {

    // KURWA SPRAWDŹ to u kilienta ! 
    
    const id_rest = req.user.rest_id != 0 ? req.user.rest_id : req.params
    console.log(req.params)
    try {
        let rate
        const rating = await db.query("SELECT ROUND(AVG(rating),2) AS avg FROM rating_comment WHERE id_rest=$1", [id_rest])
        if (rating.rows[0].avg == null)
            rate = null
        else
            rate = rating.rows[0].avg

        console.log(rate)
        const info = await db.query("SELECT name, image_url FROM restaurant WHERE id=$1", [id_rest])
        res.status(200).json({
            status: "success",
            data: {
                name: info.rows[0].name,
                image_url: info.rows[0].image_url,
                avg: rate
            }

        })
    } catch (err) {
        console.log(err)
    }
})


// GET RESTAURANT       GET RESTAURANT 
router.get('/get', async (req, res) => {
    authenticate(req,res)

    console.log(req.body)
    console.log(req.params)
    try {
        const result = await db.query("SELECT * FROM restaurant WHERE user_id = $1",
            [
                req.user.id
                // req.params.user_id
            ])
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

// UPDATE RESTAURANT      UPDATE RESTAURANT
router.put('/update', async (req, res) => {
    authenticate(req,res)
    console.log(req.body)
    console.log(req.params)
    try {
        const result = await db.query("UPDATE restaurant SET name = $1, description = $2, category = $3, nip = $4, phone = $5, city = $6, street = $7, apart_number = $8 WHERE user_id = $9 returning *",
            [req.body.name, req.body.description, req.body.category, req.body.nip, req.body.phone, req.body.city, req.body.street, req.body.apart_number,
            req.user.id,
            // req.params.user_id
        ])
        console.log(result.rows[0])
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

// CREATE RESTAURANT       CREATE RESTAURANT 
router.post('/create', upload.single('image'), async (req, res) => {
    authenticate(req, res)

    console.log('body', req.body)
    console.log('file', req.file)

    const image = await imageProcess(req)
    console.log(image)
    try {
        const result = await db.query("INSERT INTO restaurant (user_id, name, description, category, nip, phone, city, street, apart_number, image_url) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) returning *",
            [
                req.user.id,
                // req.body.user_id,
                req.body.name, req.body.description, req.body.category, req.body.nip, req.body.phone, req.body.city, req.body.street, req.body.apart_number, image])
        console.log(result.rows[0])
        req.user.id_rest = result.rows[0].id
        console.log(req.user)
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