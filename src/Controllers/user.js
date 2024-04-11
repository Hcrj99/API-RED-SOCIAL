const user = (req, res) =>{
    return res.status(200).send({
        message: 'send data from controlers'
    })
}

module.exports = {
    user,
}