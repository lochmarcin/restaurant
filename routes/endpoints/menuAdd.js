const express = require('express')
const router = express.Router()
const db = require("../../db")
const multer = require("multer")

const storage = multer.memoryStorage()
const upload = multer({
    storage
})

const imageProcess = require('./../services/imageProcess')


// usuwanie jednej strony menu
router.delete("/delete/:id", async (req, res) => {
    console.log(req.params)

    try {
        const result = await db.query("DELETE FROM menu_restaurant WHERE id=$1", [req.params.id])
        res.status(200).json({
            status: "success"
        })
    } catch (err) {
        console.log(err)
    }
})

//aktualizacja jednej strony menu
router.put("/update/:id", upload.single('image'), async (req, res) => {
    console.log(req.body)
    console.log(req.file)

    const image = await imageProcess(req)
    console.log(image)
    try {
        let result
        if (!image) {
            result = await db.query("UPDATE menu_restaurant SET page=$1 WHERE id=$2 returning *", [req.body.page, req.body.id])
        }
        result = await db.query("UPDATE menu_restaurant SET page=$1, menu_url=$2, WHERE id=$3 returning *", [req.body.page, image, req.body.id])

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

// pobieranie jednej strony menu
router.get("/getOne/:id", async (req, res) => {
    console.log(req.params)

    try {
        const result = await db.query("SELECT * FROM menu_restaurant WHERE id=$1", [req.params.id])
        console.log(result.rows[0])

        res.status(200).json({
            status: "success",
            data: {
                menu: result.rows[0],
            }
        })

    } catch (err) {
        console.log(err)
    }
})

// pobieranie menu 
router.get("/get/:id_rest", async (req, res) => {
    console.log(req.params)

    try {
        const result = await db.query("SELECT id, page, menu_url FROM menu_restaurant WHERE id_rest= $1 ORDER BY page ASC", [req.params.id_rest])

        console.log(result.rows)
        res.status(200).json({
            status: "success",
            data: {
                menu: result.rows,
            }
        })

    } catch (err) {
        console.log(err)
    }
})

// dodawanie menu 
router.post("/add", upload.single('image'), async (req, res) => {
    // upload.single('image'),
    console.log(req.body)
    console.log('file', req.file)

    const image = await imageProcess(req)
    console.log(image)

    try {
        const result = await db.query("INSERT INTO menu_restaurant (menu_url,page, id_rest) VALUES ($1,$2,$3) returning *", [image, req.body.page, req.body.id_rest])
        console.log(result.rows)


        // const menu = await db.query("SELECT menu FROM menu_restaurant WHERE id=$1", [req.body.id])


        // if (menu.rows[0] == null) {
        //     let obj = `{"items":"${image}"}`
        //     console.log(obj)
        //     menu.rows[0].push(obj)
        // }
        // else{

        // }
        // console.log(menu.rows[0] == null)
        // // const result = await db.query("INSERT INTO menu_restaurant (menu) VALUE ($1)", [])
    } catch (err) {
        console.log(err)
    }
})


module.exports = router