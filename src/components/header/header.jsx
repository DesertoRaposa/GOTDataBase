import React from 'react';
import { Navbar } from 'react-bootstrap';
import './header.css';
import { Link } from 'react-router-dom';

const Header = () => (
  <Navbar variant="dark" className="colorscheme shadow-lg d-flex justify-content-between">
    <Navbar.Brand
      className="pl-3"
    >
      <Link to="/">
        Game of Thrones DB
      </Link>
    </Navbar.Brand>
    <ul className="navbar-nav">
      <li className="nav-item">
        <Link to="/characters/" className="nav-link">Characters</Link>
      </li>
      <li className="nav-item">
        <Link to="/houses/" className="nav-link">Houses</Link>
      </li>
      <li className="nav-item">
        <Link to="/books/" className="nav-link">Books</Link>
      </li>
    </ul>
  </Navbar>
);
export default Header;
