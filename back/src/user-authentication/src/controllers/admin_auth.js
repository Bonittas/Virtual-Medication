const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const JWT_SECRET = process.env.JWT_SECRET || 'A3$$#';
const JWT_EXPIRES_IN = '1d';






exports.signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await Admin.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Invalid Credentials', field: 'email' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid Credentials', field: 'password' });
    }

    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    res.json({ token });
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

    req.user = await User.findById(decoded.user.id).select('-password');
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
