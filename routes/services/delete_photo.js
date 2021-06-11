const fs = require('fs')
const dirname = require('../../dirname')


const delete_photo = async (del) => {
    try {
        del = del.rows[0].image_url
        del = del.split('/')
        del = del[del.length - 1]

        let path = await dirname()
        path = `${path}\\uploads\\${del}`

        console.log(path)
        fs.unlinkSync(path)
        console.log("powinno usunąć ;)")
    } catch (err) {
        console.log(err)
    }

}


module.exports = delete_photo