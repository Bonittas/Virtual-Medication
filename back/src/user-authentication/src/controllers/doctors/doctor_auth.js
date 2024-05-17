const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/Doctor');
const path = require('path');
const fs = require('fs');
const Notification = require("../../models/doctorNotification")
const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_here';
const JWT_EXPIRES_IN = '1d'; 
const Appointment = require("../../models/appointmetSchema")

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
exports.getAppointments = async (req, res) => {
  try {
    // Check if the user making the request is authenticated
    if (!req.user || !req.user._id) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Check if the authenticated user is a doctor
    const doctor = await User.findById(req.user._id);
    if (!doctor || doctor.role !== 'doctor') {
      return res.status(403).json({ error: 'Forbidden' });
    }

    // If the authenticated user is a doctor, fetch their appointments
    const doctorId = req.user._id;
    const appointments = await Appointment.find({ doctor: doctorId }).populate('patient', 'name'); // Assuming 'patient' is the field referencing the patient document

    // Map the appointments to include patient name, ID, date, and time
    const formattedAppointments = appointments.map(appointment => ({
      _id: appointment._id,
      patientName: appointment.patient.name,
      patientId: appointment.patient._id, // Assuming patient ID is stored in the patient document
      date: appointment.date,
      time: appointment.time,
      symptoms: appointment.symptoms,
      status: appointment.status
    }));

    res.status(200).json(formattedAppointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


exports.getAppointmentRequests = async (req, res) => {
  try {
    const appointmentRequests = await Appointment.find({ status: 'pending' })
      .populate('patient', 'name email age gender'); // Populate patient data with specified fields

    res.json({ appointmentRequests });
  } catch (error) {
    console.error('Error fetching appointment requests:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.getApprovedAppointments = async (req, res) => {
  try {
    const approvedAppointments = await Appointment.find({ status: 'approved' })
      .populate('patient', 'name email age gender'); // Populate patient data with specified fields
    res.json({ approvedAppointments });
  } catch (error) {
    console.error('Error fetching approved appointments:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};
exports.getRejectedAppointments = async (req, res) => {
  try {
    const rejectedAppointments = await Appointment.find({ status: 'rejected' })
      .populate('patient', 'name email age gender'); // Populate patient data with specified fields
    res.json({ rejectedAppointments });
  } catch (error) {
    console.error('Error fetching rejected appointments:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};


// Controller method to approve an appointment request
exports.approveAppointment = async (req, res) => {
  const { id } = req.params;

  try {
    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    appointment.status = 'approved';
    await appointment.save();

    res.json({ success: true, message: 'Appointment approved successfully' });
  } catch (error) {
    console.error('Error approving appointment:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// Controller method to reject an appointment request
exports.rejectAppointment = async (req, res) => {
  const { id } = req.params;

  try {
    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    appointment.status = 'rejected';
    await appointment.save();

    res.json({ success: true, message: 'Appointment rejected successfully' });
  } catch (error) {
    console.error('Error rejecting appointment:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};