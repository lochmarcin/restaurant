const fs = require('fs')
const sharp = require('sharp')

const imageProcess = async (req) => {
    fs.access('./uploads', (err) => {
        if(err){
            fs.mkdirSync('./uploads')
        }
    })
    if(req.file == null){
        console.log("brak zdjęcia lub req.file == null")
        return null
    }
    const formatedName = req.file.originalname.split(' ').join('_')
    const fileName = new Date().toISOString().replace(/:/g, '-') + formatedName
    try {
        await sharp(req.file.buffer)
        .resize({width: 1000, height: null})
        .toFile('./uploads/' + fileName)
        .catch(err => {console.log(err)})
    } catch (err) {
        console.log('Error image while : ' + err)
    }

    return `http://127.0.0.1:5000/${fileName}`
    
}

module.exports = imageProcess