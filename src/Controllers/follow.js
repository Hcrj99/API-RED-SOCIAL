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

const unfollow = (req, res) => {
    //get id user identify
    const userIdentity = req.user.id;
    //get id user to unfollow
    const followedId = req.params.id;
    //find id user 
    follow.findOneAndDelete({
        'user': userIdentity,
        'followed': followedId
    }).then(userFollowDelete => {
        return res.status(200).send({
            status: 'success',
            message: 'unfollow user: ',
            user: userFollowDelete
        })
    }).catch(error => {
        return res.status(400).send({
            status: 'error',
            message: 'unfollow process error'
        })
    });
};

const following = (req, res) => {
    //get id user loged
    let userId = req.user.id;
    //get id by parameter + page
    if(req.params.id) userId = req.params.id;
    let page = 1;
    if(req.params.page) page = req.params.page;
    //user to page
    const options = {
        limit: 5,
        page: page,
        populate: {path : 'user followed', select:'-password -role -__v'}
    }
    //find follows
    follow.paginate({}, options).then(follows  => {
        return res.status(200).send({
            status: 'success',
            follows: follows.docs,
            total: follows.totalDocs,
            totalpages: follows.totalPages
        })
    }).catch(error => {
        return res.status(400).send({
            status: 'error',
            message: 'error find users'
        })
    });
};

const followed = (req, res) => {
    return res.status(200).send({
        status: 'success',
        message: 'followed: ',
    })
};

module.exports = {
    getFollows,
    saveFollow,
    unfollow,
    following,
    followed
}