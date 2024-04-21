const express = require('express');//import express
const router = express.Router();
const followController = require('../../Controllers/follow');
const check = require('../../Middlewares/auth');


//*ROUTER FOLLOW
router.get('/getfollows', followController.getFollows);//Get follows
router.post('/save', check.auth, followController.saveFollow);//follow user
router.delete('/unfollow/:id', check.auth, followController.unfollow)//delete follow
router.get('/following/:id?/:page?', check.auth, followController.following);//List of follows of user loged
router.get('/followed/:id?/:page?', check.auth, followController.followed);//List of follows to the user loged


module.exports = router;