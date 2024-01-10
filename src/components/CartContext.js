// CartContext.js
import React, { createContext, useContext, useReducer, useEffect } from "react";

// Action types
const ADD_TO_CART = "ADD_TO_CART";
const REMOVE_FROM_CART = "REMOVE_FROM_CART";
const UPDATE_QUANTITY = "UPDATE_QUANTITY";
const CLEAR_CART = "CLEAR_CART"; // Added action type for clearing the cart

// Helper function to get the cart data from localStorage
const getStoredCart = () => {
  const storedCart = localStorage.getItem("shoppingCart");
  return storedCart ? JSON.parse(storedCart) : [];
};

// Reducer function
const cartReducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return [...state, action.payload];

    case REMOVE_FROM_CART:
      return state.filter((item) => item.vin !== action.payload);

    case UPDATE_QUANTITY:
      return state.map((item) =>
        item.vin === action.payload.vin ? { ...item, quantity: item.quantity + action.payload.amount } : item
      );

    case CLEAR_CART:
      return []; // Clear the cart by returning an empty array

    default:
      return state;
  }
};

// Context
const CartContext = createContext();

// Cart provider component
export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, [], () => getStoredCart());

  // Update localStorage whenever the cart changes
  useEffect(() => {
    localStorage.setItem("shoppingCart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    dispatch({ type: ADD_TO_CART, payload: item });
  };

  const removeFromCart = (vin) => {
    dispatch({ type: REMOVE_FROM_CART, payload: vin });
  };

  const updateQuantity = (vin, amount) => {
    dispatch({ type: UPDATE_QUANTITY, payload: { vin, amount } });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
