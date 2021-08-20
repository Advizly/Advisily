import React from "react";
import { NavLink } from "react-router-dom";
import { Row, ColMedium } from "../components/grid";
import CopyRight from "../components/CopyRight";
function Footer(props) {
  return (
    <footer className="d-flex justify-content-between app-footer">
      <CopyRight />
      <Row className="footer-links ">
        <ColMedium numOfCols="auto">
          <NavLink to="/about-us">About Us</NavLink>
        </ColMedium>
        <ColMedium numOfCols="auto">
          <NavLink to="/contact-us">Contact Us</NavLink>
        </ColMedium>
      </Row>
    </footer>
  );
}

export default Footer;
