const express = require('express');//import express
const router = express.Router();
const userController = require('../../Controllers/user');
const check = require('../../Middlewares/auth');


//*ROUTER USER
router.get('/users', check.auth, userController.getUsers);//Get users
router.post('/register', userController.registerUser);//Register user
router.post('/login', userController.userLogin);//Login user

module.exports = router;