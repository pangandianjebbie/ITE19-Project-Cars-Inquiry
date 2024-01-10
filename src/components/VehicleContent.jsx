import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from './Supabase'; // Make sure to import your Supabase client
import Nav from './Nav';
import Footer from './Footer';
import Modal from './Modal'; 
import InquireDealer from './InquireDealer';

const VehicleCustomization = () => {
  const { vin } = useParams();
  const [vehicleDetails, setVehicleDetails] = useState(null);
  const [showModal, setShowModal] = useState(false)
  const [customization, setCustomization] = useState({
    selectedColor: '',
    selectedEngine: '',
    selectedTransmission: '',
    selectedBodyStyle: '',
  });

  useEffect(() => {
    const fetchVehicleDetails = async () => {
      try {
        const { data: vehicleData, error: vehicleError } = await supabase
          .from('vehicles')
          .select('*')
          .eq('vin', vin)
          .single();

          const { data: brandData, error: brandError } = await supabase
          .from('brands')
          .select('brandname')
          .eq('brandid', vehicleData.brandid)
          .single();
  
        const { data: modelData, error: modelError } = await supabase
          .from('models')
          .select('modelname')
          .eq('modelid', vehicleData.modelid)
          .single();

        const { data: bodyStyleData, error: bodyStyleError } = await supabase
          .from('body_styles')
          .select('bodystylename')
          .eq('bodystyleid', vehicleData.bodystyleid)
          .single();  
  
        if (brandError || modelError) {
          throw new Error(`Error fetching brand or model details: ${brandError?.message} ${modelError?.message}`);
        }  

        setVehicleDetails({
          ...vehicleData,
          brandName: brandData?.brandname || 'Brand not Found',
          modelName: modelData?.modelname || 'Model not Found',
          bodyStyleName: bodyStyleData?.bodystylename || 'Body Style not Found',
        });
        
      } catch (error) {
        console.error('Error fetching vehicle details:', error.message);
      }
    };
  
    fetchVehicleDetails();
  }, [vin]);

  const handleCustomizationChange = (field, value) => {
    setCustomization((prevCustomization) => ({
      ...prevCustomization,
      [field]: value,
    }));
  };

  const handleInquireDealer = () => {
    // Open the modal when the user clicks "Inquire Dealer"
    setShowModal(true);
  };

  const handleCloseModal = () => {
    // Close the modal when needed
    setShowModal(false);
  };

  if (!vehicleDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Nav />
      <div className="container mx-auto mt-[120px] mb-10 bg-gray-100">
        <div className="max-w-2xl mx-auto p-6 bg-gradient-to-r from-pink-300 via-gray-100 to-blue-300 rounded-md shadow-md flex flex-col md:flex-row">
        <div className="md:w-1/2 pr-4">  
          <img
            src={vehicleDetails.imageurl}
            alt={`${vehicleDetails.brandName} ${vehicleDetails.modelName}`}
            className="w-full h-auto mb-2 rounded-md mt-[40px]"
          />
        </div>  
        <div className="md:w-1/2 mt-[100px]">  
          <h2 className="text-3xl font-bold mb-3 mt-[-90px] text-center">
          {vehicleDetails.brandName} - {vehicleDetails.modelName}
          </h2> 
          <p className="text-lg mb-3">
            <strong>Price: $</strong> {vehicleDetails.price}
          </p>
          {/* Add customization options */}
          <div className="mt-2">
            <label className="block text-lg font-semibold mb-1">Select Color:</label>
            {/* Add dropdown/select for color customization */}
            <select
              value={customization.selectedColor}
              onChange={(e) => handleCustomizationChange('selectedColor', e.target.value)}
              className="bg-white rounded-md p-2 w-full"
            >
              <option value="">Select Color</option>
              {/* Add options dynamically based on your options table */}
              <option value="Red">Red</option>
              <option value="Blue">Blue</option>
              <option value="Black">Black</option>
              <option value="Violet">Violet</option>
              {/* Add other colors dynamically */}
            </select>
          </div>

          <div className="mt-2">
            <label className="block text-lg font-semibold mb-1">Select Engine Type:</label>
            {/* Add dropdown/select for engine type customization */}
            <select
              value={customization.selectedEngine}
              onChange={(e) => handleCustomizationChange('selectedEngine', e.target.value)}
              className="bg-white rounded-md p-2 w-full"
            >
              <option value="">Select Engine Type</option>
              {/* Add options dynamically based on your options table */}
              <option value="V6">V6</option>
              <option value="4-Cylinder">4-Cylinder</option>
              {/* Add other engine types dynamically */}
            </select>
          </div>

          <div className="mt-2">
            <label className="block text-lg font-semibold mb-1">Select Transmission:</label>
            {/* Add dropdown/select for transmission customization */}
            <select
              value={customization.selectedTransmission}
              onChange={(e) => handleCustomizationChange('selectedTransmission', e.target.value)}
              className="bg-white rounded-md p-2 w-full"
            >
              <option value="">Select Transmission</option>
              {/* Add options dynamically based on your options table */}
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
              {/* Add other transmission types dynamically */}
            </select>
          </div>

          <div className="mt-2">
            <label className="block text-lg font-semibold mb-1">Select Body Style:</label>
            {/* Add dropdown/select for body style customization */}
            <select
              value={customization.selectedBodyStyle}
              onChange={(e) => handleCustomizationChange('selectedBodyStyle', e.target.value)}
              className="bg-white rounded-md p-2 w-full"
            >
              <option value="">Select Body Style</option>
              {/* Add options dynamically based on your body_styles table */}
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV</option>
              <option value="Truck">Truck</option>
              {/* Add other body styles dynamically */}
            </select>
          </div>

          {/* Button to inquire dealer */} 
          <button
            onClick={handleInquireDealer}
            className="mt-4 bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600"
          >
            Inquire Dealer
          </button> 

          </div>
 
           {/* Render the Modal with the InquireDealerForm */}
           <Modal isvisible={showModal} onClose={handleCloseModal}>
            <InquireDealer
              onClose={handleCloseModal}
              vehicleDetails={vehicleDetails}
            />
          </Modal>

        </div>
      </div>
      <Footer />
    </div>
  );
};

export default VehicleCustomization;
