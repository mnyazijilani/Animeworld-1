import React from "react";
import { useCart } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
  } = useCart();
  const navigate = useNavigate();

  const imagepath = "https://hildahmbuni.alwaysdata.net/static/images/";

  const handleCheckout = () => {
    if (cartItems.length > 0) {
      // Navigate to payment with cart items
      navigate("/makepayment", {
        state: { cartItems, totalPrice: getTotalPrice() },
      });
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mt-5">
        <div className="text-center">
          <h2 className="text-info">Your Cart is Empty</h2>
          <p className="text-muted">Add some products to get started!</p>
          <button
            className="btn btn-primary glass-btn"
            onClick={() => navigate("/")}
          >
            Continue Shopping
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h1 className="text-info mb-4">Shopping Cart</h1>

      <div className="row">
        <div className="col-md-8">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="card mb-3 shadow glass-form-card glass-cart-card"
            >
              <div className="card-body">
                <div className="row">
                  <div className="col-md-3">
                    <img
                      src={imagepath + item.product_photo}
                      alt={item.product_name}
                      className="img-fluid rounded"
                      style={{ height: "150px", objectFit: "cover" }}
                    />
                  </div>
                  <div className="col-md-6">
                    <h5 className="card-title text-info">
                      {item.product_name}
                    </h5>
                    <p className="card-text">{item.product_description}</p>
                    <p className="card-text">
                      <strong>Ksh {item.product_cost}</strong>
                    </p>
                  </div>
                  <div className="col-md-3">
                    <div className="d-flex align-items-center mb-2">
                      <button
                        className="btn btn-outline-secondary btn-sm glass-btn"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                      >
                        -
                      </button>
                      <span className="mx-3">{item.quantity}</span>
                      <button
                        className="btn btn-outline-secondary btn-sm glass-btn"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                    <p className="mb-2">
                      <strong>
                        Subtotal: Ksh {item.product_cost * item.quantity}
                      </strong>
                    </p>
                    <button
                      className="btn btn-danger btn-sm glass-btn"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="col-md-4">
          <div className="card shadow glass-form-card glass-cart-card">
            <div className="card-body">
              <h5 className="card-title text-info">Order Summary</h5>
              <hr />
              <div className="d-flex justify-content-between mb-2">
                <span>Total Items:</span>
                <span>
                  {cartItems.reduce((total, item) => total + item.quantity, 0)}
                </span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <strong>Total Price:</strong>
                <strong>Ksh {getTotalPrice()}</strong>
              </div>
              <button
                className="btn btn-success w-100 mb-2 glass-btn"
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </button>
              <button
                className="btn btn-outline-danger w-100 mb-2 glass-btn"
                onClick={clearCart}
              >
                Clear Cart
              </button>
              <button
                className="btn btn-outline-primary w-100 glass-btn"
                onClick={() => navigate("/")}
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Cart;
