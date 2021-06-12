const db = require("../../db")

const moment = require('moment'); // require
moment().format(); 

const check_date_time_reserwation = (date_booking, time_booking) => {
    console.log(time_booking)
    console.log(date_booking)

    let correct = true
    if(date_booking > moment().local().format("YYYY-MM-D")){
        console.log("data większa :)")
    }
    else{
        console.log("chuja")
    }
    
}

module.exports = check_date_time_reserwation