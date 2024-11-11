import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/Landing.css";

const Landing = () => {
  return (
    <div className='landing-main'>
      <h1>LifeEC</h1>
      <p>Hello and Welcome!</p>
      <Link to="/login" className="landing-login-button">Login</Link>
      <Link to="/register" className="landing-register-button">Register</Link>
    </div>
  );
};

export default Landing;
