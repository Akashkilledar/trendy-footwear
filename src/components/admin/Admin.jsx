import React, { useEffect, useRef } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Cookies from "js-cookie"; // Import the js-cookie library for managing cookies
import { checkAdminLoggedIn } from "../reuseable-code/CheckedLoggedIn"; // A helper function to check if admin is logged in

function Admin() {
  const navigate = useNavigate(); // Hook for programmatic navigation
  const navbarTogglerRef = useRef(null); // Reference to toggle button for collapsing navbar
  const navbarCollapseRef = useRef(null); // Reference to navbar collapse container

  // Logout function to clear session token
  const logout = () => {
    Cookies.remove("admin_session"); // Remove admin session cookie
    navigate("/adminlogin"); // Redirect to login page
  };

  // Function to close the navbar after clicking a link
  const closeNavbar = () => {
    // Check if the navbar is open (collapsed)
    if (navbarCollapseRef.current.classList.contains("show")) {
      navbarTogglerRef.current.click(); // Simulate click on navbar toggle to close it
    }
  };

  // useEffect hook to check if the admin is logged in
  useEffect(() => {
    // If admin is not logged in, redirect to login page
    if (!checkAdminLoggedIn()) {
      navigate("/adminlogin"); // Redirect to admin login page if not logged in
    }
  }, [navigate]); // The effect runs whenever 'navigate' changes

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-2">
          {/* Sidebar */}
          <nav className="navbar navbar-expand-lg navbar-light" id="sidebarNav">
            <div className="container-fluid">
              {/* Navbar toggle button for mobile view */}
              <button
                ref={navbarTogglerRef} // Assigning reference for the toggle button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav" // Target the navbar collapse container
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span> {/* Hamburger icon */}
              </button>

              {/* Navbar collapse section containing links */}
              <div
                className="collapse navbar-collapse"
                ref={navbarCollapseRef} // Assigning reference for the collapse container
                id="navbarNav"
              >
                <ul className="navbar-nav mx-3 mt-4">
                  {/* Sidebar navigation links */}
                  <li className="nav-item">
                    <Link
                      to="/admin/dashboard" // Link to the dashboard route
                      className="nav-link fw-bold"
                      onClick={closeNavbar} // Close navbar on link click
                    >
                      <i className="fa-solid fa-house"></i> {/* Dashboard icon */}
                      Main dashboard
                    </Link>
                  </li>
                  
                  <li className="nav-item">
                    <Link
                      to="/admin/products" // Link to the products route
                      className="nav-link fw-bold"
                      onClick={closeNavbar}
                    >
                      <i className="fa-solid fa-box"></i> {/* Product icon */}
                      Products
                    </Link>
                  </li>
                  
                  <li className="nav-item">
                    <Link
                      to="/admin/addproducts" // Link to the add product route
                      className="nav-link fw-bold"
                      onClick={closeNavbar}
                    >
                      <i className="fa-solid fa-tag"></i> {/* Add product icon */}
                      Add Product
                    </Link>
                  </li>
                  <li className="nav-item">
                    {/* Logout Button */}
                    <button
                      onClick={logout} // Call the logout function
                      className="btn btn-dark mt-2 logout-btn"
                    >
                      Logout {/* Button text */}
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          {/* End of Sidebar */}
        </div>

        <div className="col-lg-10">
          {/* Outlet renders the child routes in the admin section */}
          <Outlet /> 
        </div>
      </div>
    </div>
  );
}

export default Admin;
