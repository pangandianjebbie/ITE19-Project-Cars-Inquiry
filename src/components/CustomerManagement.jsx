import React, { useEffect, useState } from 'react';
import { supabase } from './Supabase';
import AdminNav from './AdminNav';

const AdminCustomerInquiries = () => {
  const [inquiries, setInquiries] = useState([]);

  useEffect(() => {
    fetchInquiries();
  }, []);

  async function fetchInquiries() {
    try {
      const { data, error } = await supabase.from('customers_inquiry').select('*');

      if (error) {
        throw error;
      }

      setInquiries(data);
    } catch (error) {
      console.error('Error fetching customer inquiries:', error.message);
      // Handle error, set state, or display an error message as needed
    }
  }

  const handleEdit = async (inquiryId) => {
    // Implement logic to edit an existing inquiry
    // You can use a modal or a form to get the updated data from the user
    // For simplicity, let's prompt the user for a new message
    const updatedMessage = prompt('Enter the updated message:');
    
    try {
      const { data, error } = await supabase
        .from('customers_inquiry')
        .upsert([
          {
            inquiryid: inquiryId, // ID of the inquiry to update
            message: updatedMessage,
          },
        ]);

      if (error) {
        console.error('Error updating inquiry:', error);
      } else {
        console.log('Inquiry updated successfully:', data);
        fetchInquiries(); // Refresh the inquiry list after updating
      }
    } catch (error) {
      console.error('Error updating inquiry:', error.message);
      // Handle error, set state, or display an error message as needed
    }
  };

  const handleDelete = async (inquiryId) => {
    // Implement logic to delete an existing inquiry
    const confirmation = window.confirm('Are you sure you want to delete this inquiry?');
    if (confirmation) {
      try {
        const { data, error } = await supabase
          .from('customers_inquiry')
          .delete()
          .eq('inquiryid', inquiryId);

        if (error) {
          console.error('Error deleting inquiry:', error);
        } else {
          console.log('Inquiry deleted successfully:', data);
          fetchInquiries(); // Refresh the inquiry list after deleting
        }
      } catch (error) {
        console.error('Error deleting inquiry:', error.message);
        // Handle error, set state, or display an error message as needed
      }
    }
  };

  return (
    <>
      <AdminNav />
      <div className="rowcontainer mx-auto p-8 mt-[90px]">
        <h1 className="text-3xl font-bold mb-6">Customer Inquiries</h1>
        <div className="flex-col">
          <table className="border border-collapse border-gray-800">
            <thead>
              <tr className="bg-gray-700 text-white">
                <th className="py-2 px-4">Inquiry ID</th>
                <th className="py-2 px-4">Customer ID</th>
                <th className="py-2 px-4">Brand ID</th>
                <th className="py-2 px-4">Model ID</th>
                <th className="py-2 px-4">Color Option ID</th>
                <th className="py-2 px-4">Planned Purchase Date</th>
                <th className="py-2 px-4">Income Range</th>
                <th className="py-2 px-4">Message</th>
                <th className="py-2 px-4">Inquiry Date</th>
                <th className="py-2 px-4">Body Style ID</th>
                <th className="py-2 px-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {inquiries.map((inquiry) => (
                <tr key={inquiry.inquiryid} className="hover:bg-gray-100">
                  <td className="py-2 px-4">{inquiry.inquiryid}</td>
                  <td className="py-2 px-4">{inquiry.customerid}</td>
                  <td className="py-2 px-4">{inquiry.brandid}</td>
                  <td className="py-2 px-4">{inquiry.modelid}</td>
                  <td className="py-2 px-4">{inquiry.coloroptionid}</td>
                  <td className="py-2 px-4">{inquiry.plannedpurchasedate}</td>
                  <td className="py-2 px-4">{inquiry.incomerange}</td>
                  <td className="py-2 px-4">{inquiry.message}</td>
                  <td className="py-2 px-4">{inquiry.inquirydate}</td>
                  <td className="py-2 px-4">{inquiry.bodystyleid}</td>
                  <td className="py-2 px-4">
                    <button
                      className="bg-blue-500 text-white py-1 px-2 mr-2"
                      onClick={() => handleEdit(inquiry.inquiryid)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white py-1 px-2"
                      onClick={() => handleDelete(inquiry.inquiryid)}
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

export default AdminCustomerInquiries;
