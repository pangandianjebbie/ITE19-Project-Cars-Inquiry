// ShoppingCart.js
import React from "react";
import { useCart } from "./CartContext";
import Checkout from "./Checkout"; 

const ShoppingCart = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const handleIncrement = (vin) => {
    // Call the updateQuantity function with the updated quantity
    updateQuantity(vin, 1);
  };

  const handleDecrement = (vin) => {
    // Call the updateQuantity function with the updated quantity
    updateQuantity(vin, -1);
  };

  return (
    <div className="mt-4"> 
      <h3 className="text-xl font-bold mb-2 ">Shopping Cart</h3>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul>
            {cart.map((item) => (
              <li key={item.vin}>
                {item.brandName} {item.modelName} - Quantity: {item.quantity} - {item.price}
                <button
                  onClick={() => handleIncrement(item.vin)}
                  className="text-white bg-green-500 outline outline-offset-2 outline-1 hover:bg-green-600 hover:text-white px-6 py-2 mt-4 ml-2 rounded"
                >
                  +
                </button>
                <button
                  onClick={() => handleDecrement(item.vin)}
                  className="text-white bg-red-500 outline outline-offset-2 outline-1 hover:bg-red-600 hover:text-white px-6 py-2 mt-4 ml-2 rounded"
                >
                  -
                </button>
                <button
                  onClick={() => removeFromCart(item.vin)}
                  className="text-orange-500 ml-2"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <Checkout />
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;
