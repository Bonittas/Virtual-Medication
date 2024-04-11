// doctorController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/Doctor');

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_here';
const JWT_EXPIRES_IN = '1d'; // Token expiry time (1 day)

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    user = new User({ name, email, password });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    res.json({ token });
  } catch (error) {
    console.error('Error during signup:', error); // Log error to terminal
    res.status(500).send('Server Error');
  }
};

exports.signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }

    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    res.json({ token });
  } catch (error) {
    console.error('Error during signin:', error); // Log error to terminal
    res.status(500).send('Server Error');
  }
};

exports.verifyToken = async (req, res, next) => {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if token doesn't exist
  if (!token) {
    return res.status(401).json({ message: 'Authorization denied. No token provided.' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Set user from token payload
    req.user = await User.findById(decoded.user.id).select('-password');
    next();
  } catch (error) {
    console.error('Error verifying token:', error); // Log error to terminal
    res.status(401).json({ message: 'Authorization denied. Invalid token.' });
  }
};

// Controller function to get current user information
exports.getCurrentUser = async (req, res) => {
  try {
    // Assuming the user data is stored in the request object after authentication middleware
    const user = req.user;

    res.json({ user });
  } catch (error) {
    console.error('Error fetching current user:', error); // Log error to terminal
    res.status(500).json({ message: 'Server Error' });
  }
};
