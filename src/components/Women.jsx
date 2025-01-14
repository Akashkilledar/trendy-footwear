import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MenSkeletonLoader from "./reuseable-code/MenSkeletonLoader";
import { LazyLoadImage } from "react-lazy-load-image-component"; // Import LazyLoadImage for lazy loading images
import "react-lazy-load-image-component/src/effects/blur.css"; // Importing blur effect for lazy loading images

function Women() {
  // State to control loading status of products
  const [loading, setLoading] = useState(true);

  // useEffect hook to simulate data loading with a delay
  useEffect(() => {
    setTimeout(() => {
      setLoading(false); // After 1 second, set loading to false (simulate data load)
    }, 1000);
  }, []);

  // Array containing product data for Women's section
  const products = [
    {
      id: 1,
      imageUrl: "https://coolfootwear.netlify.app/images/item-1.jpg",
      title: "Women Winter Shoes 2",
      price: "$39.00",
    },
    {
      id: 2,
      imageUrl: "https://coolfootwear.netlify.app/images/item-2.jpg",
      title: "Women Heels Sandal (Beige, 7)",
      price: "$12.47",
    },
    {
      id: 3,
      imageUrl: "https://coolfootwear.netlify.app/images/item-10.jpg",
      title: "Womens Ethnic Sandel",
      price: "$15.80",
    },
    {
      id: 4,
      imageUrl: "https://coolfootwear.netlify.app/images/item-5.jpg",
      title: "Women's Boots Shoes Maca",
      price: "$45.17",
    },
  ];

  return (
    <>
      {/* Breadcrumb Navigation */}
      <div className="breadcrumbs">
        <div className="container">
          <div className="row">
            <div className="col">
              <p className="bread fw-bold">
                <span>
                  <Link to="/" className="pointer-cursor">Home</Link>
                </span>{" "}
                / <span>Women</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Section for Women Category Title and Links */}
      <div className="breadcrumbs-two">
        <div className="container-fluid">
          <div className="row special">
            <div className="col">
              <div className="breadcrumbs-img breadcrumbs-women">
                <h2>Women's</h2> {/* Title for Women Category */}
              </div>
              <div className="menu text-center">
                <p>
                  {/* Menu Links for Filtering Products */}
                  <Link to="#">New Arrivals</Link>{" "}
                  <Link to="#">Best Sellers</Link>{" "}
                  <Link to="#">Extended Widths</Link> <Link to="#">Sale</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Display Section */}
      <div className="container-fluid">
        <div className="special">
          <div className="row">
            {/* Conditional rendering based on loading state */}
            {loading
              ? Array(4) // Display loading skeletons when loading
                  .fill(0)
                  .map((_, index) => (
                    <div key={index} className="col-lg-3 col-md-6 col-sm-12 mb-4">
                      <MenSkeletonLoader /> {/* Skeleton loader for product cards */}
                    </div>
                  ))
              : products.map((product) => (
                  // Map over the products array to display product cards once loaded
                  <div
                    key={product.id}
                    className="col-lg-3 col-md-6 col-sm-12 d-flex justify-content-center align-items-center mb-2"
                  >
                    <div className="product-card text-center p-2">
                      {/* Lazy loading image with blur effect */}
                      <div>
                        <LazyLoadImage
                          alt={product.title}
                          src={product.imageUrl} // Image source URL
                          effect="blur" // Adds blur effect while image is loading
                        />
                      </div>
                      {/* Product details */}
                      <h4>{product.title}</h4>
                      <h5>{product.price}</h5>
                      {/* Link to product page */}
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

export default Women;
