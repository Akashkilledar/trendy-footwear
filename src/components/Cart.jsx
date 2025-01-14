import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate for programmatic navigation
import { increment, decrement, removeProduct } from "../redux/cart/cartSlice"; // Redux actions for cart manipulation
import { LazyLoadImage } from "react-lazy-load-image-component"; // Lazy loading for images
import "react-lazy-load-image-component/src/effects/blur.css"; // Import blur effect for lazy loading

function Cart() {
  // Accessing cart products from the Redux store
  const cartProducts = useSelector((state) => state.cart.cartProducts);
  const dispatch = useDispatch(); // Dispatch function to send actions to Redux store
  const navigate = useNavigate(); // Initialize useNavigate for navigation after login or checkout

  // State to manage delivery charges, discount, and coupon input
  const [delivery, setDelivery] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [coupon, setCoupon] = useState(""); // User's input for the coupon code
  const [couponError, setCouponError] = useState(""); // Error message for invalid coupon
  const [SubTotal, setSubTotal] = useState(0); // Calculated subtotal for all products in the cart

  // Calculate delivery charges based on the length of the SubTotal
  const length = String(SubTotal).length;
  useEffect(() => {
    if (length === 3)
      setDelivery(40); // Delivery charge for SubTotal in the 100-999 range
    else if (length === 4)
      setDelivery(70); // Delivery charge for SubTotal in the 1000-9999 range
    else if (length === 5)
      setDelivery(100); // Delivery charge for SubTotal in the 10000-99999 range
    else if (length > 5)
      setDelivery(150); // Delivery charge for SubTotal greater than 99999
    else setDelivery(0); // No delivery charge if SubTotal is less than 100
  }, [SubTotal, length]); // Re-run this effect whenever SubTotal or length changes

  // Update coupon input value and reset error message on change
  const handleChange = (e) => {
    setCoupon(e.target.value);
    setCouponError("");
  };

  // Recalculate SubTotal whenever cartProducts change
  useEffect(() => {
    if (cartProducts) {
      setSubTotal(
        cartProducts.reduce((total, product) => {
          return total + product.price * product.quantity; // Calculate total cost for each product
        }, 0)
      );
    }
  }, [cartProducts]); // Recalculate SubTotal when cartProducts change

  // Apply the coupon if valid
  const applyCoupon = () => {
    const couponValue = Number(coupon);
    if (couponValue > 0 && couponValue <= SubTotal) {
      setDiscount(couponValue); // Apply discount if coupon is valid
      setCouponError(""); // Clear any previous error messages
    } else {
      // Show error message if coupon is invalid or exceeds SubTotal
      setCouponError(
        couponValue > SubTotal
          ? "Coupon cannot be greater than total amount."
          : "Coupon is not valid!"
      );
    }
    setCoupon(""); // Clear the coupon input after applying
  };

  // Handle Enter key for applying the coupon
  const handleKeydown = (e) => {
    if (e.key === "Enter") {
      applyCoupon();
    }
  };

  // Handle checkout logic, checking if user is logged in
  const handleCheckout = () => {
      const finalAmount = SubTotal + delivery - discount; // Calculate final amount after delivery and discount
      const deliveryCharges = delivery; // Pass delivery charges separately
      navigate("/checkout", {
        state: { finalAmount, deliveryCharges }, // Pass the data to the checkout page
      });

  };

  // Check if cart is empty
  const isEmptyCart = cartProducts.length === 0;

  return (
    <div id="cart">
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
                / <span>Cart</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* If the cart is empty, show a message with an image */}
      {isEmptyCart ? (
        <div className="text-center empty-cart">
          <LazyLoadImage
            src="https://i.imgur.com/dCdflKN.png"
            alt="empty-cart"
            effect="blur" // Optional: Adds a blur effect while loading
          />
          <h5>Add something to make me happy :)</h5>
          <Link to="/allproducts">
            <button className="btn btn-primary">Continue shopping</button>
          </Link>
        </div>
      ) : (
        /* If cart is not empty, display cart products and calculation section */
        <div className="container-fluid mt-3">
          {cartProducts.map((product) => (
            <div className="row special" key={product.id}>
              <div className="column">
                <div className="image-container">
                  <Link to={`/productdetail/${product.id}`}>
                    <img src={product.imageUrl} alt="product" />
                  </Link>
                </div>
              </div>
              <div className="column d-flex justify-content-center align-items-center">
                <h5 className="text-combine">{product.title}</h5>
              </div>
              <div className="column">
                <h5>
                  <span className="d-none">Price: </span>&#8377;{product.price}
                </h5>
              </div>
              <div className="column">
                <button
                  onClick={() => dispatch(decrement(product.id))}
                  className="btn btn-secondary me-3"
                >
                  -
                </button>
                {product.quantity}
                <button
                  onClick={() => dispatch(increment(product.id))}
                  className="btn btn-secondary ms-3"
                >
                  +
                </button>
              </div>
              <div className="column">
                <h5>
                  <span className="d-none">Total: </span>&#8377;
                  {product.price * product.quantity}
                </h5>
              </div>
              <div className="column">
                <button
                  onClick={() => dispatch(removeProduct(product.id))}
                  className="btn btn-danger me-3"
                >
                  Remove
                </button>
              </div>
              <hr className="mt-3" />
            </div>
          ))}
          <div className="container" id="calculation">
            <div className="row">
              <div className="col-lg-9 d-flex">
                <div>
                  <input
                    type="text"
                    value={coupon}
                    onChange={handleChange}
                    placeholder="Your Coupon Number 10,50,500..."
                    onKeyDown={handleKeydown}
                  />
                  {couponError && (
                    <span className="text-danger fw-bold">{couponError}</span>
                  )}
                </div>
                <button className="btn btn-secondary" onClick={applyCoupon}>
                  Apply coupon
                </button>
              </div>
              <div className="col-lg-3 text-secondary">
                <div className="calculation">
                  <div className="d-flex justify-content-between">
                    <h5>Subtotal:</h5>
                    <h5>&#8377;{SubTotal}/-</h5>
                  </div>
                  <div className="d-flex justify-content-between">
                    <h5>Delivery:</h5>
                    <h5>&#8377;{delivery}/-</h5>
                  </div>
                  <div className="d-flex justify-content-between">
                    <h5>Discount Amount:</h5>
                    <h5>&#8377;{discount}/-</h5>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between">
                    <h5>Total:</h5>
                    <h5>&#8377;{SubTotal + delivery - discount}/-</h5>
                  </div>
                  <div className="text-center mt-3">
                    <button
                      className="btn btn-primary"
                      onClick={handleCheckout} // Call handleCheckout on click
                    >
                      Proceed to checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
