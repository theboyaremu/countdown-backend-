const express = require('express');
const { createEvent, deleteEvent, getEvents, getEventById } = require('../controllers/event-controller.js');

const eventRouter = express.Router();

// Define route for creating an event
eventRouter.post('/create-event', createEvent);

// Define route for deleting an event
eventRouter.delete('/delete-event/:id', deleteEvent); 

eventRouter.get('/events/:id', getEvents)
eventRouter.get('/event/:id', getEventById); 


module.exports =  eventRouter ;
