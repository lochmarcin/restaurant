const mongoose = require('mongoose')

const resModel = new mongoose.Schema({
    name: String,
    about: String,
    type_restaurant: String,
    logo_url: String,
    image_url: String,
    adress: String,
    locality: String,
    contact: String,
    nip:String,
    number_of_tables: Number,
    open_hour:Number,
    close_hour:Number
})

module.exports = mongoose.model("Restaurant",resModel)