const Doctor = require('../models/Doctor');
const Notification = require('../models/doctorNotification');

exports.viewDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({}, { password: 0 }); // Exclude password field from the response
    res.json({ doctors });
  } catch (error) {
    console.error('Error fetching doctors:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.verifyDoctor = async (req, res) => {
  const { doctorId } = req.params;
  const { message } = req.body;

  try {
    // Find the doctor by ID
    const doctor = await Doctor.findById(doctorId);

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    // Update the doctor's verification status
    doctor.verified = true;
    await doctor.save();

    // Create a notification for the verified doctor
    const notification = new Notification({
      recipient: doctorId,
      message: message || 'Your account has been verified by the admin.',
      type: 'verification'
    });

    // Save the notification
    await notification.save();

    // Respond with success message
    res.json({ message: 'Doctor verified successfully' });
  } catch (error) {
    console.error('Error verifying doctor:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};
exports.unverifyDoctor = async (req, res) => {
  const { doctorId } = req.params;

  if (!doctorId) {
    return res.status(400).json({ message: 'Doctor ID is required' });
  }

  try {
    const doctor = await Doctor.findById(doctorId);

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    doctor.verified = false;
    await doctor.save();

    res.json({ message: 'Doctor unverified successfully' });
  } catch (error) {
    console.error('Error unverifying doctor:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};
