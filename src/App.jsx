// Importing necessary styles and libraries
import "./assets/style.css"; // Custom CSS styles
import "@fortawesome/fontawesome-free/css/all.min.css"; // FontAwesome icons
import { Route, Routes, useLocation } from "react-router-dom"; // React Router for handling routing
import { useEffect, useState } from "react"; // Hook for handling side-effects

// Importing all components
import Home from "./components/Home";
import Cart from "./components/Cart";
import ProductsDetail from "./components/ProductsDetail";
import AllProducts from "./components/AllProducts";
import Products from "./components/admin/Products";
import Men from "./components/Men";
import Women from "./components/Women";
import AddProducts from "./components/admin/AddProducts";
import Header from "./components/Header";
import Footer from "./components/Footer";
import About from "./components/About";
import Contact from "./components/Contact";
import ThankYouPage from "./components/ThankYouPage";
import Dashboard from "./components/admin/Dashboard";
import AdminLogin from "./components/AdminLogin";
import Checkout from "./components/Checkout";
import Admin from "./components/admin/Admin";
import NotFound from "./components/NotFound";

// App component
function App() {
  // Hook to get the current location for scroll management
  const location = useLocation();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set loading state with a delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []); // This effect only runs once

  // Effect hook to scroll to top of the page on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
      {loading ? (
        <div id="main-page">
          <h1>Trendy Footwear</h1>
        </div>
      ) : (
        <>
          {/* Header component - common across all pages */}
          <Header />

          {/* Main content wrapper */}
          <div className="content-wrapper">
            {/* Define routes for different pages */}
            <Routes>
              {/* Public Routes */}
              {/* Catch-all route for undefined paths */}
              <Route path="*" element={<NotFound />} />{" "}
              {/* This will catch all invalid URLs */}
              <Route path="/" element={<Home />} /> {/* Home page */}
              <Route path="/cart" element={<Cart />} /> {/* Cart page */}
              {/* Product details page */}
              <Route
                path="/productdetail/:id"
                element={<ProductsDetail />}
              />{" "}
              {/* All products page */}
              <Route path="/allproducts" element={<AllProducts />} />{" "}
              <Route path="/men" element={<Men />} /> {/* Men category page */}
              {/* Women category page */}
              <Route path="/women" element={<Women />} />{" "}
              <Route path="/contact" element={<Contact />} />{" "}
              {/* Contact page */}
              <Route path="/about" element={<About />} /> {/* About page */}
              {/* Thank you page after checkout */}
              <Route path="/thankyou" element={<ThankYouPage />} />{" "}
              {/* Admin login page */}
              <Route path="/adminlogin" element={<AdminLogin />} />{" "}
              {/* Checkout page */}
              <Route path="/checkout" element={<Checkout />} />{" "}
              
              {/* Nested routing for Admin related pages */}
              <Route path="/admin" element={<Admin />}>
                {/* Admin Dashboard */}
                <Route path="dashboard" element={<Dashboard />} />{" "}
                {/* Add New Product */}
                <Route path="addproducts" element={<AddProducts />} />{" "}
                {/* Edit Product by ID */}
                <Route path="addproducts/:id" element={<AddProducts />} />{" "}
                {/* View all products */}
                <Route path="products" element={<Products />} />{" "}
               
              </Route>
            </Routes>

            {/* Footer component - common across all pages */}
            <Footer />
          </div>
        </>
      )}
    </>
  );
}

export default App;
