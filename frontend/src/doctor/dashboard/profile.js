import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import Nav from './dashboard';
import Footer from '../../home/footer';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await axios.get("https://medicare-auth.onrender.com/api/auth/currentUser", {
          headers: {
            'x-auth-token': localStorage.getItem('token')
          }
        });
        console.log('User Data:', response.data.user); // Add this line to log user data
        setUser(response.data.user);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Error fetching user data');
        setIsLoading(false);
      }
    };
  
    fetchUserData();
  }, []);
  
  if (isLoading) {
    return (
      <>
        <Nav />
        <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-screen">
          <FontAwesomeIcon icon={faSpinner} spin className="text-4xl text-green-500 mr-2" />
          <span className="text-lg text-gray-800">Loading user data...</span>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Nav />
        <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-screen">
          <p className="text-lg text-red-500">Error fetching user data: {error}</p>
        </div>
        <Footer />
      </>
    );
  }

  if (!user) {
    return (
      <>
        <Nav />
        <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-screen">
          <p className="text-lg text-gray-800">User data not available.</p>
        </div>
        <Footer />
      </>
    );
  }

  if (!user._id) {
    return (
      <>
        <Nav />
        <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-screen">
          <p className="text-lg text-gray-800">User ID not found.</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Nav />
      <div className="container mx-auto mt-32 px-4 my-4 py-8">
        <div className="p-6 mb-8  flex flex-col md:flex-row items-center md:items-start">
          <div className="border-gray-900 border flex mr-10 justify-center w-full md:justify-start md:w-1/4">
            <img
              src={`https://medicare-auth.onrender.com/images/${user.imageUrl}`}
              alt="Profile"
              className="rounded-sm w-full h-64 border-2 border-green-50"
            />
          </div>
          <div className="mt-4 md:mt-0 mt-6 md:ml-6 flex  md:w-3/4">
            <div className='mx-10'>
            <h1 className="text-2xl font-bold mb-7 text-gray-800">{user.name}</h1>
            <p className="text-lg text-gray-800 mb-7">Email: {user.email}</p>
            <p className="text-lg text-gray-800 mb-7">Medical Specialty: {user.medicalSpeciality}</p>
            <p className="text-lg text-gray-800 mb-7">Degree: {user.degree}</p>
            <p className="text-lg text-gray-800 mb-7">Experience: {user.experience}</p>
            </div>
            <div className='ml-10'> 
            <p className="text-lg text-gray-800 mb-7">Age: {user.age}</p>
            <p className="text-lg text-gray-800 mb-7">Gender: {user.gender}</p>
            <p className="text-lg text-gray-800 mb-7">State Medical Council: {user.stateMedicalCouncil}</p>

            <p className="text-lg text-gray-800 mb-7">Working Hours: {user.startTime} - {user.endTime}</p>
            <p className="text-lg text-gray-800 mb-7">Address: {user.address1}, {user.address2}, {user.city}, {user.state}, {user.country}, {user.pincode}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-green-500">
        <Footer />
      </div>
    </>
  );
};

export default Profile;
