const bcrypt = require('bcrypt');
const { User } = require('../config/db'); // Import your User model

// Number of salt rounds for bcrypt (higher = more secure, but slower)
const SALT_ROUNDS = 10;

// Create User (Sign Up)
const createUser = async (req, res) => {
  const { username, email, password } = req.body;
  

  try {
    // Check if the email is already in use
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already in use.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // Create the new user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword, // Store the hashed password
    });

    return res.status(201).json({ message: 'User created successfully.', user: newUser });
  } catch (error) {
    console.error('Error creating user:', error);
    return res.status(500).json({ error: 'Failed to create user.' });
  }
};

// Sign In (Login)
const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    // Compare the provided password with the hashed password stored in the database
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    // If login is successful, set userId in the response header and return success message
    res.setHeader('userId', user.id); // Set userId in the header

    return res.status(200).json({ 
      message: 'Signed in successfully.', 
      userId: user.id, // Include user ID in the response body as well
      username: user.username,
      email: user.email 
    });
  } catch (error) {
    console.error('Error signing in:', error);
    return res.status(500).json({ error: 'Failed to sign in.' });
  }
};
const getUserInfo = async (req, res) => {
  const { id } = req.params; 

  if (!id) {
    return res.status(400).json({ error: 'User ID is required.' });
  }

  try {
    // Find the user by their ID
    const user = await User.findByPk(id, {
      attributes: ['id', 'username', 'email'] // Only select necessary fields
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    return res.status(200).json({ 
      userId: user.id, 
      username: user.username, 
      email: user.email 
    });
  } catch (error) {
    console.error('Error fetching user info:', error);
    return res.status(500).json({ error: 'Failed to fetch user info.' });
  }
};


module.exports = {
  createUser,
  signIn,
  getUserInfo
};