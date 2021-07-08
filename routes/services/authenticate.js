const jwt = require('jsonwebtoken')

function authenticate(req, res, next) {

    const token = req.cookies.JWT

    if (token === null)
        return res.sendStatus(401)
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if (err)
            return res.sendStatus(403)
        req.user = user

        return (req.user)

    })
}

module.exports = authenticate