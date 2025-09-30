const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = function(request , resposne , next ) {
    const token = request.headers['x-access-token'];
    if(!token){
        return resposne.status(401).send({
            message:'access denied need token to verify'
        })
    }
    try {
        const verify = jwt.verify(token,JWT_SECRET)
        
        next()
         
    }catch (err){
        resposne.status(400).send({
            message : err.message || ' error while trying to validate token'
        })
    }
}