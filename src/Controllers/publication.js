const publication = require('../Models/publication');

const getPublications = (req, res) => {
    return res.status(200).send({
        message: 'send data from controlers'
    })
};

const savePublication = (req, res) => {
    //get data from body 
    let params = req.body;

    if (!params.text) {
        return res.status(400).send({
            status: 'error',
            message: 'Content empty in publication'
        })
    };

    let newPublication = new publication(params);
    newPublication.user = req.user.id;

    newPublication.save().then(publicationStore => {
        return res.status(200).send({
            status: 'success',
            message: 'Publication created',
            publicationStore
        })
    }).catch(error => {
        return res.status(400).send({
            status: 'error',
            message: 'publication not save'
        })
    })
};

module.exports = {
    getPublications,
    savePublication
}