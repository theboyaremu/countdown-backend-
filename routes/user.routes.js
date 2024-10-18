// routes/user.routes.js
const express = require('express');
const {createUser, signIn} = require("../controllers/user-controller.js")

const userRouter = express.Router();

userRouter.post('/sign-up', createUser);
userRouter.post('/sign-up', signIn)

module.exports = { userRouter };
