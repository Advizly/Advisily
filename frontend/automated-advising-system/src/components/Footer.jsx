import React from "react";
import { NavLink } from "react-router-dom";

function Footer(props) {
  return (
    <footer className="d-flex justify-content-between app-footer">
      <div className="copy-right">
        <p>
          2021 &copy;
          <a className="navbar-brand" href="https://www.aucegypt.edu/home">
            The American University in Cairo.
          </a>
          All rights reserved.
        </p>
      </div>
      <div className="footer-links ">
        <div className="row">
          <div className="col-md-auto">
            <NavLink to="/about-us">About Us</NavLink>
          </div>
          <div className="col-md-auto">
            <NavLink to="/contact-us">Contact Us</NavLink>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
