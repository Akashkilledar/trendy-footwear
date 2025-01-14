// src/components/NotFound.jsx

import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation

const NotFound = () => {
  return (
    <div className="notfound-container">
      <div className="notfound-content">
        <h1 className="error-code">404</h1>
        <p className="error-message">Oops! The page you're looking for is not here.</p>
        <p className="suggestion">You can go back to the homepage or explore other sections of the site.</p>
        <Link to="/" className="back-home-button">Back to Homepage</Link>
      </div>
    </div>
  );
};

export default NotFound;
