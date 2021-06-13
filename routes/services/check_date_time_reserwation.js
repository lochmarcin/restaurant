const db = require("../../db")

const moment = require('moment'); // require
moment().format();

const check_date_time_reserwation = (date_booking, time_booking) => {
    console.log("time_booking: " + time_booking + " moment: " + moment().local().format("HH-mm"))
    console.log("date_booking: " + date_booking + " moment: " + moment().local().format("YYYY-MM-D"))

    let correct = true
    if (date_booking > moment().local().format("YYYY-MM-D")) {
        console.log("data większa :)")
    }
    if (date_booking == "2021-06-30") {
        console.log("data == 2021-06-30")
    }
    else {
        console.log("chuja")
    }
    if (time_booking > moment().local().format("HH-mm")) {
        console.log("godzina większa :)")
    }
    else {
        console.log("chuja")
    }


}

module.exports = check_date_time_reserwation