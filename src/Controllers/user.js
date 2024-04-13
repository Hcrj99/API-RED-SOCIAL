const getUsers = (req, res) => {
    return res.status(200).send({
        message: 'send data from controlers'
    })
};

const getUser = (req, res) => {

};

module.exports = {
    getUsers,
    getUser
}