const user = require('../Models/user');
const bcrypt = require('bcrypt');
const jwt = require('../Services/jwt');
const moongosePagination = require('mongoose-pagination');
const fs = require('fs');
const path = require('path');

const getUsers = (req, res) => {
    //Control page 
    let page = 1;
    if (req.params.page) {
        page = req.params.page;
    }
    //moongose pagination
    page = parseInt(page);

    let itemsPage = 5;

    user.find().sort('_id').paginate(page, itemsPage).then((users) => {
        if (!users) {
            return res.status(404).send({
                status: 'error',
                message: 'users not found'
            })
        };
        return res.status(200).send({
            status: 'success',
            message: 'List of users',
            page,
            itemsPage,
            users,
        })
    }).catch(error => {
        return res.status(404).send({
            status: 'error',
            message: 'users not found'
        })
    });
};

const getUser = (req, res) => {
    //get param id of user by url
    const id = req.params.id;
    //get data user

    user.findById(id).select({ password: 0, role: 0 }).then(userProfile => {
        return res.status(200).send({
            status: 'success',
            userProfile
        })
    }).catch(error => {
        return res.status(404).json({
            status: 'error',
            message: 'user not found'
        })
    });

    //return result
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
};


const updateUser = (req, res) => {
    //get info of the user to update
    let userIdentity = req.user;
    let userUpdate = req.body;

    delete userIdentity.iat;
    delete userIdentity.exp;
    delete userIdentity.role;
    delete userIdentity.image;

    //check if the user exists
    user.find({
        $or: [
            { email: userUpdate.email.toLowerCase() },
            { nick: userUpdate.nick.toLowerCase() }
        ]
    }).then(async (users) => {
        let userIsset = false;
        users.forEach(user => {
            console.log(user._id);
            console.log(userIdentity.id);
            if (JSON.stringify(user._id) !== JSON.stringify(userIdentity.id)) {
                userIsset = true;
            }
        });

        if (userIsset) {
            return res.status(200).send({
                status: 'success',
                message: 'the user exists'
            })
        };

        //Crypt password
        if (userUpdate.password) {
            let pwd = await bcrypt.hash(userUpdate.password, 10);
            userUpdate.password = pwd;
        }

        //find + update
        user.findByIdAndUpdate(userIdentity.id, userUpdate, { new: true }).then(userUpdated => {
            return res.status(200).send({
                status: 'success',
                message: 'user update',
                user: userUpdated
            })
        }).catch(error => {
            return res.status(400).send({
                status: 'error',
                message: 'user not update'
            })
        })
    }).catch(error => {
        return res.status(error).json({
            status: 'error',
            message: 'error in consult users'
        })
    });
};

const upload = (req, res) => {

    //get image if exists
    if (!req.file) {
        return res.status(404).send({
            status: 'error',
            message: 'Not recive file'
        })
    };

    //get name document
    let image = req.file.originalname;

    //get extension + verify + save in db
    const imageSplit = image.split('\.');
    const extension = imageSplit[1];

    if (extension !== 'png' && extension !== 'jpg' && extension !== 'jpeg' && extension !== 'gif') {

        const filePath = req.file.path;
        const fileDelete = fs.unlinkSync(filePath);

        return res.status(400).json({
            status: 'error',
            message: 'Incorrect extension'
        })
    };
    //save ind db
    user.findOneAndUpdate({_id: req.user.id}, { image: req.file.filename }, { new: true }).then(fileSave => {
        return res.status(200).send({
            status: 'success',
            message: 'Upload correct',
            user: fileSave,
            files: req.file
        })
    }).catch(error => {
        return res.status(400).send({
            status: 'error',
            message: 'error upload avatar'
        })
    })
};

const getAvatar = (req, res) => {
    //get parameter from  url
    const file = req.params.file;
    //get path
    const filePath = './src/Uploads/Avatars/'+file;
    //if the file exists 
    fs.stat(filePath, (error, exists) => {
        if(error){
            return res.status(404).send({
                status: 'error',
                message: 'Not found the file'
            })
        }

        return res.sendFile(path.resolve(filePath));
    });
};

module.exports = {
    getUsers,
    getUser,
    registerUser,
    userLogin,
    updateUser,
    upload,
    getAvatar
}