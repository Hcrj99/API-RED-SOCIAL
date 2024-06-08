const express = require('express');//import express
const router = express.Router();
const publicationController = require('../../Controllers/publication');
const check = require('../../Middlewares/auth');
const multer = require('multer');

//upload configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './src/Uploads/Publications/');
    },

    filename: (req, file, cb) => {
        cb(null, 'pub' + Date.now() + '-' + file.originalname);
    }
});

const uploads = multer({ storage });

//*ROUTER PUBLICATION
router.get('/getpublications/:id/:page?', publicationController.getUserPublications);//Get publications one user
router.post('/save', check.auth, publicationController.savePublication)//save publication
router.get('/detail/:id', check.auth, publicationController.detail);//get one publication
router.delete('/delete/:id', check.auth, publicationController.Eliminate);//Eliminate publication
router.post('/upload/:id', [check.auth, uploads.single('file0')], publicationController.upload);//upload documents
router.get('/media/:file', publicationController.media);//get media file
router.get('/feed/:page?', check.auth, publicationController.feed);//feed
router.get('/publications/:page?', check.auth, publicationController.getTotalPublications);//all publications red social

module.exports = router;