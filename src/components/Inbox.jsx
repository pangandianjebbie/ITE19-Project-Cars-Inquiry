import React, { useState, useEffect } from 'react';
import { useUser } from './UserContext';
import { supabase } from './Supabase';

const Inbox = () => {
  const { user } = useUser();
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        if (!user) {
          // If user is null, show a loading state or redirect to login
          console.log('User is null. Loading...');
          setLoading(false);
          return;
        }

        // Fetch inquiries based on the user's customerid
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
    <div className="mt-8 md:w-3/4 mx-auto">
      <h2 className="text-3xl font-bold mb-4 text-center">Your Inquiries</h2>

      {loading ? (
        <p>Loading inquiries...</p>
      ) : (
        <>
          {inquiries.length === 0 ? (
            <p>No inquiries found.</p>
          ) : (
            <ul>
              {inquiries.map((inquiry) => (
                <li key={inquiry.inquiryid} className="bg-white p-4 mb-4 rounded-md shadow-md"> 
                  <p className="text-gray-700">Message: {inquiry.message}</p>
                  <p className="text-gray-700">Model ID: {inquiry.modelid}</p>
                  <p className="text-gray-700">Planned Purchase Date: {inquiry.plannedpurchasedate}</p>
                  <p className="text-gray-700">Income Range: {inquiry.incomerange}</p>
                  <p className="text-sm text-gray-500">{new Date(inquiry.inquirydate).toLocaleString()}</p>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default Inbox;
