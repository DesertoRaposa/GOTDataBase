import React from 'react';
import './errorMessage.css';
import img from './err.png';

const ErrorMessage = () => (
  <div className="d-flex flex-column shadow-lg bg-info">
    <img src={img} alt="error" />
  </div>
);

export default ErrorMessage;
