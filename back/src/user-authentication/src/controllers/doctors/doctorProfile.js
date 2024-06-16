
const User = require('../../../../user-authentication/src/models/Doctor');
const Doctor = require('../../models/Doctor'); 

exports.getDoctorProfile = async (req, res) => {
    try {
        const doctorId = req.params.doctorId;
        if (!doctorId) {
            return res.status(400).json({ message: 'Doctor ID is required' });
        }

        const doctorData = await User.findById(doctorId);
        if (!doctorData) {
            return res.status(404).json({ message: 'No doctor profile found' });
        }

        res.json({ doctor: doctorData }); // Return the doctor profile data
    } catch (error) {
        console.error('Error fetching doctor profile:', error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};
exports.updateUserDetails = async (req, res) => {
    try {
      const userId = req.user._id;
      const updateData = req.body; // Assuming the request body contains updated user details
  
      const user = await User.findByIdAndUpdate(userId, updateData, { new: true });
  
      res.json({ user });
    } catch (error) {
      console.error('Error updating user details:', error);
      res.status(500).json({ message: 'Server Error' });
    }
  };