import React, { useEffect, useState } from 'react';
import { supabase } from './Supabase';
import AdminNav from './AdminNav';
import AdminModel from './AdminModel';

const AdminCars = () => {
  const [models, setModels] = useState([]);
  const [brands, setBrands] = useState([]);
  const [bodyStyles, setBodyStyles] = useState([]);
  const [dealers, setDealers] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [newVehicle, setNewVehicle] = useState({
    vin: '',
    brandid: '',
    modelid: '',
    bodystyleid: '',
    coloroptionid: '',
    engineoptionid: '',
    transmissionoptionid: '',
    price: '',
    imageurl: '',
  });

  useEffect(() => {
    fetchModels();
    fetchBrands();
    fetchBodyStyles();
    fetchDealers();
    fetchVehicles();
  }, []);

  const fetchModels = async () => {
    const { data, error } = await supabase.from('models').select('*');
    if (error) {
      console.error('Error fetching models:', error.message);
    } else {
      setModels(data);
    }
  };

  const fetchBrands = async () => {
    const { data, error } = await supabase.from('brands').select('*');
    if (error) {
      console.error('Error fetching brands:', error.message);
    } else {
      setBrands(data);
    }
  };

  const fetchBodyStyles = async () => {
    const { data, error } = await supabase.from('body_styles').select('*');
    if (error) {
      console.error('Error fetching body styles:', error.message);
    } else {
      setBodyStyles(data);
    }
  };

  const fetchDealers = async () => {
    const { data, error } = await supabase.from('dealers').select('*');
    if (error) {
      console.error('Error fetching dealers:', error.message);
    } else {
      setDealers(data);
    }
  };

  const fetchVehicles = async () => {
    const { data, error } = await supabase.from('vehicles').select('*');
    if (error) {
      console.error('Error fetching vehicles:', error.message);
    } else {
      setVehicles(data);
    }
  };

  const handleInputChange = (e) => {
    setNewVehicle({ ...newVehicle, [e.target.name]: e.target.value });
  };

  const handleAddVehicle = async () => {
    try {
      const { data, error } = await supabase.from('vehicles').upsert([newVehicle]);
      if (error) {
        console.error('Error adding vehicle:', error.message);
      } else {
        console.log('Vehicle added successfully:', data);
        setNewVehicle({
          vin: '',
          brandid: '',
          modelid: '',
          bodystyleid: '',
          coloroptionid: '',
          engineoptionid: '',
          transmissionoptionid: '',
          price: '',
          imageurl: '',
        });
        fetchVehicles();
      }
    } catch (error) {
      console.error('Error adding vehicle:', error.message);
    }
  };

  const handleEditVehicle = async (vin) => {
    // Implement logic to edit an existing vehicle
    // You can use a modal or a form to get the updated data from the user
    const updatedPrice = prompt('Enter the updated price:');
    const updatedImageUrl = prompt('Enter the updated image URL:');

    const { data, error } = await supabase.from('vehicles').upsert([
      {
        vin: vin,
        price: updatedPrice,
        imageurl: updatedImageUrl,
      },
    ]);

    if (error) {
      console.error('Error updating vehicle:', error);
    } else {
      console.log('Vehicle updated successfully:', data);
      fetchVehicles(); // Refresh the vehicle list after updating
    }
  };

  const handleDeleteVehicle = async (vin) => {
    // Implement logic to delete an existing vehicle
    const confirmation = window.confirm('Are you sure you want to delete this vehicle?');
    if (confirmation) {
      const { data, error } = await supabase.from('vehicles').delete().eq('vin', vin);

      if (error) {
        console.error('Error deleting vehicle:', error);
      } else {
        console.log('Vehicle deleted successfully:', data);
        fetchVehicles(); // Refresh the vehicle list after deleting
      }
    }
  };

  return (
    <>
      <AdminNav />
      <div className="rowcontainer mx-auto p-8 mt-[90px]">
        <h1 className="text-3xl font-bold mb-6">Admin Cars</h1>
        <div className="flex-col">
          {/* Form for adding a new vehicle */}
          <div className="mb-4">
            <h2 className="text-xl font-bold mb-2">Add New Vehicle</h2>
            <form>
              {/* Include input fields for each property of the vehicle */}
              {/* For simplicity, you can use text inputs; consider using selects for dropdowns */}
              <label>VIN:</label>
              <input type="text" name="vin" value={newVehicle.vin} onChange={handleInputChange} />

              {/* Other input fields go here */}

              <button type="button" onClick={handleAddVehicle}>
                Add Vehicle
              </button>
            </form>
          </div>

          {/* Table for displaying existing vehicles */}
          <div className="overflow-x-auto">
          <table className="min-w-full">
          <thead>
            <tr className="bg-gray-700 text-white">
              {/* Include table headers for each property of the vehicle */}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">VIN</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Brand ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Model ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Body Style ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Color Option ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Engine Option ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transmission Option ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image URL</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
            <tbody>
              {vehicles.map((vehicle) => (
                <tr key={vehicle.vin} className="hover:bg-gray-100">
                  {/* Include table data for each property of the vehicle */}
                  <td className="px-6 py-4 whitespace-nowrap">{vehicle.vin}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{vehicle.brandid}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{vehicle.modelid}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{vehicle.bodystyleid}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{vehicle.coloroptionid}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{vehicle.engineoptionid}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{vehicle.transmissionoptionid}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{vehicle.price}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{vehicle.imageurl}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {/* Buttons for editing and deleting vehicles */}
                    <button
                      className="bg-blue-500 text-white py-1 px-2 mr-2"
                      onClick={() => handleEditVehicle(vehicle.vin)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white py-1 px-2"
                      onClick={() => handleDeleteVehicle(vehicle.vin)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      </div>
      <AdminModel/>
    </>
  );
};

export default AdminCars;
