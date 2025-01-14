import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function ThankYouPage() {
  const navigate = useNavigate(); // Hook to navigate programmatically

  

  return (
    <>
      {/* Breadcrumb navigation */}
      <div className="breadcrumbs">
        <div className="container">
          <div className="row">
            <div className="col">
              <p className="bread fw-bold ">
                <span>
                  {/* Link to the homepage */}
                  <Link to={"/"} className="pointer-cursor">
                    Home
                  </Link>
                </span>{" "}
                / <span>Purchase complete</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main content of the page */}
      <div className="container">
        <div className="row purchase-page text-center mb-5">
          <div>
            <div>
              {/* Icon indicating success (order completed) */}
              <i className="fa-solid fa-check"></i>
            </div>
            <h1>Thank you for purchasing, Your order is complete</h1>

            {/* Button to navigate to the user's orders */}
            <Link to="/">
              <button className="btn border border-dark me-3 mb-3">
                Continue to Home Page
              </button>
            </Link>

            {/* Button to continue shopping */}
            <Link to="/allproducts">
              <button className="btn border border-dark mb-3">
                <i className="fas fa-shopping-cart me-2 "></i>Continue Shopping
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default ThankYouPage;
