const express = require('express');//import express
const router = express.Router();
const followController = require('../../Controllers/follow');


//*ROUTER FOLLOW
router.get('/getfollows', followController.getFollows);//Get follows


module.exports = router;