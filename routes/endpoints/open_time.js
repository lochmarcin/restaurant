const express = require('express')
const router = express.Router()
const db = require("../../db")
const check_time = require('../services/check_time')

// const authenticate = require('../services/authenticate')

router.get("/get/:id", async (req, res) => {
    // authenticate(req,res)
    // zmień na id resturacji 

    const id_rest = req.params.id

    try {
        const result = await db.query("SELECT * FROM open_time WHERE id_rest=$1", [id_rest])
        console.log("wyświetlono")
        console.log(result.rows[0])
        res.status(200).json({
            status: "success",
            data: {
                time: result.rows[0],
            }
        })
    } catch (err) {
        console.log(err)
    }
})

router.put('/update/:id', async (req, res) => {
    // authenticate(req,res)
    // console.log("body" + req.body)
    // dodaj w parametrach id restauracji /:id
    // console.log("params" + req.params)

    const id_rest = req.params.id

    let time = { mon_open, mon_close, tue_open, tue_close, wed_open, wed_close, thu_open, thu_close, fri_open, fri_close, sat_open, sat_close, sun_open, sun_close } = req.body


    if (check_time(time, res)) {
        try {
            const result = await db.query("UPDATE open_time SET mon_open=$1, mon_close=$2, tue_open=$3, tue_close=$4, wed_open=$5, wed_close=$6, thu_open=$7, thu_close=$8, fri_open=$9, fri_close=$10, sat_open=$11, sat_close=$12, sun_open=$13, sun_close=$14 WHERE id_rest=$15", [mon_open, mon_close, tue_open, tue_close, wed_open, wed_close, thu_open, thu_close, fri_open, fri_close, sat_open, sat_close, sun_open, sun_close, id_rest])

            console.log("Zaktualizowano :)")
            res.sendStatus(200)
        } catch (err) {
            console.log(err)
        }
    }
})

router.post('/add/:id', async (req, res) => {
    // authenticate(req,res)
    // console.log("body" + req.body)
    // dodaj w parametrach id restauracji /:id
    // console.log("params" + req.params)
    const id_rest = 1
    //req.body.id

    // ALTER TABLE public.open_time
    // DROP COLUMN mon_open,
    // DROP COLUMN mon_close,
    // DROP COLUMN tue_open,
    // DROP COLUMN tue_close,
    // DROP COLUMN wed_open,
    // DROP COLUMN wed_close,
    // DROP COLUMN thu_open,
    // DROP COLUMN thu_close,
    // DROP COLUMN fri_open,
    // DROP COLUMN fri_close,
    // DROP COLUMN sat_open,
    // DROP COLUMN sat_close,
    // DROP COLUMN sun_open,
    // DROP COLUMN sun_close,
    //     ADD COLUMN mon_open character varying,
    //     ADD COLUMN mon_close character varying,
    //     ADD COLUMN tue_open character varying,
    //     ADD COLUMN tue_close character varying,
    //     ADD COLUMN wed_open character varying,
    //     ADD COLUMN wed_close character varying,
    //     ADD COLUMN thu_open character varying,
    //     ADD COLUMN thu_close character varying,
    //     ADD COLUMN fri_open character varying,
    //     ADD COLUMN fri_close character varying,
    //     ADD COLUMN sat_open character varying,
    //     ADD COLUMN sat_close character varying,
    //     ADD COLUMN sun_open character varying,
    //     ADD COLUMN sun_close character varying


    let time = { mon_open, mon_close, tue_open, tue_close, wed_open, wed_close, thu_open, thu_close, fri_open, fri_close, sat_open, sat_close, sun_open, sun_close } = req.body
    // Jeżeli zamknęte w ktoryś dzień to czas otwarcia 00:00 / zamknięcia 00:00 

    // time = check_time(time, res)[1]



    if (check_time(time, res)) {
        try {

            // id_rest trzebab poprawić 
            const result = await db.query("INSERT INTO open_time (id_rest, mon_open, mon_close, tue_open, tue_close, wed_open, wed_close, thu_open, thu_close, fri_open, fri_close, sat_open, sat_close, sun_open, sun_close) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) returning *", [id_rest, mon_open, mon_close, tue_open, tue_close, wed_open, wed_close, thu_open, thu_close, fri_open, fri_close, sat_open, sat_close, sun_open, sun_close])

            console.log("godziny dodane :) ")
            res.status(200).json({
                status: "success",
                data: {
                    time: result.rows[0]
                }
            })

        } catch (err) {
            console.log(err)
        }
    }
})

module.exports = router