import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import car1 from '../assets/car1.jpg';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Add your logic to handle form submission, e.g., send data to the server

    try {
      // Display a success toast notification with a sound
      toast.success('Form submitted successfully!', {
        position: 'top-center',
        autoClose: 3000, // 3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        onOpen: () => {
          // Play the notification sound when the toast is opened
          const audio = new Audio('sounds/notif.mp3'); // Update the path here
          audio.play();
        },
      });

      // Optional: Reset form data after submission
      setFormData({
        name: '',
        email: '',
        message: '',
      });
    } catch (error) {
      console.error('Error submitting form:', error.message);
      // Display an error toast notification
      toast.error('An error occurred. Please try again later.');
    }
  };

  return (
    <div>
      <section className="relative md:min-h-[300px] w-full bg-cover bg-center" style={{ backgroundImage: `url(${car1})` }}>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="flex flex-col items-center justify-center text-white relative">
          <h2 className="text-3xl md:text-5xl mt-[150px] font-bold mb-4 text-indigo-300">CONTACT US</h2> 
        </div>
      </section>
      <h2 className="text-2xl font-semibold mb-4 text-center">Contact Us</h2>
      <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto">
        <table className="w-full">
          <tbody>
            <tr>
              <td>
                <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                  Name
                </label>
              </td>
              <td>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 border rounded-md"
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                  Email
                </label>
              </td>
              <td>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  className="w-full p-2 border rounded-md"
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">
                  Message
                </label>
              </td>
              <td>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  rows="4"
                  className="w-full p-2 border rounded-md"
                  required
                ></textarea>
              </td>
            </tr>
          </tbody>
        </table>
        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
        >
          Submit
        </button>
      </form>
      {/* Toast notification container */}
      <ToastContainer />
    </div>
  );
};

export default Contact;
