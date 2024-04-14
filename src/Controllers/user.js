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
    }).then(async (users) => {
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
        userSave.save().then((userStored) => {
            return res.status(201).send({
                status: 'success',
                message: 'User register ok',
                userStored
            })
        }).catch(error => {
            return res.status(503).send({
                status: 'error',
                message: 'User register error'
            })
        });

    }).catch(error => {
        return res.status(error).json({
            status: 'error',
            message: 'error in consult users'
        })
    });
};

const userLogin = (req, res) => {
    //get data
    let params = req.body;

    if (!params.email || !params.password) {
        return res.status(401).send({
            status: 'error',
            message: 'user or password are empty'
        })
    }
    //find user exists
    user.findOne({ email: params.email }).select({ 'password': 0 }).then(userFromStorage => {
        if (userFromStorage === null) {
            return res.status(404).send({
                status: 'error',
                message: 'user dont found'
            })
        }

        //validate password
        console.log(userFromStorage);
        //give token 

        //give data user 
        return res.status(202).send({
            status: 'success',
            message: 'user login access',
            userFromStorage
        })

    })
}

module.exports = {
    getUsers,
    getUser,
    registerUser,
    userLogin
}