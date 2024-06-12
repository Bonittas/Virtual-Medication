import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserData } from '../../actions/patient_authActions';
import Nav from './dashboard'
import Footer from "../../home/footer"

const EditProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    gender: '',
    address1: '',
    address2: '',
    city: '',
    country: '',

  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        age: user.age,
        gender: user.gender,
        address1: user.address1,
        address2: user.address2,
        city: user.city,
        country: user.country,
      });
    }
  }, [user]);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateUserData(formData));
      setSuccessMessage('Profile successfully updated.');
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('Error while editing profile.');
      setSuccessMessage('');
    }
  };
  return (
    <>    <Nav/>
    <div className="container my-16 mx-auto px-4 py-8">
      <h1 className="text-xl font-bold mb-2">Edit Profile</h1>
      {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
      <form onSubmit={handleSubmit} className="bg-green-50 shadow-md rounded-lg p-6 mb-8">
        <div className="grid grid-cols-3 gap-10">
          <div className="mb-2">
            <label className="block text-gray-600 font-bold mb-2" htmlFor="name">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-5 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-2">
            <label className="block text-gray-600 font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-5 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-2">
            <label className="block text-gray-600 font-bold mb-2" htmlFor="age">
              Age
            </label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-5 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-2">
            <label className="block text-gray-600 font-bold mb-2" htmlFor="gender">
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-5 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="mb-2">
            <label className="block text-gray-600 font-bold mb-2" htmlFor="address1">
              Address Line 1
            </label>
            <input
              type="text"
              id="address1"
              name="address1"
              value={formData.address1}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-5 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-2">
            <label className="block text-gray-600 font-bold mb-2" htmlFor="address2">
              Address Line 2
            </label>
            <input
              type="text"
              id="address2"
              name="address2"
              value={formData.address2}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-5 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-2">
            <label className="block text-gray-600 font-bold mb-2" htmlFor="city">
Home Town
</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-5 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-2">
            <label className="block text-gray-600 font-bold mb-2" htmlFor="country">
              Country
            </label>
            <input
              type="text"
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-5 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Save Changes
        </button>
      </form>
    </div>

    <div className="bg-green-600">
    <Footer/>
    </div>
    </>

  );
};

export default EditProfile;
