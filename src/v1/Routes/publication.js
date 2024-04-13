const express = require('express');//import express
const router = express.Router();
const publicationController = require('../../Controllers/publication');


//*ROUTER PUBLICATION
router.get('/getpublications', publicationController.getPublications);//Get publications


module.exports = router;