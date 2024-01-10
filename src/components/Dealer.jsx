// DealerDashboard.js
import React from 'react';
import { useUser } from './UserContext';
import DealerNav from './DealerNav';
import CustomerInquiryList from './CustomerInquiryList'; // Assume this component is implemented

const DealerDashboard = () => {
  const { user } = useUser();

  return (
    <>
      <DealerNav />
      <div className="bg-gradient-to-r from-pink-400 via-white to-blue-400 min-h-screen md:w-full mt-[120px]">
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Dealer Dashboard</h1>
      <div className="container mx-auto mt-10"> 
        <h3 className="text-2xl font-bold mb-4">
          Welcome, {user.dealername} ({user.email})
        </h3>

        {/* Display other dealer-related information here */}
        <div className="mb-4">
          <p>Dealer ID: {user.dealerid}</p>
          {/* Add other relevant dealer information */}
        </div>

        <CustomerInquiryList dealerId={user.dealerid} />
        {/* Pass dealerId to fetch and display inquiries specific to the dealer */}
      </div>
      </div>
      </div>
    </>
  );
};

export default DealerDashboard;
