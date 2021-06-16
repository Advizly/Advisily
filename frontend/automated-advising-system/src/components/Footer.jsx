import React from "react";

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
            <a href="/#">About Us</a>
          </div>
          <div className="col-md-auto">
            <a href="/#">Contact Us</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
