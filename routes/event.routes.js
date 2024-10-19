// routes/user.routes.js
const express = require('express');
const {createEvent, deleteEvent} = require("../controllers/event-controller.js")

const eventRouter = express.Router();

eventRouter.post('/sign-up', createEvent);
eventRouter.post('/sign-up', deleteEvent)

module.exports = { eventRouter };
