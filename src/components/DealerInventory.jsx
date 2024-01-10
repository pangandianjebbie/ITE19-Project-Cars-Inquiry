// DealerDashboard.js
import React from 'react';
import { useUser } from './UserContext';
import DealerNav from './DealerNav';
import CustomerInquiryList from './CustomerInquiryList';   

const DealerDashboard = () => {
  const { user } = useUser();

  return (
    <>
      <DealerNav />
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
      </div>
    </>
  );
};

export default DealerDashboard;
