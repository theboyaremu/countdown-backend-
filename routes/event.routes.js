// routes/user.routes.js
const express = require('express');
const router = express.Router();
const {createEvent, deleteEvent} = require("../controllers/event-controller.js")

const userRouter = express.Router();

userRouter.post('/sign-up', createEvent);
userRouter.post('/sign-up', deleteEvent)

module.exports = { userRouter };
