import React, { useEffect } from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  // useEffect hook to scroll to the top of the page when the component loads
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <>
      {/* Breadcrumb navigation to indicate the user's current location */}
      <div className="breadcrumbs">
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <p className="bread fw-bold ">
                <span>
                  {/* Link to the Admin home page */}
                  <Link to={""}>Admin</Link>
                </span>{" "}
                / <span>Dashboard</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main content of the Dashboard */}
      <div className="container-fluid dashboard">
        <div className="row">
          
          {/* Card for Users section */}
          <div className="col-lg-4 d-flex justify-content-center align-items-center mb-3">
            <div className="card text-center">
              <div>
                {/* Icon for Users */}
                <img
                  src="https://cdn-icons-png.flaticon.com/512/33/33308.png"
                  alt="Users Icon"
                  width="99px"
                />
              </div>
              <div className="card-body">
                <hr />
                {/* Link to the Users data page */}
                <Link to="/admin/userdata">
                  <button className="btn btn-secondary">Users</button>
                </Link>
              </div>
            </div>
          </div>

          {/* Card for Products section */}
          <div className="col-lg-4 d-flex justify-content-center align-items-center mb-3">
            <div className="card text-center">
              <div>
                {/* Icon for Products */}
                <img
                  className="img-burn mt-1"
                  src="https://cdn-icons-png.flaticon.com/512/709/709488.png"
                  alt="Products Icon"
                  width="99px"
                />
              </div>
              <div className="card-body">
                <hr />
                {/* Link to the Products management page */}
                <Link to="/admin/products">
                  <button className="btn btn-secondary">Products</button>
                </Link>
              </div>
            </div>
          </div>

          {/* Card for Orders section */}
          <div className="col-lg-4 d-flex justify-content-center align-items-center">
            <div className="card text-center">
              <div>
                {/* Icon for Orders */}
                <img
                  className="mt-1"
                  src="https://cdn1.iconfinder.com/data/icons/e-commerce-223/48/20-512.png"
                  alt="Orders Icon"
                  width="99px"
                />
              </div>
              <div className="card-body">
                <hr />
                {/* Link to the User Orders management page */}
                <Link to="/admin/userorders">
                  <button className="btn btn-secondary">Orders</button>
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default Dashboard;
