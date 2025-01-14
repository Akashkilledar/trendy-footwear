import React from "react";

// Skeleton Loader for Men Page
const AllProductSkeletonLoader = () => {
  return (
    <div id="allproducts-skeleton">
      {/* Main container for product listing */}
      <div className="container-fluid">
        <div className="special">
          <div className="row">
            {/* Single Product Card Skeleton */}
            <div className="col-lg-3 d-flex justify-content-center align-items-center mb-2">
              {/* Product card container with skeleton styles */}
              <div className="product-card-skeleton text-center p-2 d-flex flex-column align-items-center justify-content-center">
                {/* Skeleton for the product image */}
                <div className="skeleton-image d-flex justify-content-center align-items-center">
                  {/* Placeholder icon for image */}
                  <svg
                    className="w-25 h-25 text-secondary"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 18"
                  >
                    {/* SVG path representing a placeholder image icon */}
                    <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                  </svg>
                </div>

                {/* Skeleton line for product title */}
                <div className="skeleton-line skeleton-title"></div>

                {/* Skeleton line for product subtitle (e.g., brand, description) */}
                <div className="skeleton-line skeleton-subtitle"></div>

                {/* Skeleton line for product price */}
                <div className="skeleton-line skeleton-price"></div>

                {/* Skeleton button to represent the 'Add to Cart' or similar action */}
                <div className="skeleton-button"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProductSkeletonLoader;
