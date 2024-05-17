const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/Patient');
const Doctor = require('../models/Doctor');
const Appointment = require("../models/appointmetSchema")
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

exports.logout = async (req, res) => {
  try {
    res.clearCookie('jwt'); 
    res.json({ message: 'Logout successful' });
  } catch (error) {
    console.error('Error during logout:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};
exports.getCurrentUser = async (req, res) => {
  try {
    // Assuming 'req.user' contains the authenticated user data
    const userId = req.user._id;

    const userDetails = await User.findById(userId);

    if (!userDetails) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ user: userDetails });
  } catch (error) {
    console.error('Error fetching complete user details:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};
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
exports.getVerifiedDoctors = async (req, res) => {
  try {
    const verifiedDoctors = await Doctor.find({ verified: true });
    res.json({ doctors: verifiedDoctors });
  } catch (error) {
    console.error('Error fetching verified doctors:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};
exports.bookAppointment = async (req, res) => {
  try {
    const { doctorId, modeOfConsultation, preferredDateTime, symptoms } = req.body;
    const patientId = req.user._id; // Assuming the patient is authenticated

    // Check if the doctor exists
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    // Create a new appointment instance
    const newAppointment = new Appointment({
      doctor: doctorId,
      patient: patientId,
      modeOfConsultation,
      preferredDateTime,
      symptoms
    });

    // Save the appointment to the database
    await newAppointment.save();

    // Add the appointment to the doctor's appointments
    doctor.appointments.push(newAppointment);
    await doctor.save();

    res.status(201).json({ success: true, message: 'Appointment request submitted successfully' });
  } catch (error) {
    console.error('Error requesting appointment:', error);
    res.status(500).json({ success: false, message: 'Appointment request failed' });
  }
};