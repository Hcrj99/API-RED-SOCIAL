const user = require('../Models/user');
const bcrypt = require('bcrypt');

const getUsers = (req, res) => {
    return res.status(200).send({
        message: 'send data from controlers'
    })
};

const getUser = (req, res) => {

};

const registerUser = (req, res) => {
    //get data
    let params = req.body;
    //correct data + validation
    if (!params.name || !params.email || !params.password || !params.nick) {
        return res.status(400).json({
            status: 'error',
            message: 'Validation data incorrect need more Data'
        });
    };

    //duplicate user control
    user.find({
        $or: [
            { email: params.email.toLowerCase() },
            { nick: params.nick.toLowerCase() }
        ]
    }).then(async(users) => {
        if (users && users.length >= 1) {
            return res.status(200).send({
                status: 'success',
                message: 'the user exists'
            })
        }
        //Crypt password
        let pwd = await bcrypt.hash(params.password, 10);
        params.password = pwd;

        let userSave = new user(params);

        //save user in db
        

        return res.status(200).json({
            status: 'success',
            message: 'action register users',
            userSave
        });

    }).catch(error => {
        return res.status(error).json({
            status: 'error',
            message: 'error in consult users'
        })
    });
};

module.exports = {
    getUsers,
    getUser,
    registerUser
}