
const User = require('../../../../user-authentication/src/models/Doctor');
const Doctor = require('../../models/Doctor'); 

exports.signup = async (req, res) => {
    console.log("Signup route hit"); // Initial log to confirm route hit

    try {
      const { name, email, password } = req.body;
  
      console.log("Request Body:", req.body); // Log request body
      console.log("Uploaded Files:", req.files); // Log uploaded files
  
      // Validate input
      if (!name || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
      }
  
      // Check if email is already in use
      const existingDoctor = await Doctor.findOne({ email });
      if (existingDoctor) {
        return res.status(400).json({ message: 'Email is already in use' });
      }
  
      // Get file paths
      const documentPaths = req.files.map(file => file.path);
  
      // Create new doctor
      const newDoctor = new Doctor({
        name,
        email,
        password,
        documents: documentPaths
      });
  
      await newDoctor.save();
  
      res.status(201).json({ message: 'Doctor registered successfully' });
    } catch (error) {
      // Log detailed error in the terminal
      console.error('Error during signup:', error.message);
      console.error('Stack trace:', error.stack);
      if (error.response) {
        console.error('Response data:', error.response.data);
      } else if (error.request) {
        console.error('Request data:', error.request);
      } else {
        console.error('Error config:', error.config);
      }
  
      // Send a generic error message to the client
      res.status(500).json({ message: 'Server Error', error: error.message });
    }
  };
  
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