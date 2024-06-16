import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../actions/patient_authActions'; // Import the logout action

const LogoutButton = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout()); // Dispatch the logout action
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default LogoutButton;
