import { Link, useNavigate } from "react-router-dom";  // Importing necessary components for routing
import logo from "../assets/images/images-removebg-preview.png";  // Import logo image
import { useSelector } from "react-redux";  // Importing useSelector to access Redux store
import { useRef } from "react";  // Import useRef to handle references

function Header() {
  // Using Redux to access cart products from the store
  const cartProducts = useSelector((state) => state.cart.cartProducts);
  
  // useNavigate hook to navigate programmatically between routes
  const navigate = useNavigate();

  // Create refs for toggler button and collapsible navbar to control collapse state
  const navbarTogglerRef = useRef(null);
  const navbarCollapseRef = useRef(null);

  // Function to close the navbar when a link is clicked
  const closeNavbar = () => {
    // Check if the navbar is open (i.e., has class "show")
    if (navbarCollapseRef.current.classList.contains("show")) {
      // Simulate a click on the toggler to close the navbar
      navbarTogglerRef.current.click();
    }
  };



  return (
    <>
      <div className="container-fluid" id="header">
        <div className="special">
          <nav className="navbar navbar-expand-lg navbar-light mt-2">
            <div className="container-fluid">
              {/* Logo and home link */}
              <Link to="/" className="navbar-brand">
                <img src={logo} alt="Logo" />
              </Link>

              {/* Navbar toggler button for mobile view */}
              <button
                ref={navbarTogglerRef}
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>

              {/* Navbar collapse (links and other elements) */}
              <div
                className="collapse navbar-collapse"
                ref={navbarCollapseRef}
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  {/* Navigation links */}
                  <li className="nav-item dropdown">
                    <Link
                      to="/men"
                      className="nav-link text-dark"
                      onClick={closeNavbar}  // Close navbar when link is clicked
                    >
                      <i className="fa-solid fa-person"></i>
                      Mens
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/women"
                      className="nav-link text-dark"
                      onClick={closeNavbar}
                    >
                      <i className="fa-solid fa-person-dress"></i>
                      Womens
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/allproducts"
                      className="nav-link text-dark"
                      onClick={closeNavbar}
                    >
                      <i className="fa-solid fa-box"></i>
                      All Products
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/about"
                      className="nav-link text-dark"
                      onClick={closeNavbar}
                    >
                      <i className="fa-solid fa-circle-info"></i>
                      About
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/contact"
                      className="nav-link text-dark"
                      onClick={closeNavbar}
                    >
                      <i className="fa-solid fa-globe"></i>
                      Contact
                    </Link>
                  </li>
                </ul>

                {/* Right-aligned section for cart and login */}
                <ul
                  className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex"
                  id="cart"
                >
                  {/* Cart icon with product count */}
                  <li className="nav-item position-relative">
                    <Link
                      to="/cart"
                      className="nav-link text-dark"
                      onClick={closeNavbar}
                    >
                      <i className="fas fa-shopping-cart me-1"></i>
                      <span className="badge bg-danger position-absolute top-0 start-100 translate-middle">
                        {cartProducts.length}  {/* Display number of items in cart */}
                      </span>
                      <span className="d-none cart-show">
                        <i className="fa-solid fa-cart-shopping"></i>
                        Cart{" "}
                        <span className="text-danger">
                          [{cartProducts.length}]  {/* Show item count next to "Cart" */}
                        </span>
                      </span>
                    </Link>
                  </li>

                </ul>
              </div>
            </div>
          </nav>
        </div>

        {/* Sale announcement banner */}
        <div className="sale">
          <div className="container">
            <div className="row">
              <div className="col-sm-8 offset-sm-2 text-center">
                <div className="row">
                  <div className="owl-carousel2">
                    <div className="item">
                      <div className="col sale-info">
                        {/* Sale info banner with link */}
                        <h3 className="default-info">
                          <a href="/nothing">
                            25% off (Almost) Everything! Use Code: Summer sale
                          </a>
                        </h3>
                        <h3 className="hidden-info">Hurry up!</h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
