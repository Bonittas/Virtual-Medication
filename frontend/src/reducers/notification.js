// Example notification component or logic
import React, { useEffect } from 'react';

const Notification = ({ message }) => {
  useEffect(() => {
    if (message) {
      alert(message);
    }
  }, [message]);

  return null;
};

export default Notification;
