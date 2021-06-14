const db = require("../../db")

const moment = require('moment'); // require
moment().format();
// moment.defaultFormat = "YYYY-MM-DD HH:mm";

const check_date_time_reserwation = async (date_booking, time_booking) => {
    try {

        // console.log("time_booking: " + time_booking + " moment: " + moment().local().format("HH-mm"))
        // console.log("date_booking: " + date_booking + " moment: " + moment().local().format("YYYY-MM-D"))

        let correct = true
        // if (date_booking < moment().local().format("YYYY-MM-D")) {
        //     console.log("data większa :)")
        // }
        const response = await db.query("SELECT date_booking2, time_booking FROM reserwation WHERE id_user=1")
        // console.log(response.rows[0].date_booking2)
        console.log(response.rows[0])
        let data_wpisana = moment(date_booking).utc(true)
        let data_baza = moment(response.rows[0].date_booking2).utc(true)

        let time_wpisana = moment(time_booking, "HH:mm").utc(true)
        let time_baza = moment(response.rows[0].time_booking, "HH:mm").utc(true)
        // console.log("time wpisana:" + time_wpisana + " - time baza:" + time_baza)
        console.log(time_wpisana)
        console.log(time_baza)
        // console.log(baza)
        // console.log(data_wpisana.from(data_baza))
        console.log(time_wpisana.diff(time_baza, 'minutes'))




        // if (wpisana == baza) {
        //     console.log("to samo z bazy kurwa :D")
        // }
        // if (baza > wpisana)
        //     console.log("wpisana data większa od bazy")
        // else
        //     console.log("chuja")
        // if (baza < wpisana)
        //     console.log("wpisana data mniejsza od bazy ")
        // else
        //     console.log("chuja 2")
        // if (time_booking > moment().local().format("HH-mm")) {
        //     console.log("godzina większa :)")
        // }
        // else {
        //     console.log("chuja")
        // }
    } catch (err) {
        console.log(err)
    }


}

module.exports = check_date_time_reserwation