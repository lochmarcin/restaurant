const express = require('express')
const router = express.Router()
const db = require("../../db")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')

const authenticate = require('../services/authenticate')



router.use(cookieParser())


router.put("/update", async (req, res) => {
    authenticate(req, res)
    try {
        console.log(req.user.id)
        console.log(req.body.phone)
        const user = await db.query("UPDATE users SET phone=$1 WHERE id=$2", [req.body.phone, req.user.id])

    } catch (err) {
        console.log(err)
    }
})


router.get("/me", async (req, res) => {
    authenticate(req, res)
    try {
        const user = await db.query("SELECT * FROM users WHERE id=$1", [req.user.id])
        user.rows[0].phone == null || user.rows[0].phone == "" ? user.rows[0].phone = "Brak" : user.rows[0].phone
        res.status(200).send(user.rows[0])
    } catch (err) {
        console.log(err)
    }
})


router.get("/login", async (req, res) => {
    authenticate(req, res)

    console.log(req.user)
})

router.post('/register', async (req, res) => {
    try {
        const reg = /^[a-z\d]+[\w\d.-]*@(?:[a-z\d]+[a-z\d-]+\.){1,5}[a-z]{2,6}$/i;
        if (!reg.test(req.body.email.trim()))
            return res.status(401).send("email niepoprawny")

        const checkEmail = await db.query("SELECT email FROM users WHERE email = $1", [req.body.email])
        if (checkEmail.rows[0])
            res.status(500).send("email w użyciu")
        else {
            const hashedPassword = await bcrypt.hash(req.body.password, 10)
            const newUser = await db.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
                [req.body.name, req.body.email, hashedPassword])

            console.log(newUser.rows[0])
            res.status(200).send("Created")
        }
    } catch (err) {
        console.log(err)
    }
})

router.post("/login", async (req, res) => {
    try {
        const password = req.body.password
        const email = req.body.email

        const user = await db.query("SELECT * FROM users WHERE email=$1", [email])
        if (user.rows.length === 0)
            return res.status(401).send("email niepoprawny")

        const validPassword = await bcrypt.compare(password, user.rows[0].password)

        if (validPassword) {
            console.log(user.rows[0].id)
            const accessToken = jwt.sign({ id: user.rows[0].id }, process.env.TOKEN_SECRET, { expiresIn: "7d" })
            const refreshToken = jwt.sign({ id: user.rows[0].id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "30d" })

            const userToken = await db.query("UPDATE users SET refresh_token=$1 WHERE email=$2", [refreshToken, email])

            // IF COOKIE :)
            res.cookie('JWT', accessToken, {
                maxAge: 86400000,
                httpOnly: true
            })


            res.status(200).send({ accessToken, refreshToken })
        }
        else
            return res.status(401).send("Błędne hasło !")

    } catch (err) {
        console.log(err)
    }
})

router.post("/refresh", async (req, res) => {
    try {
        // console.log(req.body.token)
        const refreshToken = req.body.token
        if (!refreshToken)
            return res.status(401)

        const userToken = await db.query("SELECT refresh_token FROM users WHERE refresh_token=$1", [refreshToken])
        if (!userToken) return res.sendStatus(401)
        // console.log(userToken.rows[0].refresh_token)
        if (refreshToken != userToken.rows[0].refresh_token) return res.sendStatus(402)

        await jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)

    } catch (err) {
        console.log(err)
        return res.sendStatus(403)
    }
    const accessToken = jwt.sign({ id: req.body.id }, process.env.TOKEN_SECRET, { expiresIn: "30d" })

    res.status(200).send({ accessToken })

})

// function authenticate(req,res,next){
//     // ##### IF NOT COOKIE
//     // const authHeader = req.headers['authorization']
//     // const token = authHeader && authHeader.split(' ')[1]

//     // IF COOKIE :) 
//     const token = req.cookies.JWT

//     if(token === null) 
//         return res.sendStatus(401)
//     jwt.verify(token, process.env.TOKEN_SECRET, (err,user)=>{
//         if(err)
//             return res.sendStatus(403)
//         req.user = user
//         // console.log(user)
//         next()
//     })
// }

module.exports = router