// controllers/eventController.js

const { Event } = require('../config/db.js'); // Adjust the import according to your structure

exports.createEvent = async (req, res) => {
    const { eventName, eventDate, eventTime, userId } = req.body;

    try {
        const newEvent = await Event.create({
            eventName,
            eventDate,
            eventTime,
            userId
        });
        return res.status(201).json({
            message: 'Event created successfully',
            event: newEvent
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to create event' });
    }
};
exports.deleteEvent = async (req, res) => {
    const { id } = req.params; // Assuming the event ID is passed in the URL
    const userId = req.user.id; // Assuming the user ID is stored in req.user (usually after authentication middleware)

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