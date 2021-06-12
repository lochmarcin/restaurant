const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const db = require("../../db")
const fs = require('fs')

const bodyParser = require("body-parser")
const Restaurant = require('../../schema/restaurantSchema')
const imageProcess = require('./../services/imageProcess')
// const dirname = require('../../dirname')
const delete_photo = require('../services/delete_photo')

const moment = require('moment'); // require
moment().format();

const multer = require("multer")
const console = require('console')
// const { delete } = require('./reserwation')
// const { delete } = require('./reserwation')

const storage = multer.memoryStorage()
const upload = multer({
    storage
})


router.use(bodyParser.json())
router.use(bodyParser.urlencoded({
    extended: true
}))

router.get("/date", async (req, res) => {
    let data = moment().local().format()
    // .format("YYYY-MM-D")
    let data1 = moment().utcOffset(120).format()

    console.log(data)

    console.log(data1)
})

router.get("/me", async (req, res) => {
    res.status(200).json(req.user)
})

// DELETE ONE TABLE 
router.delete('/delete/:id', async (req, res) => {
    console.log(req.body)
    console.log(req.params)
    try {
        let del = await db.query("SELECT image_url FROM tables WHERE id = $1", [req.params.id])
        delete_photo(del)
        // del = del.rows[0].image_url
        // del = del.split('/')
        // del = del[del.length - 1]

        // let path = await dirname()
        // path = `${path}\\uploads\\${del}`

        // console.log(path)
        // fs.unlinkSync(path)

        const result = await db.query("DELETE FROM tables WHERE id = $1 ",
            [req.params.id])
        res.status(200).json({
            status: "success"
        })
    } catch (err) {
        console.log(err)
    }
})

// GET ONE TABLE - do edycji stolika 
router.get('/getOne/:id', async (req, res) => {
    // console.log(req.body)
    console.log(req.params)
    try {
        const result = await db.query("SELECT * FROM tables WHERE id = $1",
            [req.params.id])
        console.log(result.rows[0])
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


router.post("/getByDate/:id", async (req,res)=>{
    try {
        let date_booking = `${req.body.year}-${req.body.month}-${req.body.day}`
        console.log("date_booking: " + date_booking)
        
        await getTables(req, res , date_booking)

    } catch (err) {
        console.log(err)
    }
})
// wyślij tylko te które są dostępne na konkretny dzień
// GET rezerwacje z konkretnej daty oraz restauracji 
router.post("/getTableToday/:id", async (req, res) => {
    // authenticate(req,res)
    console.log(req.body)

    try {
 
        let date_booking = moment().local().format("YYYY-MM-D")

        console.log("date_booking: " + date_booking)

        await getTables(req, res , date_booking)

        // const reserwation = await db.query("SELECT tables.id FROM tables FULL OUTER JOIN reserwation ON reserwation.id_table = tables.id WHERE tables.id_rest=$1 AND reserwation.date_booking = $2", [
        //     req.params.id, date_booking,
        // ])
        // let tables = await db.query("SELECT id, id_rest, numb_seats, number_table, image_url FROM tables WHERE id_rest=$1", [req.params.id])

        // console.log("Rezerwacji: " + reserwation.rows.length)
        // console.log("Stolików: " + tables.rows.length)


        // let response = []
        // let del
        // for (let tab = 0; tab < tables.rows.length; tab++) {
        //     del = false
        //     for (let res = 0; res < reserwation.rows.length; res++) {
        //         if (tables.rows[tab].id == reserwation.rows[res].id)
        //             del = true
        //     }
        //     if (del == false)
        //         response.push(tables.rows[tab])
        //     // response += tables.rows[tab]
        // }

        // console.log("date_booking: " + date_booking)
        // console.log("Wolnych stolików: " + response.length)
        // res.status(200).json({
        //     status: "success",
        //     data: {
        //         tables: response,
        //     },
        //     date_booking: date_booking
        // })
        // console.log("------------------------------------------")
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
router.put("/update/:id", upload.single('image'), async (req, res) => {
    console.log("update table")
    console.log("param: " + req.params)
    console.log("body: " + req.body)
    // console.log(req.file)

    const image = await imageProcess(req)
    console.log(image)

    try {
        let result
        if (image == null) {
            result = await db.query("UPDATE tables SET numb_seats=$1, number_table=$2 WHERE id=$3 returning *",
                [req.body.numb_seats, req.body.number_table, req.params.id])
            console.log("brak zdjęcia :(")
        } else {
            let del = await db.query("SELECT image_url FROM tables WHERE id = $1", [req.params.id])
            delete_photo(del)

            result = await db.query("UPDATE tables SET numb_seats=$1, number_table=$2, image_url=$3 WHERE id=$4 returning *",
                [req.body.numb_seats, req.body.number_table, image, req.params.id])
            console.log("zdjęcie :)")
        }
        console.log(result.rows)
        res.status(200).json({
            status: "success",
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



const getTables = async (req, res , date_booking) => {

    try {
        const reserwation = await db.query("SELECT tables.id FROM tables FULL OUTER JOIN reserwation ON reserwation.id_table = tables.id WHERE tables.id_rest=$1 AND reserwation.date_booking = $2", [
            req.params.id, date_booking,
        ])
        let tables = await db.query("SELECT id, id_rest, numb_seats, number_table, image_url FROM tables WHERE id_rest=$1", [req.params.id])

        console.log("Rezerwacji: " + reserwation.rows.length)
        console.log("Stolików: " + tables.rows.length)


        let response = []
        let del
        for (let tab = 0; tab < tables.rows.length; tab++) {
            del = false
            for (let res = 0; res < reserwation.rows.length; res++) {
                if (tables.rows[tab].id == reserwation.rows[res].id)
                    del = true
            }
            if (del == false)
                response.push(tables.rows[tab])
            // response += tables.rows[tab]
        }

        console.log("date_booking: " + date_booking)
        console.log("Wolnych stolików: " + response.length)
        res.status(200).json({
            status: "success",
            data: {
                tables: response,
            },
            date_booking: date_booking
        })
        console.log("------------------------------------------")
    } catch (err) {
        console.log(err)
    }
}


module.exports = router