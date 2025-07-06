import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import './Logout.css';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear authentication if applicable
    navigate('/');
  };

  return (
    <button onClick={handleLogout} className="logout-button">
      <FontAwesomeIcon icon={faSignOutAlt} className="logout-icon" />
    </button>
  );
};

export default LogoutButton;
