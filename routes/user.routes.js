const express = require('express');
const { createUser, signIn, getUserInfo } = require('../controllers/user-controller.js');

const userRouter = express.Router();

// Define route for user sign-up
userRouter.post('/sign-up', createUser);

// Define route for user sign-in
userRouter.post('/sign-in', signIn);

userRouter.get("/user/:id", getUserInfo)
module.exports =  userRouter ;
