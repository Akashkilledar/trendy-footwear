import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../redux/cart/cartSlice";
import AllProductsSkeletonLoader from "./reuseable-code/AllProductsSkeletonLoader";
import { LazyLoadImage } from "react-lazy-load-image-component"; // Import LazyLoadImage for optimized image loading
import "react-lazy-load-image-component/src/effects/blur.css"; // Import blur effect during image load

const AllProducts = () => {
  const [products, setProducts] = useState([]); // State to hold the list of products
  const [loading, setLoading] = useState(true); // State to manage loading status
  const dispatch = useDispatch(); // Dispatch hook to dispatch actions
  const [hasScrolled, setHasScrolled] = useState(false); // State to track if the user has scrolled
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [pageRange, setPageRange] = useState([1, 10]); // Page range (1-10, 11-20, etc.)
  const [filters, setFilters] = useState({
    // State to hold the selected filter values
    category: "",
    brand: "",
    size: "",
    sort: "",
  });

  // Function to fetch products from the API
  const fetchProducts = async () => {
    try {
      setLoading(true); // Set loading to true before fetching
      const response = await axios.get(import.meta.env.VITE_API_KEY); // Make API request using the API key
      if (response && response.data) {
        setProducts(response.data); // Set the products state with the response data
        setTotalPages(Math.ceil(response.data.length / 12)); // Use Math.ceil to round up the total pages
      }
    } catch (error) {
      console.error("Error fetching products:", error); // Log error if API request fails
    } finally {
      setLoading(false); // Set loading to false once fetching is done
    }
  };

  useEffect(() => {
    fetchProducts(); // Fetch products when the component mounts
    window.scrollTo(0, 0);
  }, [page]);

  const selectPageHandler = (selectedPage) => {
    // Check if the selected page is within the valid range and not the current page
    if (
      selectedPage >= 1 && // The selected page must be at least 1
      selectedPage <= totalPages && // The selected page must not exceed the total number of pages
      selectedPage !== page // The selected page must be different from the current page
    )
      // If the conditions are met, update the current page state
      setPage(selectedPage);
  };

  // Function to reset the filter values to default (empty strings)
  const resetFilters = () => {
    setFilters({ category: "", brand: "", size: "", sort: "" });
  };

  // Function to handle adding a product to the cart
  const handleAddToCart = (product) => {
    const { id, imageUrl, title, price } = product; // Destructure product properties
    dispatch(addProduct({ id, imageUrl, title, price, quantity: 1 })); // Dispatch addProduct action to add item to cart
  };

  
  // Apply filters on the list of products
  const filteredProducts = products
    .filter(
      (product) =>
        (filters.category === "" || product.category === filters.category) &&
        (filters.brand === "" || product.brand === filters.brand) &&
        (filters.size === "" || product.size === filters.size)
    )
    .sort((a, b) => {
      if (filters.sort === "lowToHigh") return a.price - b.price; // Sort price from low to high
      if (filters.sort === "highToLow") return b.price - a.price; // Sort price from high to low
      return 0; // No sorting
    });

  // Apply pagination after filtering
  const displayedProducts = filteredProducts.slice((page - 1) * 12, page * 12);

  // Update page range based on the current page
  const updatePageRange = (currentPage) => {
    // Calculate the starting page of the range
    // - Subtract 1 from currentPage to make it 0-based
    // - Divide by 10 to determine the block of pages (each block has 10 pages)
    // - Multiply by 10 to get the starting page of the block
    // - Add 1 to make the starting page 1-based
    const startPage = Math.floor((currentPage - 1) / 10) * 10 + 1;

    // Calculate the ending page of the range
    // - Add 9 to the startPage to get a range of 10 pages (startPage to startPage + 9)
    // - Ensure the end page doesn't exceed totalPages by using Math.min
    const endPage = Math.min(startPage + 9, totalPages);

    // Set the calculated page range (from startPage to endPage)
    setPageRange([startPage, endPage]);
  };

  // useEffect to update page range and scroll to top whenever the page or totalPages changes
  useEffect(() => {
    // Update the page range whenever the current page changes
    updatePageRange(page);

    // Scroll the window to the top to ensure the user sees the top of the page range
    window.scrollTo(0, 0);
  }, [page, totalPages]); // Dependencies: this effect runs whenever 'page' or 'totalPages' changes

  // Function to go to the next page range (next 10 pages)
  const goToNextRange = () => {
    // Calculate the starting page for the next range (one page after the last page in the current range)
    const newStartPage = pageRange[1] + 1;

    // If the new start page is within the valid range (not exceeding totalPages), update the current page
    if (newStartPage <= totalPages) {
      setPage(newStartPage); // Set the new page
    }
  };

  // Function to go to the previous page range (previous 10 pages)
  const goToPreviousRange = () => {
    // Calculate the starting page for the previous range (10 pages before the current start page)
    const newStartPage = pageRange[0] - 12;

    // If the new start page is greater than 0, update the current page
    if (newStartPage > 0) {
      setPage(newStartPage); // Set the new page
    }
  };

  useEffect(() => {
    const handleScroll = () => {
        if (!hasScrolled) {
          setHasScrolled(true); // Mark as scrolled to prevent future modals
        }
    };

    window.addEventListener("scroll", handleScroll); // Add scroll event listener to show modal on scroll

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasScrolled]);

  

  return (
    <>
      <div className="breadcrumbs">
        <div className="container">
          <div className="row">
            <div className="col">
              <p className="bread fw-bold">
                <span>
                  <Link to="/" className="pointer-cursor">
                    Home
                  </Link>
                </span>{" "}
                / <span>All Products</span>
              </p>
            </div>
          </div>
        </div>
      </div>

     

      {/* Filter section for sorting products */}
      <div className="filter mb-3">
        <label className="form-label me-3 mt-1">
          <b>Sort By:</b>
        </label>
        <select
          className="form-control fs-5"
          onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
          value={filters.sort}
        >
          <option value="">Featured</option>
          <option value="lowToHigh">Price: Low to High</option>
          <option value="highToLow">Price: High to Low</option>
        </select>
      </div>

      <div className="container-fluid" id="addProduct">
        <div className="special">
          <div className="row">
            {/* Sidebar filter section for category, brand, and size */}
            <div className="col-lg-3">
              <div className="side border border-dark mb-1">
                <h3>Category</h3>
                <ul>
                  {["All", "Male", "Female", "Kid"].map((category) => (
                    <li
                      key={category}
                      onClick={() => {
                        if (category === "All") {
                          resetFilters();
                        } else {
                          setFilters({ ...filters, category });
                        }
                      }}
                    >
                      <Link to="#">{category}</Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="side border border-dark mb-2">
                <h3>Brand</h3>
                <ul>
                  {["All", "Nike", "Adidas", "Bata", "Puma"].map((brand) => (
                    <li
                      key={brand}
                      onClick={() => {
                        if (brand === "All") {
                          resetFilters();
                        } else {
                          setFilters({ ...filters, brand });
                        }
                      }}
                    >
                      <Link to="#">{brand}</Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="block-26 mb-5 side border border-dark">
                <h3>Size</h3>
                <ul>
                  {["All", "3", "4", "5", "6", "7", "8", "9", "10"].map(
                    (size) => (
                      <li
                        key={size}
                        onClick={() => {
                          if (size === "All") {
                            resetFilters();
                          } else {
                            setFilters({ ...filters, size });
                          }
                        }}
                      >
                        <Link>{size}</Link>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>

            {/* Products Display */}
            <div className="col-lg-9">
              <div className="row d-flex justify-content-around">
                {loading
                  ? // Show SkeletonLoader for each product card while loading
                    Array(9) // Replace with filteredProducts.length or dynamically based on your requirement
                      .fill(0)
                      .map((_, index) => (
                        <div
                          key={index}
                          className="col-lg-4 col-md-6 col-sm-12 mb-4"
                        >
                          <AllProductsSkeletonLoader />
                        </div>
                      ))
                  : displayedProducts.length > 0 &&
                    displayedProducts.map((product, index) => (
                      <div
                        key={index}
                        className="col-lg-4 col-md-6 col-sm-12 mb-4 d-flex justify-content-center align-items-center"
                      >
                        <div className="card bg-white h-100 allProduct text-dark">
                          <div className="card-body">
                           

                            {/* Product Details */}
                            <Link to={`/productdetail/${product.id}`}>
                              <LazyLoadImage
                                src={product.imageUrl} // Image source
                                alt={product.title}
                                width="200"
                                height="150"
                                className="mb-2"
                                effect="blur" // Optional: Adds a blur effect while loading
                              />
                              <h5 className="card-title fw-bold text-dark">
                                {product.title}
                              </h5>
                              <h5 className="text-dark">{product.brand}</h5>
                              <p className="card-text">
                                <span className="fw-bold text-success m-1 fs-5">
                                  &#8377;{product.price}&nbsp;
                                </span>
                                <del className="text-danger">
                                  &#8377;{product.mrp}
                                </del>
                              </p>
                            </Link>
                            <button
                              className="btn btn-dark"
                              onClick={() => handleAddToCart(product)}
                            >
                              Add to cart
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
              </div>
              {/* Pagination Controls */}
              {displayedProducts.length > 0 && (
                <div className="pagination">
                  {/* Previous Range Button */}
                  <span
                    onClick={goToPreviousRange}
                    className={pageRange[0] > 1 ? "" : "pagination__disabled"}
                  >
                    Previous
                  </span>
                  <span
                    onClick={() => selectPageHandler(page - 1)}
                    className={page > 1 ? "" : "pagination__disabled"}
                  >
                    ◀️
                  </span>
                  {[...Array(totalPages)].map((_, i) => {
                    return (
                      <span
                        className={page === i + 1 ? "pagination__selected" : ""}
                        onClick={() => selectPageHandler(i + 1)}
                        key={i}
                      >
                        {i + 1}
                      </span>
                    );
                  })}
                  <span
                    className={page < totalPages ? "" : "pagination__disabled"}
                    onClick={() => selectPageHandler(page + 1)}
                  >
                    ▶️
                  </span>
                  {/* Next Range Button */}
                  <span
                    onClick={goToNextRange}
                    className={
                      pageRange[1] < totalPages ? "" : "pagination__disabled"
                    }
                  >
                    Next
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllProducts;
