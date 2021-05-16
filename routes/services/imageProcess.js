const fs = require('fs')
const sharp = require('sharp')

const imageProcess = async (req) => {
    fs.access('./uploads', (err) => {
        if(err){
            fs.mkdirSync('./uploads')
        }
    })
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

    return `http://localhost:5000/${fileName}`
    
}

module.exports = imageProcess