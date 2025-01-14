import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

function Products() {
  const [productData, setProductData] = useState([]); // All product data
  const [filteredData, setFilteredData] = useState([]); // Filtered product data
  const [loading, setLoading] = useState(true); // Loading state
  const [searchTerm, setSearchTerm] = useState(""); // Search term

  const getData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(import.meta.env.VITE_API_KEY); // Fetch data from API
      setProductData(res.data); // Set product data
      setFilteredData(res.data); // Set filtered data
    } catch (error) {
      console.error("Error fetching product data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          console.log(`Deleting product with ID: ${id}`);
          await axios.delete(`${import.meta.env.VITE_API_KEY}/${id}`);
          Swal.fire("Deleted!", "The product has been deleted.", "success");
          getData(); // Refresh the product list
        } catch (error) {
          console.error("Error deleting product:", error);
          Swal.fire("Error", "Failed to delete the product. Try again.", "error");
        }
      }
    });
  };

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term === "") {
      setFilteredData(productData);
    } else {
      const filtered = productData.filter((product) => {
        return (
          product.id.toString().includes(term) ||
          product.title.toLowerCase().includes(term.toLowerCase()) ||
          product.brand.toLowerCase().includes(term.toLowerCase()) ||
          product.category.toLowerCase().includes(term.toLowerCase()) ||
          product.price.toString().includes(term)
        );
      });
      setFilteredData(filtered);
    }
  };

  return (
    <>
      {/* Breadcrumb navigation */}
      <div className="breadcrumbs">
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <p className="bread fw-bold ">
                <span>
                  <Link to={"/admin/dashboard"}>Admin</Link>
                </span>{" "}
                / <span>Products</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search bar */}
      <div className="container-fluid mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by Product ID, Title, Brand, Category or Price."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      {/* Loading spinner or product table */}
      {loading ? (
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading products...</p>
        </div>
      ) : (
        <div className="container-fluid">
          {filteredData.length === 0 && searchTerm !== "" ? (
            <div className="alert alert-warning">
              No results found for "{searchTerm}"
            </div>
          ) : filteredData.length === 0 ? (
            <div className="alert alert-info">No products available.</div>
          ) : null}

          <div className="row t-responsive">
            <table className="table table-bordered border-dark text-center table-responsive">
              <thead className="thead">
                <tr>
                  <th>#</th>
                  <th>Product ID</th>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Brand</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>MRP</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((value, i) => (
                  <tr key={value.id} className="fw-bold ">
                    <td>{i + 1}</td>
                    <td>{value.id}</td>
                    <td style={{ width: "250px" }}>
                      <img
                        src={value.imageUrl}
                        alt={value.title}
                        height={"100px"}
                        loading="lazy"
                      />
                    </td>
                    <td>{value.title}</td>
                    <td>{value.brand}</td>
                    <td>{value.category}</td>
                    <td>&#8377;{value.price}</td>
                    <td>
                      <del>&#8377;{value.mrp}</del>
                    </td>
                    <td style={{ width: "250px" }}>
                      <Link to={`/admin/addproducts/${value.id}`}>
                        <button className="btn btn-primary m-1">Edit</button>
                      </Link>
                      <button
                        onClick={() => handleDelete(value.id)}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}

export default Products;
