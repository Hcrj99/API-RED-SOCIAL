const publication = require('../Models/publication');

const getUserPublications = (req, res) => {
    //get id user
    const idUser = req.params.id;
    //control pages
    let page = 1;
    if (req.params.page) page = req.params.page;

    //find all publications
    const options = {
        limit: 5,
        page: page,
        populate: { path: 'user', select: '-password -__v -createAt -role' },
        sort: '-createat',
        select: '-__v'
    };

    publication.paginate({ 'user': idUser }, options).then(publications => {
        if (publications.totalDocs === 0) {
            return res.status(200).send({
                status: 'success',
                message: 'user has no publications'
            })
        };

        return res.status(200).send({
            status: 'success',
            users: publications.docs,
            page: publications.page,
            totalPublications: publications.totalDocs,
            totalPages: publications.totalPages
        })
    }).catch(error => {
        return res.status(404).send({
            status: 'error',
            message: 'user publications not founds'
        })
    });
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


const upload = (req, res) => {
    const publicationId = req.params.id;

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
    //save ind dbss
    publication.findOneAndUpdate({ 'user' : req.user.id , '_id': publicationId}, { file: req.file.filename }, { new: true }).then(fileSave => {
        return res.status(200).send({
            status: 'success',
            message: 'Upload correct',
            publication: fileSave,
            files: req.file
        })
    }).catch(error => {
        return res.status(400).send({
            status: 'error',
            message: 'error upload file publication'
        })
    })
};

module.exports = {
    getUserPublications,
    savePublication,
    detail,
    Eliminate,
    upload
}