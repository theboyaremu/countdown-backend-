const express = require('express');
const { createEvent, deleteEvent } = require('../controllers/event-controller.js');

const eventRouter = express.Router();

// Define route for creating an event
eventRouter.post('/create-event', createEvent);

// Define route for deleting an event
eventRouter.delete('/delete-event', deleteEvent); 

module.exports =  eventRouter ;
