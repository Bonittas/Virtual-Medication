import React, { useState, useEffect } from "react";
import axios from "axios";

const ViewUser = ({ userId, onClose }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/auth/users/${userId}`);
        setUser(response.data.user);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch user details");
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error:</strong> {error}
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-8 rounded shadow-lg w-1/2">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full"
        >
          X
        </button>
        <h2 className="text-2xl font-bold mb-4">User Details</h2>
        {user && (
          <div>
            <div><strong>Name:</strong> {user.name}</div>
            <div><strong>Email:</strong> {user.email}</div>
            <div><strong>Age:</strong> {user.age}</div>
            <div><strong>Gender:</strong> {user.gender}</div>
            <div><strong>Address:</strong> {user.address1}</div>
            <div><strong>Country:</strong> {user.country}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewUser;
