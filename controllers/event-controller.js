// controllers/eventController.js

const { Event } = require('../config/db.js'); // Adjust the import according to your structure

exports.createEvent = async (req, res) => {
    const { eventName, eventDate, eventTime, userId } = req.body;
    console.log(req.body)
    // Validate the input fields
    if (!eventName || !eventDate || !eventTime || !userId) {
      return res.status(400).json({ error: 'All fields are required.' });
    }
  
    try {
      const newEvent = await Event.create({
        eventName,
        eventDate,
        eventTime,
        userId: parseInt(userId) // Ensure userId is an integer
      });
  
      return res.status(201).json({
        message: 'Event created successfully',
        event: newEvent
      });
    } catch (error) {
      console.error('Error creating event:', error);
      return res.status(500).json({ error: 'Failed to create event' });
    }
  };
  
exports.deleteEvent = async (req, res) => {
    const { id } = req.params; 
    const userId = req.user.id; 

    try {
        // Find the event by its ID
        const event = await Event.findByPk(id);
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }

        // Check if the user is the owner of the event
        if (event.userId !== userId) {
            return res.status(403).json({ error: 'You are not authorized to delete this event' });
        }

        // Delete the event
        await event.destroy();
        return res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to delete event' });
    }
};

// Get events by userId
exports.getEvents = async (req, res) => {
    const userId = req.query.userId; // Extract userId from the query parameters

    // Check if userId was provided
    if (!userId) {
        return res.status(400).json({ error: 'User ID is required to fetch events.' });
    }

    try {
        // Find all events for the given userId
        const events = await Event.findAll({
            where: { userId }, // Filter events by userId
            order: [['eventDate', 'ASC'], ['eventTime', 'ASC']], // Sort by eventDate and eventTime
        });

        // Check if no events were found
        if (events.length === 0) {
            return res.status(404).json({ message: 'No events found for this user.' });
        }

        // Return the found events
        return res.status(200).json({ events });
    } catch (error) {
        console.error('Error fetching events:', error);
        return res.status(500).json({ error: 'Failed to fetch events.' });
    }
};

// Get a specific event by ID
exports.getEventById = async (req, res) => {
    const { id } = req.params; // Extract the event ID from the URL parameters

    try {
        // Find the event by its ID
        const event = await Event.findByPk(id);

        // Check if the event exists
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }

        // Return the found event
        return res.status(200).json({ event });
    } catch (error) {
        console.error('Error fetching event:', error);
        return res.status(500).json({ error: 'Failed to fetch event' });
    }
};
