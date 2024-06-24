import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import ItemList from "./components/ItemList";
import ItemDetail from "./components/ItemDetails";
import Cart from "./components/Cart";

import { CartProvider } from "./context/CartContext";
import Header from "./components/Header";

const App = () => (
  <Router>
    <CartProvider>
      <Header />
      <Routes>
        <Route path="/" element={<ItemList />} />
        <Route path="/item/:id" element={<ItemDetail />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </CartProvider>
  </Router>
);

export default App;
