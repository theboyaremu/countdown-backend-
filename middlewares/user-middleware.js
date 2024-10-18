const { User } = require('../models'); 

const fetchUser = async (req, res, next) => {
    const userId = req.query.userId || req.header('userId'); // User ID passed via query or header

    if (!userId) {
        return res.status(400).json({ error: 'No user ID provided' });
    }

    try {
        // Find the user in the database using the userId
        const user = await User.findByPk(userId); 

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Attach the user to the request object
        req.user = user;

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        console.error('Error fetching user:', error);
        return res.status(500).json({ error: 'Server error, failed to fetch user' });
    }
};

module.exports = fetchUser;