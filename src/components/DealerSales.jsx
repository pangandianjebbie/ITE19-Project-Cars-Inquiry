import React, { useState, useEffect } from 'react';
import { supabase } from './Supabase';
import { useUser } from './UserContext';  

const SaleAnalytics = () => {
  const [soldVehicles, setSoldVehicles] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    // Fetch sold vehicles data from Supabase for the specific dealer
    const fetchSoldVehicles = async () => {
      if (user && user.id) {
        const { data, error } = await supabase
          .from('sold_vehicle')
          .select('*')
          .eq('dealer_id', user.id); // Assuming dealer_id is stored in the user object

        if (error) {
          console.error('Error fetching sold vehicles:', error.message);
        } else {
          setSoldVehicles(data);
        }
      }
    };

    fetchSoldVehicles();
  }, [user]);

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-semibold mb-4">Sale Analytics - Sold Vehicles</h1>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Sale ID</th>
            <th className="py-2 px-4 border-b">VIN</th>
            <th className="py-2 px-4 border-b">Customer ID</th>
            <th className="py-2 px-4 border-b">Dealer ID</th>
          </tr>
        </thead>
        <tbody>
          {soldVehicles.map((vehicle) => (
            <tr key={vehicle.saleid + vehicle.vin}>
              <td className="py-2 px-4 border-b">{vehicle.saleid}</td>
              <td className="py-2 px-4 border-b">{vehicle.vin}</td>
              <td className="py-2 px-4 border-b">{vehicle.customerid}</td>
              <td className="py-2 px-4 border-b">{vehicle.dealer_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SaleAnalytics;
