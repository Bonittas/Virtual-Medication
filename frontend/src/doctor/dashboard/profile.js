// Inside Profile component

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserData } from '../../actions/doctor_authActions';
import Nav from './dashboard';
import Footer from '../../home/footer';

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const isLoading = useSelector(state => state.auth.isLoading);
  const error = useSelector(state => state.auth.error);

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  if (isLoading) {
    return <p>Loading user data...</p>;
  }

  if (error) {
    return <p>Error fetching user data: {error}</p>;
  }

  if (!user) {
    return <p>User data not available.</p>;
  }

  if (!user._id) {
    return <p>User ID not found.</p>;
  }

  return (
    <>
      <Nav />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Welcome, {user.name}</h1>
        <div className="bg-green-50 p-6 rounded-lg mb-8 shadow-md">
          <div className="grid grid-cols-3 gap-4 mt-2">
            <div>
              <img
                src={`http://localhost:5000/images/${user.imageUrl}`}
                alt="Profile"
                className="rounded-md w-2/3 h-1/2 border-2 border-green-300 mx-auto "
              />
            </div>
            <div>
              <p className="text-gray-700 font-bold text-gray-700 font-bold">Email: {user.email}</p>
              <p className="text-gray-700 font-bold text-gray-700 py-4">Medical Speciality: {user.medicalSpeciality}</p>
              <p className="text-gray-700 font-bold text-gray-700">Age: {user.age}</p>
              <p className="text-gray-700 font-bold text-gray-700 py-4">Gender: {user.gender}</p>
              <p className="text-gray-700 font-bold text-gray-700">Degree: {user.degree}</p>
              <p className="text-gray-700 font-bold text-gray-700 mt-4">Address: {user.address1}, {user.address2}, {user.city}, {user.state}, {user.country}, {user.pincode}</p>
            </div>
            <div>
              <p className="text-gray-700 font-bold text-gray-700 py-4">Registration Number: {user.regNumber}</p>
              <p className="text-gray-700 font-bold text-gray-700">Year of Registration: {user.yearOfReg}</p>
              <p className="text-gray-700 font-bold text-gray-700 py-4">State Medical Council: {user.stateMedicalCouncil}</p>
              <p className="text-gray-700 font-bold text-gray-700">Experience: {user.experience}</p>
              <p className="text-gray-700 font-bold text-gray-700 mt-4">Working Hours: {user.startTime} - {user.endTime}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-green-600">
        <Footer />
      </div>
    </>
  );
};

export default Profile;
