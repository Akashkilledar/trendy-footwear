import React from "react";

//To show loading animation while page takes to long to render
const Loader = () => (
  <div className="overlay-effect">
    <div className="loading-spinner"></div>
  </div>
);

export default Loader;
