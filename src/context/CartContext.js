// src/context/CartContext.js
import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item, quantity = 1) => {
    const qty = parseInt(quantity) || 1;
    setCartItems((prev) => {
      const existingItem = prev.find((i) => i.name === item.name);
      if (existingItem) {
        return prev.map((i) =>
          i.name === item.name
            ? { ...i, quantity: i.quantity + qty }
            : i
        );
      }
      return [...prev, { ...item, quantity: qty }];
    });
  };

  const removeFromCart = (index) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <CartContext.Provider value={{ cartItems, setCartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
