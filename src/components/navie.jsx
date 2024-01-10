// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const navie = ({ cartItems }) => {
  return (
    <div>
      <Link to="/cart">Cart ({cartItems.length})</Link>
    </div>
  );
};

export default navie;
