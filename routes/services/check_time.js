const check_time = (time,res) => {
    // console.log(words)
    const entries = Object.entries(time)
    // console.log(entries[1][1].length)
    // let time = entries[1][1].split(":")
    // if(time[0] < 0 || time[0] > 24 || time[1] < 0 || time[1] > 59 )
    //     console.log("poza zakresem")
    // Zmień na i = 0 !!!
    console.log(entries)
    let correct = true
    for(let i=0;i<entries.length;i++){
        if(entries[i][1]==null)
            entries[i][1]="00:00"
        if(entries[i][1].includes(":") != true || entries[i][1].length != 5)
            correct = false
        let time = entries[i][1].split(":")
        if(time[0] < 0 || time[0] > 24 || time[1] < 0 || time[1] > 59 )
            correct = false
    }
    if(correct == false){
        console.log("Błędne godziny! Poprawnie np. 12:30")
        res.send("Błędne godziny! Poprawnie np. 12:30")
        return false
    }
    else
        return true
}

module.exports = check_time