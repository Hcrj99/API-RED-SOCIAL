const getFollows = (req, res) =>{
    return res.status(200).send({
        message: 'send data from controlers'
    })
};

const getFollow = (req, res) => {

};

module.exports = {
    getFollows,
    getFollow
}