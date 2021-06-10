const words = require("./words")


const bad_words = (zdanie) => {
    // console.log(words)
    let bad_word = false
    zdanie = zdanie.split(' ')
    zdanie.forEach(element => {
        if (words.includes(element)) {
            bad_word = true
        }
    });
    if (bad_word)
        return true
    else
        return false
}

module.exports = bad_words