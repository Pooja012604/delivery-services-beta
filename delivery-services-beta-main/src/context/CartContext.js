import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(savedCart);
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item, quantity) => {
    const updated = [...cartItems];
    const index = updated.findIndex(
      (i) => i.name === item.name && i.store === item.store
    );

    if (index !== -1) {
      updated[index].quantity += quantity;
    } else {
      updated.push({ ...item, quantity });
    }

    setCartItems(updated);
  };

  const removeFromCart = (index) => {
    const updated = [...cartItems];
    updated.splice(index, 1);
    setCartItems(updated);
  };

  const clearCart = () => setCartItems([]);

  const getTotalPrice = () =>
    cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems, // ✅ export this
        addToCart,
        removeFromCart,
        clearCart,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
