import React, { useEffect, useState } from 'react';
import { supabase } from './Supabase';

const CustomerInquiryList = ({ dealerId }) => {
  const [inquiries, setInquiries] = useState([]);

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        // Fetch the inquiries associated with the dealer's brand
        const { data: inquiryData, error: inquiryError } = await supabase
          .from('customers_inquiry')
          .select('*')
          .eq('brandid', dealerId);

        const { data: brandData, error: brandError } = await supabase.from('brands').select('*');
        const { data: modelData, error: modelError } = await supabase.from('models').select('*');
        const { data: optionTypeData, error: optionTypeError } = await supabase.from('option_types').select('*');
        const { data: options, error: optionsError } = await supabase.from('options').select('*');
        const { data: customerData, error: customerError } = await supabase.from('customers').select('*');
        const { data: bodystyleData, error: bodystyleError } = await supabase.from('body_styles').select('*');

        if (inquiryError || brandError || modelError || optionTypeError || customerError || optionsError || bodystyleError) {
          throw inquiryError || brandError || modelError || optionTypeError || customerError || optionsError || bodystyleError;
        }

        const combinedData = inquiryData.map(inquiry => {
          const brand = brandData.find(b => b.brandid === inquiry.brandid);
          const model = modelData.find(m => m.modelid === inquiry.modelid);
          const colorOption = options.find(opt => opt.optionid === inquiry.coloroptionid);
          const transmissionOptionType = options.find(opt => opt.optionid === inquiry.transmissionoptionid);
          const engineOptionType = options.find(opt => opt.optionid === inquiry.engineoptionid);
          const customer = customerData.find(c => c.customerid === inquiry.customerid);
          const bodystyle = bodystyleData.find(bd => bd.bodystyleid === inquiry.bodystyleid);

          return {
            ...inquiry,
            brand_name: brand ? brand.brandname : 'N/A',
            model_name: model ? model.modelname : 'N/A',
            color_option: colorOption ? colorOption.optionvalue : 'N/A',
            transmission_type: transmissionOptionType ? transmissionOptionType.optionvalue : 'N/A',
            engine_type: engineOptionType ? engineOptionType.optionvalue : 'N/A',
            customer_name: customer ? customer.name : 'N/A',
            customer_address: customer ? customer.address : 'N/A',
            customer_phone: customer ? customer.phone : 'N/A',
            bodystyle: bodystyle ? bodystyle.bodystylename : 'N/A',
          };
        });

        setInquiries(combinedData);
      } catch (error) {
        console.error('Error fetching inquiries:', error.message);
        // Handle error, set state, or display an error message as needed
      }
    };

    fetchInquiries();
  }, [dealerId]);

  return (
    <div className="overflow-x-auto">
      <h4 className="text-lg font-semibold mb-2 text-center">Customer Inquiries</h4>
      {inquiries.length > 0 ? (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Inquiry Message
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Brand
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Model
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Color
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Transmission Type
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Engine Type
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Body Style
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer Address
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer Phone
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Planned Purchase Date
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Inquiry Date
              </th>
            </tr>
          </thead>
          <tbody>
            {inquiries.map((inquiry) => (
              <tr key={inquiry.inquiryid} className="bg-white">
                <td className="px-6 py-4 whitespace-nowrap">{inquiry.message}</td>
                <td className="px-6 py-4 whitespace-nowrap">{inquiry.brand_name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{inquiry.model_name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{inquiry.color_option}</td>
                <td className="px-6 py-4 whitespace-nowrap">{inquiry.transmission_type}</td>
                <td className="px-6 py-4 whitespace-nowrap">{inquiry.engine_type}</td>
                <td className="px-6 py-4 whitespace-nowrap">{inquiry.bodystyle}</td>
                <td className="px-6 py-4 whitespace-nowrap">{inquiry.customer_name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{inquiry.customer_address}</td>
                <td className="px-6 py-4 whitespace-nowrap">{inquiry.customer_phone}</td>
                <td className="px-6 py-4 whitespace-nowrap">{inquiry.plannedpurchasedate}</td>
                <td className="px-6 py-4 whitespace-nowrap">{inquiry.inquirydate ? new Date(inquiry.inquirydate).toLocaleString() : 'Invalid Date'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No inquiries found.</p>
      )}
    </div>
  );
};

export default CustomerInquiryList;
