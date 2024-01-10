import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { supabase } from './Supabase';
import { useUser } from './UserContext';

const InquireDealer = ({ vehicleDetails, closeModal }) => {
  const { user } = useUser();
  const [inquiryData, setInquiryData] = useState({
    incomerange: '',
    plannedpurchasedate: '',
    message: '',
  });

  const handleInputChange = (field, value) => {
    setInquiryData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      if (!user) {
        console.error('User not logged in.');
        return;
      }

      const { data, error } = await supabase
        .from('customers_inquiry')
        .insert([
          {
            customerid: user.customerid,
            brandid: vehicleDetails.brandid,
            modelid: vehicleDetails.modelid,
            coloroptionid: vehicleDetails.coloroptionid,
            plannedpurchasedate: inquiryData.plannedpurchasedate,
            incomerange: inquiryData.incomerange,
            message: inquiryData.message,
            inquirydate: new Date(),
            bodystyleid: vehicleDetails.bodystyleid,
            engineoptionid: vehicleDetails.engineoptionid,
            transmissionoptionid: vehicleDetails.transmissionoptionid,
          },
        ]);

      if (error) {
        throw new Error(`Error submitting inquiry: ${error.message}`);
      }

      console.log('Inquiry submitted successfully:', data);

      // Close the modal first
      closeModal(); // Make sure you have closeModal function defined

      toast.success('Inquiry submitted successfully', {
        autoClose: 3000,
        position: toast.POSITION.BOTTOM_RIGHT,
        style: {
          height: '80px',
        },
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <div className=''></div>
      <div className="md:max-w-2xl mx-auto md:p-6 bg-gradient-to-r from-indigo-200 via-blue-100 to-pink-200 rounded-md shadow-md md:mt-[40px]">
        <h2 className="text-3xl font-bold mb-4 text-center">Inquire Dealer</h2>

        <div className="mt-4">
          <label className="block text-lg font-semibold mb-2">Income Range:</label>
          <select
            value={inquiryData.incomerange}
            onChange={(e) => handleInputChange('incomerange', e.target.value)}
            className="bg-white rounded-md p-2 w-full"
          >
            <option value="">Select Income Range</option>
            <option value="Below $30,000">Below $30,000</option>
            <option value="$30,000 - $50,000">$30,000 - $50,000</option>
            <option value="$50,000 - $70,000">$50,000 - $70,000</option>
            {/* Add other income ranges dynamically */}
          </select>
        </div>

        <div className="mt-4">
          <label className="block text-lg font-semibold mb-2">Planned Purchase Date:</label>
          <input
            type="date"
            value={inquiryData.plannedpurchasedate}
            onChange={(e) => handleInputChange('plannedpurchasedate', e.target.value)}
            className="bg-white rounded-md p-2 w-full"
          />
        </div>

        <div className="mt-4">
          <label className="block text-lg font-semibold mb-2">Message:</label>
          <textarea
            value={inquiryData.message}
            onChange={(e) => handleInputChange('message', e.target.value)}
            className="bg-white rounded-md p-2 w-full"
            rows="4"
          ></textarea>
        </div>

        <button
          onClick={handleSubmit}
          className="mt-6 bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 w-full"
        >
          Submit Inquiry
        </button>
      </div>
    </>
  );
};

export default InquireDealer;
