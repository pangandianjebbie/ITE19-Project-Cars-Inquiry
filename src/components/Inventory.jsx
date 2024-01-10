import React, { useEffect, useState } from 'react';
import { supabase } from './Supabase';

const AdminInventory = () => {
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const { data, error } = await supabase.from('inventory').select('*');

        if (error) {
          throw error;
        }

        setInventory(data);
      } catch (error) {
        console.error('Error fetching inventory:', error.message);
        // Handle error, set state, or display an error message as needed
      }
    };

    fetchInventory();
  }, []);

  return (
    <div>
      <h4 className="text-lg font-semibold mb-2 text-center">Vehicle Inventory</h4>
      {inventory.length > 0 ? (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Vehicle VIN
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Dealer ID
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Purchase Date
              </th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((item) => (
              <tr key={item.inventoryid} className="bg-white">
                <td className="px-6 py-4 whitespace-nowrap">{item.vin}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.dealerid}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.status}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.purchasedate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No vehicles in inventory.</p>
      )}
    </div>
  );
};

export default AdminInventory;
