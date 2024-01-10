// src/components/SalesAnalytics.js
import React, { useState, useEffect } from 'react';
import { supabase } from './Supabase';
import { Doughnut } from 'react-chartjs-2';

const SalesAnalytics = () => {
  const [salesData, setSalesData] = useState([]);
  const [timePeriod, setTimePeriod] = useState('year'); // Default to yearly data

  useEffect(() => {
    // Fetch sales data based on the selected time period
    const fetchSalesData = async () => {
      try {
        const { data, error } = await supabase
          .from('sold_vehicle')
          .select('saleid, vin, customerid') // Adjust this based on your actual sales data structure
          .range({
            [timePeriod]: {
              // Define the range based on the selected time period
              gte: 'start_date',
              lte: 'end_date',
            },
          });

        if (error) {
          console.error('Error fetching sales data:', error);
          return;
        }

        // Process the data as needed
        setSalesData(data);
      } catch (error) {
        console.error('Error fetching sales data:', error);
      }
    };

    fetchSalesData();
  }, [timePeriod]);

  // Sample data for the doughnut chart
  const doughnutData = {
    labels: ['Model A', 'Model B', 'Model C'], // Add actual models based on your data
    datasets: [
      {
        data: [10, 20, 15], // Add actual sales data based on your data
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'], // Customize colors as needed
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  return (
    <div>
      <h2>Sales Analytics</h2>

      {/* Add filters for time period and model selection */}
      <div>
        <label>
          Time Period:
          <select value={timePeriod} onChange={(e) => setTimePeriod(e.target.value)}>
            <option value="year">Yearly</option>
            <option value="month">Monthly</option>
            <option value="week">Weekly</option>
          </select>
        </label>
      </div>

      {/* Display the doughnut chart */}
      <div>
        <Doughnut data={doughnutData} />
      </div>

      {/* You can add more analytics and key metrics here based on the salesData state */}
    </div>
  );
};

export default SalesAnalytics;
