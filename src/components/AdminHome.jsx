// src/components/Dashboard.js
import React from 'react';
import Inventory from './Inventory';  
import SaleAnalytics from './SaleAnalytics';
import CustomerManagement from './CustomerManagement';

const Dashboard = () => {
  return (
    <div className="bg-gradient-to-r from-pink-400 via-white to-blue-400 min-h-screen md:w-full w-[600px] mt-[120px]">
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Admin Dashboard</h1>
  
        {/* Main Content */}
        <div className="grid md:grid-cols-2 md:gap-8">
          {/* Inventory Section */}
          <section className="bg-gradient-to-r from-indigo-400 via-white to-pink-200 p-4 rounded shadow-md"> 
            {/* Include the Inventory component */}
            <Inventory /> 
          </section>

          {/* Sales Analytics Section */}
          <section className="bg-gradient-to-r from-indigo-400 via-white to-pink-200 p-4 rounded shadow-md"> 
            <SaleAnalytics/>
          </section>
        </div>

        {/* Customer Management Section */}
        <section className="bg-gradient-to-r from-indigo-400 via-white to-pink-200 mt-8 p-4 rounded shadow-md">
          <h2 className="text-xl font-bold mb-4">Customer Management</h2>
          <CustomerManagement/> 
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
