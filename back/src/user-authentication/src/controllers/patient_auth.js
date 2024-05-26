const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/Patient');
const Doctor = require('../models/Doctor');
const Notification = require("../models/patientNotification");
const Appointment = require("../models/appointmetSchema");
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

    user = await User.create({ name, email, password: hashedPassword });

    const payload = { user: { _id: user._id } };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    res.json({ user: { _id: user._id }, token });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.completeDetails = async (req, res) => {
  try {
    if (!req.body.details) {
      return res.status(400).json({ message: 'User details are required' });
    }

    const details = JSON.parse(req.body.details);
    const { name, age, gender, address1, address2, city, state, pincode, country } = details; 

    const userId = req.user._id;
    const updatedUserFields = { name, age, gender, address1, address2, city, state, pincode, country };

    if (req.file) {
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
    const filePath = req.file.path;
    res.json({ filePath });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.uploadImage = async (req, res) => {
  try {
    const imageUrl = req.file.path;
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
    const userDetails = await User.findById(userId);

    if (!userDetails) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ user: userDetails });
  } catch (error) {
    console.error('Error fetching user details:', error);
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
    const userId = req.user._id;
    const userDetails = await User.findById(userId);

    if (!userDetails) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ user: userDetails });
  } catch (error) {
    console.error('Error fetching user details:', error);
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
    if (!req.user || !req.user._id) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const patient = await User.findById(req.user._id);
    if (!patient || patient.role !== 'patient') {
      return res.status(403).json({ error: 'Forbidden' });
    }

    const patientId = req.user._id;
    const appointments = await Appointment.find({ patient: patientId }).populate('doctor');

    const formattedAppointments = appointments.map(appointment => ({
      _id: appointment._id,
      doctor: {
        _id: appointment.doctor._id,
        name: appointment.doctor.name,
      },
      date: appointment.date,
      time: appointment.time,
      symptoms: appointment.symptoms,
      status: appointment.status
    }));

    res.status(200).json({ appointmentRequests: formattedAppointments });
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.requestAppointment = async (req, res) => {
  try {
    const { doctorId, date, time, symptoms } = req.body;

    if (!doctorId || !date || !time || !symptoms) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const patientId = req.user._id;

    const newAppointment = new Appointment({
      patient: patientId,
      doctor: doctorId,
      date,
      time,
      symptoms,
      status: 'pending'
    });

    await newAppointment.save();

    const doctor = await Doctor.findById(doctorId);

    if (doctor) {
      const notification = new Notification({
        recipient: doctor._id,
        message: `You have a new appointment request from ${req.user.name}.`,
        data: { appointmentId: newAppointment._id },
        type: 'appointment_request'
      });

      await notification.save();
    }

    res.status(201).json({ appointment: newAppointment });
  } catch (error) {
    console.error('Error requesting appointment:', error);
    res.status(500).json({ error: 'Internal server error' });
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