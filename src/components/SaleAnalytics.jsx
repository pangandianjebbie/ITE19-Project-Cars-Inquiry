import React, { useEffect, useState } from 'react';
import { supabase } from './Supabase';

const AdminSales = () => {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const { data, error } = await supabase.from('sales').select('*');

        if (error) {
          throw error;
        }

        setSales(data);
      } catch (error) {
        console.error('Error fetching sales:', error.message);
        // Handle error, set state, or display an error message as needed
      }
    };

    fetchSales();
  }, []);

  return (
    <div className='mx-[-40px]'>
      <h1 className="text-lg font-semibold mb-2 text-center">Sale Analytics - Sold Vehicles</h1>
      {sales.length > 0 ? (
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sale ID
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Vehicle VIN
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Dealer ID
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer ID
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sale Date
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sale Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {sales.map((sale) => (
              <tr key={sale.saleid} className="bg-white">
                <td className="px-6 py-4 whitespace-nowrap">{sale.saleid}</td>
                <td className="px-6 py-4 whitespace-nowrap">{sale.vin}</td>
                <td className="px-6 py-4 whitespace-nowrap">{sale.dealerid}</td>
                <td className="px-6 py-4 whitespace-nowrap">{sale.customerid}</td>
                <td className="px-6 py-4 whitespace-nowrap">{sale.saledate}</td>
                <td className="px-6 py-4 whitespace-nowrap">{sale.saleamount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No sales data available.</p>
      )}
    </div>
  );
};

export default AdminSales;