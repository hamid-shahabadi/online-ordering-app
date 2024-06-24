import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { CartContext } from "../context/CartContext";

const Header = () => {
  const { cart } = useContext(CartContext);

  return (
    <nav className="header-nav">
      <ul>
        <li>
          <Link to="/">List</Link>
        </li>
        <li>
          <Link to="/cart">Cart {cart.length > 0 ? `(${cart.length})` : ``}</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Header;