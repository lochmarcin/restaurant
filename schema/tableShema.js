const mongoose = require('mongoose')

const restaurant = new mongoose.Schema({
    numberTable : number,
    img_Url: String,
    IloscMiejsc: number
    
})

module.exports = mongoose.model("Restaurant",resModel)