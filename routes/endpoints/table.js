const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const db = require("../../db")
const fs = require('fs')

const bodyParser = require("body-parser")
const Restaurant = require('../../schema/restaurantSchema')
const imageProcess = require('./../services/imageProcess')
const dirname = require('../../dirname')

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
        let del = await db.query("SELECT image_url FROM tables WHERE id = $1",[req.params.id])
        del = del.rows[0].image_url
        del = del.split('/')
        del = del[del.length-1]
        
        let path = await dirname()
        path = `${path}\\uploads\\${del}`
        
        console.log(path)
        fs.unlinkSync(path)

        const result = await db.query("DELETE FROM tables WHERE id = $1 ",
            [req.params.id])
        res.status(200).json({
            status: "success"
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
                tables: result.rows[0],
            }
        })
    } catch (err) {
        console.log(err)
    }
})

// wyślij tylko te które są dostępne na konkretny dzień
// GET rezerwacje z konkretnej daty oraz restauracji 
router.get("/getByDate:id_rest", async (req,res)=>{
    authenticate(req,res)
    console.log(req.body)
    // req.body.date_choice 

    try {
        const date_booking = `${req.body.year}-${req.body.month}-${req.body.day}`

        const result = await db.query("SELECT tables.id, tables.id_rest, tables.image_url, tables.numb_seats, tables.number_table FROM tables INNER JOIN reserwation ON reserwation.id_table = tables.id WHERE table.id_rest=$1 AND reserwation.date_booking = $2", [
            req.body.id_rest, date_booking ,
        ])
        console.log(result.rows)
        res.status(200).json({
            status: "success",
            data: {
                tables: result.rows
            }
        })
    } catch (err) {
        console.log(err)
    }
})

// GET TABLES FROM RESTAURANT  
router.get('/getAll/:id_rest', async (req, res) => {
    console.log(req.body)
    console.log(req.params)
    try {
        const result = await db.query("SELECT * FROM tables WHERE id_rest = $1",
            [req.params.id_rest])
        console.log(result.rows)
        res.status(200).json({
            status: "success",
            data: {
                tables: result.rows,
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
                tables: result.rows[0],
            }
        })
    } catch (err) {
        console.log(err)
    }
})


// CREATE TABLE    CREATE TABLE    
router.post('/create', upload.single('image'), async (req, res) => {
    console.log('body', req.body)
    console.log('file', req.file)
        
    const image = await imageProcess(req)
    console.log(image)
    
    try {
        const result = await db.query("INSERT INTO tables (id_rest, numb_seats, image_url, number_table) VALUES ($1, $2, $3, $4) returning *",
            [req.body.id_rest, req.body.numb_seats, image, req.body.number_table])
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