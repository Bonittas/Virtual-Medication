import Nav from './dashboard'

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Notification = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Fetch notifications when the component mounts
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/auth/patient/notifications',{headers: {
            'x-auth-token': localStorage.getItem('token')
          }});
        setNotifications(response.data.notifications);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, []); // Empty dependency array ensures the effect runs only once on mount

  return (
    <><Nav/>
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Notifications</h1>
      {notifications.length === 0 ? (
        <p>No notifications to display</p>
      ) : (
        <div>
          {notifications.map(notification => (
            <div key={notification._id} className="border border-gray-200 rounded-md p-4 mb-4">
              <p className="text-lg">{notification.message}</p>
              <p className="text-sm text-gray-500 mt-2">Received: {new Date(notification.timestamp).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
    </>
  );
};

export default Notification;
