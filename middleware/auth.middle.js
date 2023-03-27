const jwt = require('jsonwebtoken')
require('dotenv').config()
const auth = (req,res,next)=>{
    
    const {token } = req.headers
    try {
        const decoded = jwt.verify(token,process.env.privateKey)

        if(decoded){
                req.body.userID=decoded.userID
            next()
        }else{

            res.status(400).send({"msg":"please login !"})
        }
       
    } catch (err) {
        res.status(400).send({"msg":"please login !"})
    }
}

module.exports=auth