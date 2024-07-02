import React from "react";
import "./Footer.css";
import logo from "../../assets/logo.png";

function Footer() {
  return (
    <div>
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-section logo-section">
            <img
              src={logo}
              alt="homeswap-high-resolution-logo-2-720"
              border="0"
              className="footer-logo"
            />
            <p>Perfect spaces for your needs</p>
          </div>

          <div className="footer-section contact-section">
            <h2>Contact</h2>
            <a
              href="mailto:alioth840@gmail.com"
              className="footer-contact-link"
            >
              EMAIL:{" "}
              <span className="contact-link-email">info@homeswap.com</span>
            </a>
            <p>Phone: +92 302 4606680</p>
            <p className="footer-address">Address: Overhoeksplein 2</p>
            <p>1031 KS Amsterdam </p>
            <p>Netherlands</p>
          </div>

          <div className="footer-section  areas-section">
            <h2>Areas</h2>
            <div className="areas-list">
              <p className="footer-menu-area-items">Syria</p>
              <p className="footer-menu-area-items">Egypt</p>
              <p className="footer-menu-area-items">Nicaragua</p>
              <p className="footer-menu-area-items">Zimbabwe</p>
              <p className="footer-menu-area-items">Nederland</p>
              <p className="footer-menu-area-items">Spain</p>
            </div>
          </div>

          <div className="footer-section areas-section">
            <div className="areas-list">
              <p>Canada</p>
              <p className="footer-menu-area-items">Germany</p>
              <p className="footer-menu-area-items">Italy</p>
              <p className="footer-menu-area-items">Greece</p>
              <p className="footer-menu-area-items">Hungary</p>
              <p className="footer-menu-area-items">Finland</p>
              <p className="footer-menu-area-items">Sweden</p>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="left-footer-bottom">
            <p className="footer-country-name">Nederland</p>
          </div>
          <div className="footer-social-icons">
            <i className="fab fa-instagram"></i>
            <i className="fab fa-facebook"></i>
            <i className="fab fa-twitter"></i>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
