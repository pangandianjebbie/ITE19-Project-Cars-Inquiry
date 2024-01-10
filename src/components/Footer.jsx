import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8" >
      <div className="container mx-auto flex justify-between items-center">
        {/* Company Information */}
        <div className="text-left">
          <h3 className="text-xl font-bold mb-4">Connect Corp.</h3>
          <p className="text-sm">123 Main Street, Cityville, Country</p>
          <p className="text-sm">info@connectcorp.com</p>
        </div> 

        {/* Social Media Links */}
        <div className="text-right">
          <h3 className="text-xl font-bold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="text-white hover:text-gray-500">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" className="text-white hover:text-gray-500">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-white hover:text-gray-500">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="py-2 bg-gradient-to-r from-pink-300 via-white to-blue-300"  >
        <div className="container mx-auto text-center">
          <p className="text-sm text-black">
            &copy; 2023 Connect Corp. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
