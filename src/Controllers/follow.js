const follow = require('../Models/follow');
const user = require('../Models/user');

const getFollows = (req, res) =>{
    return res.status(200).send({
        message: 'send data from controlers'
    })
};

const saveFollow = (req, res) => {
    //get data body
    const params = req.body;
    //get id
    const userIdentity = req.user;
    //create object follow
    let userToFollow = new follow({
        user: userIdentity.id,
        followed: params.followed
    });
    //save in db
    userToFollow.save().then(followStorage => {
        return res.status(200).send({
            status: 'success',
            identity: req.user,
            follow: followStorage
        })
    }).catch(error => {
        return res.status(400).send({
            status: 'error',
            message: 'follow incorrect'
        })
    });
};

module.exports = {
    getFollows,
    saveFollow
}