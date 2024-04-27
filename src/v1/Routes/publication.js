const express = require('express');//import express
const router = express.Router();
const publicationController = require('../../Controllers/publication');
const check = require('../../Middlewares/auth');


//*ROUTER PUBLICATION
router.get('/getpublications', publicationController.getPublications);//Get publications
router.post('/save', check.auth, publicationController.savePublication)//save publication
router.get('/detail/:id', check.auth, publicationController.detail);//get one publication


module.exports = router;