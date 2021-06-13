const db = require("../../db")

const moment = require('moment'); // require
moment().format();

const check_date_time_reserwation = async (date_booking, time_booking) => {
    try {

        console.log("time_booking: " + time_booking + " moment: " + moment().local().format("HH-mm"))
        console.log("date_booking: " + date_booking + " moment: " + moment().local().format("YYYY-MM-D"))

        let correct = true
        if (date_booking > moment().local().format("YYYY-MM-D")) {
            console.log("data większa :)")
        }
        const response = await db.query("SELECT date_booking FROM reserwation WHERE id_user=1")
        console.log(response.rows[0].date_booking)
        if (date_booking == response.rows[0].date_booking) {
            console.log("to samo z bazy kurwa :D")
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
    } catch (err) {
        console.log(err)
    }


}

module.exports = check_date_time_reserwation