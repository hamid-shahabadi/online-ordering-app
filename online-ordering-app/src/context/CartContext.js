import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

// if local storage has the values for cart grab it from there else initialize to empty array
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  //everytime cart changes update local storage with the new cart state value
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  //empty the cart
  const emptyCart = () => {
    setCart([]);
  };

  //add item to cart
  const addItemToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      return existingItem ? prevCart : [...prevCart, { ...item, quantity: 1 }];
    });
  };

  //add item to cart but if the item already exists in cart then just increment the value
  const addItemToCartAndIncrement = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      return existingItem
        ? prevCart.map((cartItem) =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
          )
        : [...prevCart, { ...item, quantity: 1 }];
    });
  };

  // remove an item from the cart based on its id
  const removeItemFromCart = (itemId) => {
    setCart(cart.filter((item) => item.id !== itemId));
  };

  //increment the item by 1 based on its id
  const incrementItemQuantity = (itemId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  //decrement the item by 1 based on its id
  const decrementItemQuantity = (itemId) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addItemToCart,
        removeItemFromCart,
        incrementItemQuantity,
        decrementItemQuantity,
        addItemToCartAndIncrement,
        emptyCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
