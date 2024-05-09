const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/Doctor');
const path = require('path');
const fs = require('fs');
const Notification = require("../../models/doctorNotification")
const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_here';
const JWT_EXPIRES_IN = '1d'; 

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: 'User already exists', field: 'email' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = await User.create({ name, email, password: hashedPassword, verified: false });

    const payload = { user: { _id: user._id } };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    res.json({ user: { _id: user._id }, token });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Modify the completeDetails controller
exports.completeDetails = async (req, res) => {
  try {
    // Check if details are provided in the request body
    if (!req.body.details) {
      return res.status(400).json({ message: 'User details are required' });
    }

    // Parse details from request body
    const details = JSON.parse(req.body.details);
    const { 
      name, 
      medicalSpeciality, 
      age, 
      gender, 
      degree, 
      regNumber, 
      yearOfReg, 
      stateMedicalCouncil, 
      experience, 
      address1, 
      address2, 
      city, 
      state, 
      pincode, 
      country, 
      startTime, 
      endTime 
    } = details; 

    // Update user details in the database
    const userId = req.user._id;
    const updatedUserFields = { 
      name, 
      medicalSpeciality, 
      age, 
      gender, 
      degree, 
      regNumber, 
      yearOfReg, 
      stateMedicalCouncil, 
      experience, 
      address1, 
      address2, 
      city, 
      state, 
      pincode, 
      country, 
      startTime, 
      endTime 
    };

    // If profile picture uploaded, update imageUrl field in user document
    if (req.file) {
      // Extract the file name from req.file.path and store it in imageUrl
      updatedUserFields.imageUrl = req.file.filename;
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updatedUserFields, { new: true });

    res.json({ user: updatedUser });
  } catch (error) {
    console.error('Error completing user details:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};
exports.uploadFile = async (req, res) => {
  try {
    // File path is available in req.file.path
    const filePath = req.file.path;
    // Save filePath to database or use as needed
    res.json({ filePath });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.uploadImage = async (req, res) => {
  try {
    // Image URL is available in req.file.path
    const imageUrl = req.file.path;
    // Update imageUrl field in user document
    const userId = req.user._id;
    await User.findByIdAndUpdate(userId, { imageUrl });
    res.json({ imageUrl });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};


exports.getUserData = async (req, res) => {
  try {
    const userId = req.user._id;
    const userData = await User.findById(userId);
    res.json({ userData });
  } catch (error) {
    console.error('Error fetching user data:', error);
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

    const payload = { user: { _id: user._id } };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    res.json({ token, user });
  } catch (error) {
    console.error('Error during signin:', error);
    res.status(500).send('Server Error');
  }
};

exports.verifyToken = (req, res, next) => {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ message: 'Authorization denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (error) {
    console.error('Error verifying token:', error);
    return res.status(401).json({ message: 'Authorization denied. Invalid token.' });
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
exports.getUserData = async (req, res) => {
  try {
    const userId = req.user._id;
    const userData = await User.findById(userId);
    res.json({ userData });
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};
// controllers/profileController.js

exports.updateUserData = async (req, res) => {
  try {
    const userId = req.user._id;
    const updatedData = req.body;
    const user = await User.findByIdAndUpdate(userId, updatedData, { new: true });
    res.json({ user });
  } catch (error) {
    console.error('Error updating user data:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};
exports.updateProfile = async (req, res) => {
  try {
    // Extract updated profile data from request body
    const {
      name,
      email,
      medicalSpeciality,
      age,
      gender,
      degree,
      regNumber,
      yearOfReg,
      stateMedicalCouncil,
      experience,
      address1,
      address2,
      city,
      state,
      pincode,
      country,
      startTime,
      endTime
    } = req.body;

    // Find the user by ID
    let user = await User.findById(req.user._id);

    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user's profile fields
    user.name = name;
    user.email = email;
    user.medicalSpeciality = medicalSpeciality;
    user.age = age;
    user.gender = gender;
    user.degree = degree;
    user.regNumber = regNumber;
    user.yearOfReg = yearOfReg;
    user.stateMedicalCouncil = stateMedicalCouncil;
    user.experience = experience;
    user.address1 = address1;
    user.address2 = address2;
    user.city = city;
    user.state = state;
    user.pincode = pincode;
    user.country = country;
    user.startTime = startTime;
    user.endTime = endTime;
    // Update other profile fields as needed

    // Save the updated user
    user = await user.save();

    // Send back the updated user object
    res.json(user);
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};
exports.getNotifications = async (req, res) => {
  const userId = req.user._id;
  try {
    const notifications = await Notification.find({ recipient: userId }).sort({ createdAt: -1 });
    res.json({ notifications });
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};
exports.logout = async (req, res) => {
  try {
    res.clearCookie('jwt'); 
    res.json({ message: 'Logout successful' });
  } catch (error) {
    console.error('Error during logout:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};