const express = require('express');//import express
const router = express.Router();
const userController = require('../../Controllers/user');


//*ROUTER USER
router.get('/getusers', userController.getUsers);//Get users
router.post('/register', userController.registerUser);//Register user


module.exports = router;