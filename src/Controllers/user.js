const user = require('../Models/user');
const bcrypt = require('bcrypt');
const jwt = require('../Services/jwt');

const getUsers = (req, res) => {
    return res.status(200).send({
        message: 'send data from controlers',
        user: req.user
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
    user.findOne({ email: params.email }).then((user) => {
        if (user === null) {
            return res.status(404).send({
                status: 'error',
                message: 'user dont found'
            })
        }

        //validate password
        let pwd = bcrypt.compareSync(params.password, user.password);

        if (!pwd) {
            return res.status(401).send({
                status: 'error',
                message: 'incorret password'
            })
        }

        //get + give token 
        const token = jwt.generateToken(user);

        //give data user 
        return res.status(202).send({
            status: 'success',
            message: 'user login access',
            user: {
                id: user._id,
                name: user.name,
                nick: user.nick
            },
            token
        })
    })
}

module.exports = {
    getUsers,
    getUser,
    registerUser,
    userLogin
}