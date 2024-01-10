import React, { useState, useEffect } from "react";
import { supabase } from "./Supabase";
import AdminNav from './AdminNav';

const AdminDealers = () => {
  const [dealer, setDealer] = useState([]);

  useEffect(() => {
    fetchDealer();
  }, []);

  async function fetchDealer() {
    const { data } = await supabase.from("dealers").select("*");
    setDealer(data);
  }
 
  const handleEdit = async (dealerId) => {
    // Implement logic to edit an existing dealer
    // You can use a modal or a form to get the updated data from the user
    const updatedName = prompt("Enter the updated name:");
    const updatedAddress = prompt("Enter the updated address:");

    const { data, error } = await supabase.from("dealers").upsert([
      {
        dealerid: dealerId, // ID of the dealer to update
        dealername: updatedName,
        address: updatedAddress,
      },
    ]);

    if (error) {
      console.error("Error updating dealer:", error);
    } else {
      console.log("Dealer updated successfully:", data);
      fetchDealer(); // Refresh the dealer list after updating
    }
  };

  const handleDelete = async (dealerId) => {
    // Implement logic to delete an existing dealer
    const confirmation = window.confirm("Are you sure you want to delete this dealer?");
    if (confirmation) {
      const { data, error } = await supabase.from("dealers").delete().eq("dealerid", dealerId);

      if (error) {
        console.error("Error deleting dealer:", error);
      } else {
        console.log("Dealer deleted successfully:", data);
        fetchDealer(); // Refresh the dealer list after deleting
      }
    }
  };

  return (
    <>
      <AdminNav />
      <div className="rowcontainer mx-auto p-8 mt-[90px]">
        <h1 className="text-3xl font-bold mb-6">Dealers</h1>
        <div className="flex-col"> 
          <table className="border border-collapse border-gray-800">
            <thead>
              <tr className="bg-gray-700 text-white">
                <th className="py-2 px-4">Dealer ID</th>
                <th className="py-2 px-4">Name</th>
                <th className="py-2 px-4">Address</th>
                <th className="py-2 px-4">Phone</th>
                <th className="py-2 px-4">Email</th>
                <th className="py-2 px-4">Brand ID</th>
                <th className="py-2 px-4">Inventory Status</th>
                <th className="py-2 px-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {dealer.map((dealer) => (
                <tr key={dealer.dealerid} className="hover:bg-gray-100">
                  <td className="py-2 px-4">{dealer.dealerid}</td>
                  <td className="py-2 px-4">{dealer.dealername}</td>
                  <td className="py-2 px-4">{dealer.address}</td>
                  <td className="py-2 px-4">{dealer.phone}</td>
                  <td className="py-2 px-4">{dealer.email}</td>
                  <td className="py-2 px-4">{dealer.brandid}</td>
                  <td className="py-2 px-4">{dealer.inventorystatus}</td>
                  <td className="py-2 px-4">
                    <button
                      className="bg-blue-500 text-white py-1 px-2 mr-2"
                      onClick={() => handleEdit(dealer.dealerid)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white py-1 px-2"
                      onClick={() => handleDelete(dealer.dealerid)}
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
    </>
  );
};

export default AdminDealers;
