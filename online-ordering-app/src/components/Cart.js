import "./Cart.css";
import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";

const Cart = () => {
  const {
    cart,
    removeItemFromCart,
    incrementItemQuantity,
    decrementItemQuantity,
    emptyCart,
  } = useContext(CartContext);
  const [showPopup, setShowPopup] = useState(false);

  const closeCompleteOrderPopUp = () => {
    setShowPopup(false);
    emptyCart();
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <>
      <h2>Shopping Cart</h2>
      <div className="ItemList">
        {/* show all the items in the cart right now */}
        {cart.map((item) => (
          <div key={item.id} className="item">
            <img src={item.imageUrl} alt={item.name} />
            <h3>{item.name}</h3>
            <p>Quantity: {item.quantity}</p>
            <p>{item.price / 100}$</p>

            <button
              className="btn btn-2"
              onClick={() => decrementItemQuantity(item.id)}
            >
              -
            </button>

            <button
              className="btn btn-1"
              onClick={() => incrementItemQuantity(item.id)}
            >
              +
            </button>
            <button
              className="btn btn-3"
              onClick={() => removeItemFromCart(item.id)}
            >
              Remove from Cart
            </button>
          </div>
        ))}
      </div>
      {/* if the cart is not emptry then allow the user to complete the order else show the message to add something to the cart first*/}
      {cart.length > 0 ? (
        <div className="order-complete">
          <h3>Total Price: ${(totalPrice / 100).toFixed(2)}</h3>
          <button
            onClick={() => {
              setShowPopup(true);
            }}
          >
            Complete Order
          </button>
        </div>
      ) : (
        <p className="emptyCartMessage">
          Shopping cart is empty <br />
          Add something to your shopping cart from the "List" page
        </p>
      )}
      {showPopup && (
        <div className="popup">
          <h2>Order was sent</h2>
          <ul>
            {cart.map((item) => (
              <li key={item.id}>
                {item.name} - Quantity: {item.quantity} - Price: $
                {((item.price * item.quantity) / 100).toFixed(2)}
              </li>
            ))}
          </ul>
          <h3>Total: ${(totalPrice / 100).toFixed(2)}</h3>
          <button onClick={() => closeCompleteOrderPopUp()}>Close</button>
        </div>
      )}
    </>
  );
};

export default Cart;
