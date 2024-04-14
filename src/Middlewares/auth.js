const jwt = require('jwt-simple');
const moment = require('moment');

//autentication fuction
const libjwt = require('../Services/jwt'); 
const secretKey = libjwt.secretKey;

//varificate the autentication  MIDDLEWARE
exports.auth = (req, res, next) => {
    //verificate header comprobation to auth 
    if(!req.headers.authorization){
        return res.status(403).send({
            status: 'error',
            message:'the request dont have header of authentication'
        })
    };

    //decode token 
    let token = req.headers.authorization.replace(/['"]+/g, '');//*clean token
    try{
        let payload = jwt.decode(token, secretKey);
        
        //verificate expiration token 
        if(payload.exp <= moment().unix()){
            return res.status(401).send({
                status: 'error',
                message: 'token expired'
            })
        }
        //add data user to req
        req.user = payload;
    }
    catch(error){
        return res.status(404).send({
            status: 'error',
            message: 'invalid token'
        })
    }
    //pass ejecution action
    next();
}

