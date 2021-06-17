const db = require("../../db")

const moment = require('moment'); // require
moment().format();
// moment.defaultFormat = "YYYY-MM-DD HH:mm";

const check_date_time_reserwation = async (date_booking, time_booking, res) => {
    try {

        // console.log("time_booking: " + time_booking + " moment: " + moment().local().format("HH-mm"))
        // console.log("date_booking: " + date_booking + " moment: " + moment().local().format("YYYY-MM-D"))

        let correct = true
        // if (date_booking < moment().local().format("YYYY-MM-D")) {
        //     console.log("data większa :)")
        // }

        let data_wpisana = moment(date_booking).utc(true)
        console.log(data_wpisana.day())

        const response = await db.query("SELECT * FROM open_time WHERE id_rest=1")
        console.log(response.rows[0])


        switch (data_wpisana.day()) {
            case 1:
                let time_baza_open = moment(response.rows[0].mon_open, "HH:mm").utc(true)
                let time_baza_close = moment(response.rows[0].mon_close, "HH:mm").utc(true)
                let time_wpisana = moment(time_booking, "HH:mm").utc(true)

                let diff = time_baza_close.diff(time_wpisana, 'minutes')
                console.log(diff)
                console.log(time_baza_open > time_wpisana)
                console.log(time_baza_close <= time_wpisana)
                console.log(time_baza_open < time_wpisana && time_wpisana >= "00:00")
                console.log(time_baza_close <= time_wpisana && time_wpisana <= "00:00")

                if (response.rows[0].mon_open == "00:00" && response.rows[0].mon_close == "00:00")
                    res.status(300).send("Restauracja w ten dzień jest zamknięta")
                else if (diff < 60 && diff > 0)
                    res.status(300).send("Możesz złozyć rezerwację przynajmniej godzinę przed zamknięciem rezerwacji")
                else if (time_baza_open > time_wpisana && time_baza_close <= time_wpisana)
                    res.status(300).send("Musisz złożyć rezerwację w godzinach otwarcia restauracji i przynajmniej godzinę przed jej zamknięciem")
                else
                    res.status(300).send("Przeszło :)")

                break;

            default:
                break;
        }


        // console.log(response.rows[0])

        // let data_baza = moment(response.rows[0].date_booking2).utc(true)


        // let time_wpisana = moment(time_booking, "HH:mm").utc(true)
        // console.log("time wpisana:" + time_wpisana + " - time baza:" + time_baza)
        // console.log(time_wpisana)
        // console.log(time_baza)

        // console.log(baza)
        // console.log(data_wpisana.from(data_baza))

        // console.log(time_wpisana.diff(time_baza, 'minutes'))




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