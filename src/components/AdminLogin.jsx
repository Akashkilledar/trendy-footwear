import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie"; // Import js-cookie to handle cookies
import { checkAdminLoggedIn } from "./reuseable-code/CheckedLoggedIn"; // Function to check if the admin is logged in

function AdminLogin() {
  // State variables to manage form inputs, errors, and success messages
  const [passwordStatus, setPasswordStatus] = useState(false); // State for password visibility toggle
  const [successful, setSuccessful] = useState(""); // State to store successful login message
  const [error, setError] = useState({}); // State to store form validation errors
  const [data, setData] = useState({ username: "", password: "" }); // State to store the login form data
  const navigate = useNavigate(); // Hook to navigate programmatically

  // Handle changes in the form fields (username and password)
  const handleChange = (e) => {
    setData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value, // Update the corresponding field based on the id
    }));
    setError((prev) => ({ ...prev, [`${e.target.id}Error`]: "" })); // Reset the error for the field
    setSuccessful(""); // Reset success message
  };

  // Check if the admin is already logged in when the component is mounted
  useEffect(() => {
    if (checkAdminLoggedIn()) {
      navigate("/admin/dashboard"); // Redirect to dashboard if the user is already logged in
    }
  }, [navigate]);

  // Validate the login form (username and password)
  const validate = () => {
    const errMessages = {};
    // Validate the username
    if (!data.username.trim()) {
      errMessages.usernameError = "Username is required"; // Show error if username is empty
    } else if (data.username.trim() !== import.meta.env.VITE_ADMIN_USERNAME) {
      errMessages.usernameError = "Wrong Username"; // Show error if username is incorrect
    }
    // Validate the password
    if (!data.password.trim()) {
      errMessages.passwordError = "Password is required"; // Show error if password is empty
    } else if (data.password.trim() !== import.meta.env.VITE_ADMIN_PASSWORD) {
      errMessages.passwordError = "Wrong Password"; // Show error if password is incorrect
    }
    setError(errMessages); // Update error state with validation messages
    return Object.keys(errMessages).length === 0; // Return true if no errors are found
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (validate()) { // If validation passes
      setSuccessful("Login Successful!"); // Set the success message
      const expires = new Date();
      expires.setDate(expires.getDate() + 7); // Set cookie expiry to 7 days from now
      const sessionToken = "secureSessionToken"; // This should be replaced with a server-side token
      // Set the session cookie with the token
      Cookies.set("admin_session", sessionToken, {
        expires: expires,
        secure: process.env.NODE_ENV === "production", // Use secure flag in production
      });
      navigate("/admin/dashboard"); // Redirect to the admin dashboard
      setData({ username: "", password: "" }); // Clear the form data
    }
  };

  // Handle keyboard navigation between fields
  const handleKeyDown = (e, nextField, prevField) => {
    // Move to the next field when the down arrow key is pressed
    if (e.key === "ArrowDown") {
      document.getElementById(nextField)?.focus();
    }
    // Move to the previous field when the up arrow key is pressed
    else if (e.key === "ArrowUp") {
      document.getElementById(prevField)?.focus();
    }
    // Submit the form when the Enter key is pressed
    else if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  return (
    <>
      {/* Breadcrumbs navigation */}
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
                / <span>Admin Login</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Admin login form */}
      <div className="container-fluid mt-5 mb-5" id="login">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-lg-3 border border-dark rounded p-5 login">
            <div className="text-center fs-3 mb-3">
              <b>Admin Login</b>
            </div>
            {/* Username field */}
            <div className="mb-3">
              <label htmlFor="username" className="fw-bold mb-1">
                Username
              </label>
              <div className="d-flex text-center password">
                <input
                  value={data.username}
                  type="text"
                  id="username"
                  onChange={handleChange}
                  onKeyDown={(e) => handleKeyDown(e, "password", "")} // Navigate to password field on ArrowDown
                  className="form-control"
                />
              </div>
              {/* Display username error if any */}
              {error.usernameError && (
                <span className="text-danger fw-bold">
                  {error.usernameError}
                </span>
              )}
            </div>
            {/* Password field */}
            <div>
              <label htmlFor="password" className="fw-bold mb-1">
                Password
              </label>
              <div className="d-flex text-center password">
                <input
                  value={data.password}
                  id="password"
                  type={passwordStatus ? "text" : "password"} // Toggle password visibility
                  className="form-control mb-2"
                  onChange={handleChange}
                  onKeyDown={(e) => handleKeyDown(e, "", "username")} // Navigate back to username field on ArrowUp
                />
                {/* Password visibility toggle */}
                <span onClick={() => setPasswordStatus(!passwordStatus)}>
                  {passwordStatus ? (
                    <img
                      src="https://cdn-icons-png.flaticon.com/128/709/709612.png"
                      alt="Show"
                      height={20}
                    />
                  ) : (
                    <img
                      src="https://cdn-icons-png.flaticon.com/128/2767/2767146.png"
                      alt="Hide"
                      height={20}
                    />
                  )}
                </span>
              </div>
              {/* Display password error if any */}
              {error.passwordError && (
                <span className="text-danger fw-bold">
                  {error.passwordError}
                </span>
              )}
              {/* Submit button */}
              <div className="text-center mt-3">
                <button className="btn btn-success" onClick={handleSubmit}>
                  Submit
                </button>
                {/* Show success message after successful login */}
                {successful && (
                  <div className="text-success fw-bold mt-5">{successful}</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminLogin;
