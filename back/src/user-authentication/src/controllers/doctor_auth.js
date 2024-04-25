const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/Doctor');

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_here';
const JWT_EXPIRES_IN = '1d'; 
exports.signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: 'User already exists', field: 'email' });
    }

    user = new User({ name, email, password, verified: false });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    const payload = { user: { _id: user._id } }; // Ensure user object contains _id
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    res.json({ user: { _id: user._id }, token }); // Send user object with _id in the response
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).send('Server Error');
  }
};


// Modify completeProfile Controller:
exports.completeProfile = async (req, res) => {
  const userIdFromToken = req.user._id;
  const userIdFromParams = req.params.userId;
  const userIdFromBody = req.body.userId;

  if (userIdFromToken !== userIdFromParams || userIdFromToken !== userIdFromBody) {
    return res.status(403).json({ message: 'Unauthorized access. User ID mismatch.' });
  }

  try {
    // Your code for updating the user profile here
    res.status(200).json({ message: 'Profile completed successfully' });
  } catch (error) {
    console.error('Error completing profile:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};


exports.signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Invalid Credentials', field: 'email' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid Credentials', field: 'password' });
    }

    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    // Return user data along with token
    res.json({ token, user });
  } catch (error) {
    console.error('Error during signin:', error);
    res.status(500).send('Server Error');
  }
};


exports.verifyToken = async (req, res, next) => {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ message: 'Authorization denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user; // Store user data in request object
    next();
  } catch (error) {
    console.error('Error verifying token:', error);
    res.status(401).json({ message: 'Authorization denied. Invalid token.' });
  }
};
exports.getCurrentUser = async (req, res) => {
  try {
    const user = req.user;
    res.json({ user });
  } catch (error) {
    console.error('Error fetching current user:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};
