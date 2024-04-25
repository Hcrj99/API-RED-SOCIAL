const publicaation = require('../Models/publication');

const getPublications = (req, res) =>{
    return res.status(200).send({
        message: 'send data from controlers'
    })
};

const getPublication = (req, res) => {

};

module.exports = {
    getPublications,
    getPublication
}