import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

const ApprovedUsers = () => {
  const [approvedUsers, setApprovedUsers] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchApprovedUsers();
  }, []);

  const fetchApprovedUsers = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Unauthorized: No token found');
      return;
    }
    fetch(`https://healt-link-v36m.onrender.com/api/auth/approved-appointments`, {
      headers: {
        'x-auth-token': token,
      },
    })
    .then(response => {
      if (response.ok) {
        return response.json(); // Parse response data as JSON
      }
      throw new Error('Failed to fetch approved users');
    })
    .then(data => {
      // Assuming data is an array of approved users, set it in the state
      const approvedUsersWithData = data.map(user => ({
        ...user,
        roomId: user.roomId || null, // Ensure roomId is included, or set to null if undefined
      }));
      setApprovedUsers(approvedUsersWithData);
    })
    .catch(error => {
      console.error('Error fetching approved users:', error);
      setError('Error fetching approved users');
    });
  };

  const handleJoinVideo = roomId => {
    if (roomId) {
      navigate('/doctor'); 
    } else {
      console.error('Room ID is undefined');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Approved Users</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {approvedUsers.map(user => (
          <div key={user._id} className="bg-white p-4 shadow-md rounded-md">
            <h2 className="text-lg font-semibold">{user.name}</h2>
            <p className="text-gray-500 mb-2">{user.email}</p>
          <Link to ='/doctor'>  <button className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600">
              Join Video
            </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApprovedUsers;
