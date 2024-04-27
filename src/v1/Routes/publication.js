const express = require('express');//import express
const router = express.Router();
const publicationController = require('../../Controllers/publication');
const check = require('../../Middlewares/auth');


//*ROUTER PUBLICATION
router.get('/getpublications/:id/:page?', publicationController.getUserPublications);//Get publications one user
router.post('/save', check.auth, publicationController.savePublication)//save publication
router.get('/detail/:id', check.auth, publicationController.detail);//get one publication
router.delete('/delete/:id', check.auth, publicationController.Eliminate);//Eliminate publication


module.exports = router;