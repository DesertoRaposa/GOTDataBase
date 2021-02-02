import React from 'react';
import { Container, Row, Col, Navbar } from 'react-bootstrap';
import './header.css';
import { Link } from 'react-router-dom';

const Header = () => (
  <>
    <div className="container p-0 my-4">
      <h5 className="text-light fs-1 text font-weight-normal w-75">
        Navigation
        <hr />
      </h5>
      <div className="row py-3 col-md m-0 p-0 w-75">
        <div className="col-lg-12 col-xl-4 mb-4 mb-xl-2 pl-0 ">
          <div className="navcard chars position-relative shadow-lg">
            <div className="cover"> </div>
          </div>
          <p className="text-light mt-3 linktitle text-center">Characters</p>
        </div>
        <div className="col-lg-12 col-xl-4 mb-4 mb-xl-2 pl-0">
          <div className="navcard books position-relative shadow-lg">
            <div className="cover"> </div>
          </div>
          <p className="text-light mt-3 linktitle text-center">Books</p>
        </div>
        <div className="col-lg-12 col-xl-4 mb-4 mb-xl-2 pl-0 ">
          <div className="navcard houses position-relative shadow-lg">
            <div className="cover text-light"> </div>
          </div>
          <p className="text-light mt-3 linktitle text-center">Houses</p>
        </div>
      </div>
    </div>
  </>
  // <Navbar variant="dark" className="colorscheme shadow-lg d-flex justify-content-between">
  //   <Navbar.Brand
  //     className="pl-3"
  //   >
  //     <Link to="/">
  //       Game of Thrones DB
  //     </Link>
  //   </Navbar.Brand>
  //   <ul className="navbar-nav">
  //     <li className="nav-item">
  //       <Link to="/characters/" className="nav-link">Characters</Link>
  //     </li>
  //     <li className="nav-item">
  //       <Link to="/houses/" className="nav-link">Houses</Link>
  //     </li>
  //     <li className="nav-item">
  //       <Link to="/books/" className="nav-link">Books</Link>
  //     </li>
  //   </ul>
  // </Navbar>
);
export default Header;
