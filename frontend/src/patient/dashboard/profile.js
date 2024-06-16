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
        const response = await axios.get("http://localhost:5000/api/auth/patient/currentUser", {
          headers: {
            'x-auth-token': localStorage.getItem('token')
          }
        });
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
          <span className="text-lg text-gray-700">Loading user data...</span>
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
          <p className="text-lg text-gray-700">User data not available.</p>
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
          <p className="text-lg text-gray-700">User ID not found.</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Nav />
      <div className=" mx-auto px-4 my-4 py-8">
        <div className="bg-green-50 p-6 rounded-lg mb-8 shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
            <div className="md:col-span-1 flex items-center justify-center">
              <img
                src={`http://localhost:5000/images/${user.imageUrl}`}
                alt="Profile"
                className="rounded-full w-40 h-40 border-2 border-green-50"
              />
            </div>
            <div className="md:col-span-2 flex flex-col justify-center">
              <h1 className="text-2xl font-bold mb-2 text-gray-800">{user.name}</h1>
              <p className="text-lg text-gray-700">{user.email}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
            <div>
              <p className="text-gray-700 font-bold">Age:</p>
              <p className="text-gray-700">{user.age}</p>
            </div>
            <div>
              <p className="text-gray-700 font-bold">Gender:</p>
              <p className="text-gray-700">{user.gender}</p>
            </div>
  
            <div>
              <p className="text-gray-700 font-bold">Address:</p>
              <p className="text-gray-700">{user.address1}</p>
            </div>
            <div>
              <p className="text-gray-700 font-bold">Address2</p>
              <p className="text-gray-700">{user.address2}, </p>
            </div>
            <div>
              <p className="text-gray-700 font-bold">Country</p>
              <p className="text-gray-700">{user.country}</p>
            </div>

            <div>
              <p className="text-gray-700 font-bold">Home Town:</p>
              <p className="text-gray-700">{user.city}</p>
            </div>
 
 
          </div>
        </div>
      </div>
      <div className='bg-green-500'>
      <Footer />
      </div>
    </>
  );
};

export default Profile;
