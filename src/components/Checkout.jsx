import React, { useState } from "react";
import { useCart } from "./CartContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InquireDealer from "./InquireDealer"; 

const Checkout = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const [showForm, setShowForm] = useState(false);

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const itemTotal = parseFloat(item.price.replace(/[$,]/g, "")) * item.quantity;
      return total + itemTotal;
    }, 0);
  };

  const handleCheckout = (userDetails) => {
    // Implement your checkout logic here, e.g., send the order to the server, etc.
    // For demonstration purposes, let's show a toast.
    toast.success("Checkout Successful!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

    // Optionally, you can use userDetails for further processing
    console.log("User Details:", userDetails);
 
    // Close the form
    setShowForm(false);

    // Reset the cart or perform any other necessary actions
    clearCart();
  };

  return (
    <div className="mt-4">
      <h3 className="text-xl font-bold mb-2">Checkout</h3>
      <div>
        <ul>
          {cart.map((item) => (
            <li key={item.vin}>
              {item.brandName} {item.modelName} - Quantity: {item.quantity} - {item.price}
            </li>
          ))}
        </ul>
        <p>Total: {calculateTotal()}</p>
        {cart.length === 0 && <p>Your cart is empty.</p>}
        <button onClick={() => setShowForm(true)} className="bg-blue-500 text-white px-4 py-2 rounded mt-2">
          Checkout
        </button>
      </div>
      {showForm && <InquireDealer onCheckout={handleCheckout} />}
      <ToastContainer className="mt-[130px]" />
    </div>
  );
};

export default Checkout;
