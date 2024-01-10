// InquiryTable.js
import React, { useEffect, useState } from 'react';
import { supabase } from './Supabase';

const InquiryTable = ({ user }) => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const { data, error } = await supabase
          .from('customers_inquiry')
          .select('*')
          .eq('customerid', user.customerid);

        if (error) {
          throw new Error(`Error fetching inquiries: ${error.message}`);
        }

        setInquiries(data || []);
        setLoading(false);
      } catch (error) {
        console.error(error.message);
        setLoading(false);
      }
    };

    fetchInquiries();
  }, [user]);

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-3xl font-semibold mb-4">Your Inquiries</h2>
      {loading ? (
        <p>Loading inquiries...</p>
      ) : (
        <table className="min-w-full border rounded overflow-hidden">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-2 px-4">Model</th>
              <th className="py-2 px-4">Planned Purchase Date</th>
              <th className="py-2 px-4">Income Range</th>
              <th className="py-2 px-4">Message</th>
              <th className="py-2 px-4">Inquiry Date</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.map((inquiry) => (
              <tr key={inquiry.inquiryid}>
                <td className="py-2 px-4">{inquiry.modelid}</td>
                <td className="py-2 px-4">{inquiry.plannedpurchasedate}</td>
                <td className="py-2 px-4">{inquiry.incomerange}</td>
                <td className="py-2 px-4">{inquiry.message}</td>
                <td className="py-2 px-4">{inquiry.inquirydate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default InquiryTable;
