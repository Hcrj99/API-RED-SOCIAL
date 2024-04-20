const express = require('express');//import express
const router = express.Router();
const userController = require('../../Controllers/user');
const check = require('../../Middlewares/auth');
const multer = require('multer');

//upload configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './src/Uploads/Avatars/');
    },

    filename: (req, file, cb) => {
        cb(null, 'avatar' + Date.now() + '-' + file.originalname);
    }
});

const uploads = multer({ storage });


//*ROUTER USER
router.get('/listprofiles/:page?', check.auth, userController.getUsers);//Get users
router.post('/register', userController.registerUser);//Register user
router.post('/login', userController.userLogin);//Login user
router.get('/profile/:id', check.auth, userController.getUser);//get user
router.put('/update', check.auth, userController.updateUser);//Update user
router.post('/upload', [check.auth, uploads.single('file0')], userController.upload);//upload documents

module.exports = router;