// import express from 'express';
// import mongoose from 'mongoose';
// import login from './login'; 

require('dotenv').config({path:'.env'}) 
const app = require('./app')
const express = require('express')
const mongoose = require('mongoose')
const db = require("./db")
// const login = require('./routes/login') 
const cors = require('cors')


app.use(cors({
    origin: process.env.URL_FRONT,
    credentials: true
}))

app.use(express.static('uploads'))

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Serwer działa na porcie ${port}`))


// // app.use('/login', login)

// app.get('/postgres',async (req,res)=>{
//     try {
//         const result =await db.query("SELECT * FROM users")
//         console.log(result)
//         res.status(200).json({
//         status: "success",
//         results: result.rows.length,
//         data: {
//             users: result.rows,
//         }
//     })
//     } catch (err) {
//         console.log(err)
//     }
// })

// app.get('/postgres/:id',async (req,res)=>{
//     try {
//         const result = await db.query("SELECT * FROM users WHERE id=$1",[req.params.id])
//         console.log(result.rows)
//         res.status(200).json({
//         status: "success",
//         results: result.rows.length,
//         data: {
//             users: result.rows,
//         }
//     })
//     } catch (err) {
//         console.log(err)
//     }
// })


// const connection_url= `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.hsckl.mongodb.net/<dbname>?retryWrites=true&w=majority`

// mongoose.connect(connection_url, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }, () => {
//     console.log("Mongoose Is Connected")
// })


// // app.get("/",(req,res)=> res.status(200).send("No hej!"))