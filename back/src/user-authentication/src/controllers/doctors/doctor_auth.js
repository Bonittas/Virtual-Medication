const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/Doctor');
const Patient = require('../../models/Patient');
const Users= require('../../models/pastAPpointments');
const Doctor = require('../../models/Doctor'); 

const Meeting = require('../../models/meeting');
const Prescription = require('../../models/prescription');
const path = require('path');
const Room = require('../../models/Room')
const fs = require('fs');
const Notification = require("../../models/doctorNotification")
const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_here';
const JWT_EXPIRES_IN = '1d'; 
const Appointment = require("../../models/appointmetSchema")
const { v4: uuidv4 } = require('uuid');
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
    const appointments = await Appointment.find({ doctor: doctorId }).populate('patient');

    // Map the appointments to include patient name, ID, date, and time
    const formattedAppointments = appointments.map(appointment => ({
      _id: appointment._id,
      patient: {
        _id: appointment.patient._id,
        name: appointment.patient.name,
        // Include other patient details as needed
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

exports.getAppointmentRequests = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const doctorId = req.user._id;

    const appointmentRequests = await Appointment.find({ status: 'pending', doctor: doctorId })
      .populate({
        path: 'patient',
        select: 'name email age gender address1 country'
      })
      .exec();

    if (!appointmentRequests || appointmentRequests.length === 0) {
      return res.status(404).json({ error: 'No appointment requests found' });
    }

    // Debugging to check if patient data is populated
    appointmentRequests.forEach(appointment => {
      console.log('Appointment Patient:', appointment.patient);
    });

    // Format appointments to include patient's name and other details
    const formattedRequests = appointmentRequests.map(appointment => ({
      _id: appointment._id,
      patient: appointment.patient ? {
        _id: appointment.patient._id,
        name: appointment.patient.name || 'Unknown Patient',
        email: appointment.patient.email || 'N/A',
        age: appointment.patient.age || 'N/A',
        gender: appointment.patient.gender || 'N/A',
        address1: appointment.patient.address1 || 'N/A',
        country: appointment.patient.country || 'N/A'
      } : { _id: null, name: 'Unknown Patient', email: 'N/A', age: 'N/A', gender: 'N/A', address1: 'N/A', country: 'N/A' },
      preferredDateTime: appointment.preferredDateTime,
      symptoms: appointment.symptoms || 'N/A',
      status: appointment.status
    }));

    res.json({ appointmentRequests: formattedRequests });
  } catch (error) {
    console.error('Error fetching appointment requests:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};
exports.getApprovedAppointments = async (req, res) => {
  try {
    // Fetch appointments with status 'approved' and populate the 'patient' field
    const approvedAppointments = await Appointment.find({ status: 'approved' }).populate('patient');

    // Extract user information from each appointment
    const approvedUsers = approvedAppointments.map(appointment => ({
      _id: appointment.patient._id,
      name: appointment.patient.name,
      email: appointment.patient.email,
      roomId: appointment.roomId, // Include roomId in the response data
      // Add other user fields as needed
    }));

    res.json(approvedUsers);
  } catch (error) {
    console.error('Error fetching approved users:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.getRejectedAppointments = async (req, res) => {
  try {
    const doctorId = req.user._id; // Assuming the authenticated user is a doctor
    const rejectedAppointments = await Appointment.find({ doctor: doctorId, status: 'rejected' })
      .populate('patient', 'name') // Populate patient data with specified fields
      .select('preferredDateTime status'); // Select necessary fields

    // Format appointments to include patient's name, date, time, and status
    const formattedAppointments = rejectedAppointments.map(appointment => ({
      _id: appointment._id,
      patient: appointment.patient ? {
        _id: appointment.patient._id,
        name: appointment.patient.name,
      } : {
        _id: null,
        name: 'Unknown Patient',
      },
      date: appointment.preferredDateTime.toDateString(), // Extract date from preferredDateTime
      time: appointment.preferredDateTime.toLocaleTimeString(), // Format time or display 'N/A' if null
      status: appointment.status
    }));

    res.json({ rejectedAppointments: formattedAppointments });
  } catch (error) {
    console.error('Error fetching rejected appointments:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.getPrescriptions = async (req, res) => {
  try {
    const prescriptions = await Prescription.find();
    res.json(prescriptions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getMeetings = async (req, res) => {
  try {
    const meetings = await Meeting.find();
    res.json(meetings);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
exports.approveAppointment = async (req, res) => {
  const { id } = req.params;

  try {
    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // Generate a unique room ID (you can use uuidv4 or any other method)
    const roomId = uuidv4();
    appointment.roomId = roomId;
    appointment.status = 'approved';

    await appointment.save();

    res.json({ success: true, message: 'Appointment approved successfully', roomId });
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

exports.getPatientById = async (req, res) => {
  try {
    const userId = req.user._id;
    const userDetails = await Patient.findById(userId);

    if (!userDetails) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ user: userDetails });
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ message: 'Server Error' });
  }
}
// controllers/pastAppointmentController.js

exports.addPastAppointment = async (req, res) => {
  const { fullName, bloodType, bloodPressure, disease, medication } = req.body;
  try {
      const newUser = new Users({
          fullName,
          bloodType,
          bloodPressure,
          disease,
          medication,
      });
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
  } catch (err) {
      res.status(400).json({ error: err.message });
  }
}

exports.getPastAppointments = async (req, res) => {
    try {
        const pastAppointments = await Users.find();
        res.status(200).json(pastAppointments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getPastAppointmentById = async (req, res) => {
    try {
        const appointmentId = req.params.id;
        const pastAppointmentDetails = await Users.findById(appointmentId);

        if (!pastAppointmentDetails) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        res.json({ appointment: pastAppointmentDetails });
    } catch (error) {
        console.error('Error fetching appointment details:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.createPrescription = async (req, res) => {
  try {
    const { patientName, date, time, disease, medications } = req.body;
    const doctorId = req.user._id; // Assuming req.user contains the authenticated doctor's details
    const prescription = new Prescription({ patientName, date, time, disease, medications, doctor: doctorId });
    await prescription.save();
    
    // Optionally, update the doctor's document to include this prescription
    await Doctor.findByIdAndUpdate(doctorId, { $push: { prescriptions: prescription._id } });
    
    res.status(201).json(prescription);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all Prescriptions for the logged-in doctor
exports.getAllPrescriptions = async (req, res) => {
  try {
    const doctorId = req.user._id; // Assuming req.user contains the authenticated doctor's details
    const prescriptions = await Prescription.find({ doctor: doctorId });
    res.json(prescriptions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get Prescription by ID (only if it belongs to the logged-in doctor)
exports.getPrescriptionById = async (req, res) => {
  try {
    const doctorId = req.user._id; // Assuming req.user contains the authenticated doctor's details
    const prescription = await Prescription.findOne({ _id: req.params.id, doctor: doctorId });
    if (prescription) {
      res.json(prescription);
    } else {
      res.status(404).json({ message: 'Prescription not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update Prescription (only if it belongs to the logged-in doctor)
exports.updatePrescription = async (req, res) => {
  try {
    const { patientName, date, time, disease, medications } = req.body;
    const doctorId = req.user._id; // Assuming req.user contains the authenticated doctor's details
    const prescription = await Prescription.findOne({ _id: req.params.id, doctor: doctorId });
    if (prescription) {
      prescription.patientName = patientName;
      prescription.date = date;
      prescription.time = time;
      prescription.disease = disease;
      prescription.medications = medications;
      await prescription.save();
      res.json(prescription);
    } else {
      res.status(404).json({ message: 'Prescription not found' });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete Prescription (only if it belongs to the logged-in doctor)
exports.deletePrescription = async (req, res) => {
  try {
    const doctorId = req.user._id; // Assuming req.user contains the authenticated doctor's details
    const prescription = await Prescription.findOne({ _id: req.params.id, doctor: doctorId });
    if (prescription) {
      await prescription.remove();
      // Optionally, update the doctor's document to remove this prescription
      await Doctor.findByIdAndUpdate(doctorId, { $pull: { prescriptions: req.params.id } });
      res.json({ message: 'Prescription deleted' });
    } else {
      res.status(404).json({ message: 'Prescription not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
