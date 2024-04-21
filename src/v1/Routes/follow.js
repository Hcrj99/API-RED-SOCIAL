const express = require('express');//import express
const router = express.Router();
const followController = require('../../Controllers/follow');
const check = require('../../Middlewares/auth');


//*ROUTER FOLLOW
router.get('/getfollows', followController.getFollows);//Get follows
router.post('/save', check.auth, followController.saveFollow);//follow user


module.exports = router;