const express = require('express');//import express
const router = express.Router();
const userController = require('../../Controllers/user');
const check = require('../../Middlewares/auth');


//*ROUTER USER
router.get('/listprofiles/:page?', check.auth, userController.getUsers);//Get users
router.post('/register', userController.registerUser);//Register user
router.post('/login', userController.userLogin);//Login user
router.get('/profile/:id', check.auth, userController.getUser);//get user

module.exports = router;