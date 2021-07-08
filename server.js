require('dotenv').config({ path: '.env' })
const app = require('./app')
const express = require('express')

// const cors = require('cors')

// app.use(cors({
//     origin: process.env.URL_FRONT,
//     credentials: true
// }))

app.use(express.static('uploads'))

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Serwer działa na porcie ${port}`))


