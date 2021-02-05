import React from 'react';
import './header.css';
import { Link } from 'react-router-dom';

const Header = () => (
  <>
    <div className="container p-0 my-4">
      <h5 className="text-light fs-1 text font-weight-normal w-75">
        Navigation
        <Link to="/" className="ml-4">
          Home
        </Link>
        <hr className="navhr" />
      </h5>
      <div className="row py-3 col-md m-0 p-0 w-75">
        <div className="col-lg-12 col-xl-4 mb-4 mb-xl-2 pl-0 ">
          <Link to="/characters/" className="bg-info">
            <div className="navcard chars position-relative shadow-lg">
              <div className="cover"> </div>
            </div>
            <p className="text-light mt-3 linktitle text-center">Characters</p>
          </Link>
        </div>
        <div className="col-lg-12 col-xl-4 mb-4 mb-xl-2 pl-0">
          <Link to="/books/" className="bg-danger">
            <div className="navcard books position-relative shadow-lg">
              <div className="cover"> </div>
            </div>
            <p className="text-light mt-3 linktitle text-center">Books</p>
          </Link>
        </div>
        <div className="col-lg-12 col-xl-4 mb-4 mb-xl-2 pl-0 ">
          <Link to="/houses/">
            <div className="navcard houses position-relative shadow-lg">
              <div className="cover text-light"> </div>
            </div>
            <p className="text-light mt-3 linktitle text-center">Houses</p>
          </Link>
        </div>
      </div>
    </div>
  </>
);
export default Header;
