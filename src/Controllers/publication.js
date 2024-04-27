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

const detail = (req, res) => {
    //get id publication from url 
    const idPublication = req.params.id;

    publication.findById(idPublication).then(publicationStorage => {
        return res.status(200).send({
            status: 'success',
            message: 'publication: ',
            publication: publicationStorage
        })
    }).catch(error => {
        return res.status(400).send({
            status: 'error',
            message: 'publication not exists'
        })
    });
};

const Eliminate = (req, res) => {
    //get id from url
    const idPublication = req.params.id;
    //delete publication

    publication.findOneAndDelete(idPublication).then(publicationDeleted => {
        return res.status(200).send({
            status: 'success',
            message: 'publication eliminated ok'
        })
    }).catch(error => {
        return res.status(400).send({
            status: 'error',
            message: 'publication not deleted'
        })
    });

};

module.exports = {
    getPublications,
    savePublication,
    detail,
    Eliminate
}