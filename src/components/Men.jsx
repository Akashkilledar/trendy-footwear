import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component"; // Import LazyLoadImage for lazy loading images
import "react-lazy-load-image-component/src/effects/blur.css"; // Import blur effect for images during loading
import MenSkeletonLoader from "./reuseable-code/MenSkeletonLoader"; // Import skeleton loader component for loading state

function Men() {
  const [loading, setLoading] = useState(true); // State to track if data is still loading

  // useEffect hook to simulate loading state for 1 second
  useEffect(() => {
    setTimeout(() => {
      setLoading(false); // Set loading state to false after 1 second
    }, 1000);
  }, []);

  // Array of product data for the Men category
  const products = [
    {
      imgSrc: "https://coolfootwear.netlify.app/images/item-4.jpg", // Image URL
      title: "Russ Men's Sneakers", // Product title
      price: "$49.00", // Product price
    },
    {
      imgSrc: "https://coolfootwear.netlify.app/images/item-6.jpg",
      title: "Boots Shoes Maca",
      price: "$25.87",
    },
    {
      imgSrc: "https://coolfootwear.netlify.app/images/item-8.jpg",
      title: "Men's Leather Moccasin",
      price: "$16.40",
    },
    {
      imgSrc: "https://coolfootwear.netlify.app/images/item-9.jpg",
      title: "Men's Boots Shoes",
      price: "$48.18",
    },
  ];

  return (
    <>
      {/* Breadcrumb navigation for user-friendly navigation */}
      <div className="breadcrumbs">
        <div className="container">
          <div className="row">
            <div className="col">
              <p className="bread fw-bold">
                {/* Link to the Home page */}
                <span>
                  <Link to="/" className="pointer-cursor">
                    Home
                  </Link>
                </span>{" "}
                / <span>Men</span> {/* Current page (Men category) */}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Section with header and menu links for the Men category */}
      <div className="breadcrumbs-two">
        <div className="container-fluid">
          <div className="row special">
            <div className="col">
              <div className="breadcrumbs-img breadcrumbs-men">
                {/* Title for Men category */}
                <h2>Men's</h2>
              </div>
              <div className="menu text-center">
                {/* Category-specific links (e.g., New Arrivals, Best Sellers, etc.) */}
                <p>
                  <Link to="#">New Arrivals</Link>{" "}
                  <Link to="#">Best Sellers</Link>{" "}
                  <Link to="#">Extended Widths</Link> <Link to="#">Sale</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product listing section */}
      <div className="container-fluid">
        <div className="special">
          <div className="row">
            {/* Map through products, showing skeleton loaders when loading */}
            {loading
              ? Array(4) // Create an array with 4 empty elements (one for each product)
                  .fill(0)
                  .map((_, index) => (
                    <div
                      key={index} // Key for each skeleton loader
                      className="col-lg-3 col-md-6 col-sm-12 mb-2"
                    >
                      <MenSkeletonLoader /> {/* Skeleton loader for each product */}
                    </div>
                  ))
              : products.map((product, index) => (
                  <div
                    className="col-lg-3 col-md-6 col-sm-12 d-flex justify-content-center align-items-center mb-2"
                    key={index} // Key for each product card
                  >
                    <div className="product-card text-center p-2">
                      {/* Lazy load product image with blur effect */}
                      <LazyLoadImage
                        alt={product.title} // Alt text for accessibility
                        src={product.imgSrc} // Image source (URL)
                        effect="blur" // Adds blur effect while loading
                      />
                      <h4>{product.title}</h4> {/* Product title */}
                      <h5>{product.price}</h5> {/* Product price */}
                      {/* Link to the 'All Products' page */}
                      <Link to="/allproducts">
                        <button className="btn btn-dark">Go to products</button>
                      </Link>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Men;
