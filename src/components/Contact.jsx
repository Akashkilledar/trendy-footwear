import React, { useState } from "react";
import { Link } from "react-router-dom";

function Contact() {
  // State to manage form input data
  const [data, setData] = useState({
    fname: "", // First Name
    lname: "", // Last Name
    email: "", // Email Address
    subject: "", // Subject of the message
    message: "", // Message content
  });

  // State to manage form validation errors
  const [error, setError] = useState({});

  // State to handle success message after form submission
  const [successful, setSuceessful] = useState("");

  // Handle input field changes, update the form data and clear error messages
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.id]: e.target.value, // Dynamically update the respective field
    });
    setError({
      ...error,
      [`${e.target.id}Error`]: "", // Clear any previous error for the current field
    });
    setSuceessful(""); // Clear any success message
  };

  // Function to validate the form fields before submitting
  const validate = () => {
    const erromessages = {}; // Object to store validation error messages

    // Validate first name
    if (data.fname.trim().length < 3 || data.fname.trim().length === 0) {
      if (data.fname.trim().length < 3) {
        erromessages.fnameError = "First name must have at least 3 characters";
      }
      if (data.fname.trim().length === 0) {
        erromessages.fnameError = "First name is required";
      }
    }

    // Validate last name
    if (data.lname.trim().length < 3 || data.lname.trim().length === 0) {
      if (data.lname.trim().length < 3) {
        erromessages.lnameError = "Last name must have at least 3 characters";
      }
      if (data.lname.trim().length === 0) {
        erromessages.lnameError = "Last name is required";
      }
    }

    // Validate email address
    if (
      !/\S+@\S+\.\S+/.test(data.email.trim()) || // Regular expression to validate email format
      data.email.trim().length === 0
    ) {
      if (!/\S+@\S+\.\S+/.test(data.email.trim())) {
        erromessages.emailError = "Email is not valid";
      }
      if (data.email.trim().length === 0) {
        erromessages.emailError = "Email is required";
      }
    }

    // Validate subject
    if (data.subject.trim().length < 3 || data.subject.trim().length === 0) {
      if (data.subject.trim().length < 3) {
        erromessages.subjectError = "Subject must have at least 3 characters";
      }
      if (data.subject.trim().length === 0) {
        erromessages.subjectError = "Subject is required";
      }
    }

    // Set error messages to state
    setError(erromessages);

    // If there are no error messages, the form is valid
    return Object.keys(erromessages).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (validate()) {
      // If the form is valid, show success message
      setSuceessful("Response submitted successfully.");
      // Clear the form fields
      setData({
        fname: "",
        lname: "",
        email: "",
        subject: "",
        message: "",
      });
      console.log(data); // Log the form data (optional)
    } else {
      console.log("Form contains errors"); // Log if form validation fails
    }
  };

  return (
    <>
      {/* Breadcrumbs for navigation */}
      <div className="breadcrumbs">
        <div className="container">
          <div className="row">
            <div className="col">
              <p className="bread fw-bold">
                <span>
                  <Link to={"/"} className="pointer-cursor">
                    Home
                  </Link>
                </span>{" "}
                / <span>Contact</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div id="colorlib-contact">
        <div className="container">
          <div className="row">
            {/* Contact Info */}
            <div className="col-sm-12">
              <h3>Contact Information</h3>
              <div className="row contact-info-wrap">
                <div className="col-md-3">
                  <p>
                    <span>
                      <i className="fas fa-map-marker-alt"></i>
                    </span>{" "}
                    <Link to="#">
                       Rajarampuri Kolhapur, <br /> Maharashtra 416008 India
                    </Link>
                  </p>
                </div>
                <div className="col-md-3">
                  <p>
                    <span>
                      <i className="fas fa-phone"></i>
                    </span>{" "}
                    <a href="tel://1234567920">+91 xxxxxxxx66</a>
                  </p>
                </div>
                <div className="col-md-3">
                  <p>
                    <span>
                      <i className="fas fa-paper-plane"></i>
                    </span>{" "}
                    <a href="mailto:info@yoursite.com">info@trendyfootwear.com</a>
                  </p>
                </div>
                <div className="col-md-3">
                  <p>
                    <span>
                      <i className="fas fa-globe"></i>
                    </span>{" "}
                    <a href="/nothing">trendyfootwear.com</a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            {/* Contact Form */}
            <div className="col-md-6">
              <div className="contact-wrap">
                <h3>Get In Touch</h3>
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="row">
                    {/* First Name */}
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="fname">First Name</label>
                        <input
                          type="text"
                          id="fname"
                          className="form-control fw-bold"
                          placeholder="Your firstname"
                          value={data.fname}
                          onChange={handleChange}
                        />
                        {error.fnameError && (
                          <span className="text-danger fw-bold">
                            {error.fnameError}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Last Name */}
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="lname">Last Name</label>
                        <input
                          type="text"
                          id="lname"
                          className="form-control fw-bold"
                          placeholder="Your lastname"
                          value={data.lname}
                          onChange={handleChange}
                        />
                        {error.lnameError && (
                          <span className="text-danger fw-bold">
                            {error.lnameError}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Email */}
                    <div className="w-100"></div>
                    <div className="col-sm-12">
                      <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                          type="text"
                          id="email"
                          className="form-control fw-bold"
                          value={data.email}
                          onChange={handleChange}
                          placeholder="Your email address"
                        />
                        {error.emailError && (
                          <span className="text-danger fw-bold">
                            {error.emailError}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Subject */}
                    <div className="w-100"></div>
                    <div className="col-sm-12">
                      <div className="form-group">
                        <label htmlFor="subject">Subject</label>
                        <input
                          type="text"
                          id="subject"
                          className="form-control fw-bold"
                          value={data.subject}
                          onChange={handleChange}
                          placeholder="Your subject of this message"
                        />
                        {error.subjectError && (
                          <span className="text-danger fw-bold">
                            {error.subjectError}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Message */}
                    <div className="w-100"></div>
                    <div className="col-sm-12">
                      <div className="form-group">
                        <label htmlFor="message">Message</label>
                        <textarea
                          name="message"
                          id="message"
                          cols="30"
                          rows="10"
                          className="form-control fw-bold"
                          value={data.message}
                          onChange={handleChange}
                          placeholder="Say something about us"
                        ></textarea>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="w-100"></div>
                    <div className="col-sm-12">
                      <div className="form-group text-center">
                        <input
                          type="submit"
                          value="Send Message"
                          className="btn btn-primary"
                        />
                      </div>
                    </div>

                    {/* Success Message */}
                    {successful && (
                      <p className="text-success fw-bold text-center">
                        {successful}
                      </p>
                    )}
                  </div>
                </form>
              </div>
            </div>

            {/* Google Map */}
            <div className="col-md-6">
              <div id="map">
                <iframe
                  title="map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d61141.866749608904!2d74.19766808237576!3d16.70854668013249!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc1000cdec07a29%3A0xece8ea642952e42f!2sKolhapur%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1736766229381!5m2!1sen!2sin"
                  width="100%"
                  height="500"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;
