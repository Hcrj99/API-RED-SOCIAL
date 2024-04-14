const jwt = require('jwt-simple');//Import jwt
const moment = require('moment');//Import moment

//secret key
const secretKey = 'SeCRET_keY_ApI_RED_sociAL_98674563';

//function to create tokens
const generateToken = (user) => {
    const payload = {
        id: user._id,
        name: user.name,
        surname: user.surname,
        nick: user.nick,
        email: user.email,
        role: user.role,
        image: user.image,
        iat: moment().unix(),
        exp: moment().add(30,'days').unix()
    }

    //give token
    return jwt.encode(payload, secretKey);
}

module.exports = {
    generateToken,
    secretKey
}