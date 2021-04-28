const express = require('express')
const router = express.Router()
const bodyParser = require("body-parser")
const create = require("./createRestaurant")


router.use(bodyParser.json())
router.use(bodyParser.urlencoded({
    extended: true
}))

// Routes

router.use('/create', create)
router.use('/', (req, res) => { res.status(200).send("Witaj w Restauracjach") })

// Export
module.exports = router