const follow = require('../Models/follow');

const followUserIds = async (identityUserId) => {
    try {
        //get info follow
        let following = await follow.find({ 'user': identityUserId }).select({ 'followed': 1, '_id': 0 });

        let followers = await follow.find({ 'followed': identityUserId }).select({ 'user': 1, '_id': 0 });

        //process array identifiers
        let followingClean = [];

        following.forEach(follow => {
            followingClean.push(follow.followed);
        });

        let followerClean = [];

        followers.forEach(follows => {
            followerClean.push(follows.user);
        });

        return {
            following: followingClean,
            followers: followerClean
        }
    } catch (error) {
        return {};
    }
};

const followThisUser = async (identityUserId, profileUserId) => {
    //get info follow
    let following = await follow.findOne({ 'user': identityUserId , 'followed' : profileUserId}).select({ 'followed': 1, '_id': 0 });

    let followers = await follow.find({'user' : profileUserId, 'followed': identityUserId }).select({ 'user': 1, '_id': 0 });

    return {
        following,
        followers
    }
}

module.exports = {
    followUserIds,
    followThisUser,
}