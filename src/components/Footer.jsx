import React from "react";
import { Link } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";

function Footer() {
  // Get the current year to display in the footer
  const currentYear = new Date().getFullYear();

  return (
    <div>
      <footer id="colorlib-footer" role="contentinfo">
        <div className="container-fluid">
          <div className="row special mt-5 pt-5 row-pb-md">
            {/* About Footwear Section */}
            <div className="col footer-col colorlib-widget">
              <h4>About Footwear</h4>
              <p className="text-secondary">
                Even the all-powerful Pointing has no control about the blind
                texts it is an almost unorthographic life.
              </p>
              {/* Social Media Links */}
              <ul className="colorlib-social-icons mb-3">
                <li>
                  <Link to="#">
                    <i className="fab fa-twitter"></i> {/* Twitter icon */}
                  </Link>
                </li>
                <li>
                  <Link to="#">
                    <i className="fab fa-facebook-f"></i> {/* Facebook icon */}
                  </Link>
                </li>
                <li>
                  <Link to="#">
                    <i className="fab fa-linkedin"></i> {/* LinkedIn icon */}
                  </Link>
                </li>
                <li>
                  <Link to="#">
                    <i className="fab fa-dribbble"></i> {/* Dribbble icon */}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Customer Care Section */}
            <div className="col footer-col colorlib-widget">
              <h4>Customer Care</h4>
              {/* Links for customer support and services */}
              <ul className="colorlib-footer-links">
                <li>
                  <Link to="/contact">Contact</Link>
                </li>
                <li>
                  <Link to="#">Returns/Exchange</Link>
                </li>
                <li>
                  <Link to="#">Gift Voucher</Link>
                </li>
                <li>
                  <Link to="#">Wishlist</Link>
                </li>
                <li>
                  <Link to="/allproducts">Special</Link>
                </li>
                <li>
                  <Link to="#">Customer Services</Link>
                </li>
                <li>
                  <Link to="#">Site maps</Link>
                </li>
              </ul>
            </div>

            {/* Information Section */}
            <div className="col footer-col colorlib-widget">
              <h4>Information</h4>
              {/* Links providing information about the company */}
              <ul className="colorlib-footer-links">
                <li>
                  <Link to="/about">About us</Link>
                </li>
                <li>
                  <Link to="#">Delivery Information</Link>
                </li>
                <li>
                  <Link to="#">Privacy Policy</Link>
                </li>
                <li>
                  <Link to="#">Support</Link>
                </li>
                <li>
                  <Link to="#">Order Tracking</Link>
                </li>
              </ul>
            </div>

            {/* News Section */}
            <div className="col footer-col">
              <h4>News</h4>
              {/* Links to the blog or news-related pages */}
              <ul className="colorlib-footer-links">
                <li>
                  <Link to="blog.html">Blog</Link>
                </li>
                <li>
                  <Link to="#">Press</Link>
                </li>
                <li>
                  <Link to="#">Exhibitions</Link>
                </li>
              </ul>
            </div>

            {/* Contact Information Section */}
            <div className="col footer-col">
              <h4>Contact Information</h4>
              {/* Company contact details */}
              <ul className="colorlib-footer-links">
                <li>
                  Rajarampuri Kolhapur, <br /> Maharashtra 416008 India
                </li>
                <li>
                  <a href="tel://1234567920">+91 xxxxxxxx66</a>
                </li>
                <li>
                  <a href="mailto:coolfootwear@gmail.com">
                    info@trendyfootwear.com
                  </a>
                </li>
                <li>
                  <Link to="/adminlogin">Admin Login</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright Information */}
        <div className="copy">
          <div className="row">
            <div className="col-sm-12 text-center">
              {/* Displaying the current year dynamically */}
              <p>Copyright &copy; {currentYear} All rights reserved</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
