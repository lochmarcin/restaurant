const express = require('express')
const router = express.Router()

router.post("/add_user", async (req,res)=>{
    try {
        console.log("req.body")
    } catch (err) {
        console.log(err.message)
    }
})

module.exports = router