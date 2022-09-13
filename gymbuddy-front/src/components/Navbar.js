import * as React from 'react';
import { NavLink } from 'react-router-dom';
import "./navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1>Gym-Buddy</h1>
      </div>
      <div className="navbar-center">
        <ul>
          <li>
            <NavLink to="/">Training</NavLink>
          </li>
          <li>
            <NavLink to="/programs">Programs</NavLink>
          </li>
        </ul>
      </div>
      <div className="navbar-right"></div>
    </nav>
  );
};

export default Navbar;