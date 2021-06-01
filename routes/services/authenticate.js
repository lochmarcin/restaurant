const jwt  = require('jsonwebtoken')
const cookieParser = require('cookie-parser')

function authenticate(req,res,next){
    // ##### IF NOT COOKIE
    // const authHeader = req.headers['authorization']
    // const token = authHeader && authHeader.split(' ')[1]

    // IF COOKIE :) 
    const token = req.cookies.JWT

    if(token === null) 
        return res.sendStatus(401)
    jwt.verify(token, process.env.TOKEN_SECRET, (err,user)=>{
        if(err)
            return res.sendStatus(403)
        req.user = user
        // console.log(user)
        return(req.user)
        // next()
    })
}

module.exports = authenticate