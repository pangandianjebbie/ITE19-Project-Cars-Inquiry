import React, { useState, useEffect } from "react";
import { useUser } from "./UserContext";
import { supabase } from "./Supabase";

const Profile = () => {
  const { user } = useUser();
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        // Fetch inquiries based on the user's customerid
        const { data, error } = await supabase
          .from("customers_inquiry")
          .select("*")
          .eq("customerid", user.customerid);

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

  if (!user) {
    // If user is null, show a loading state or redirect to login
    console.log("User is null. Loading...");
    return (
      <div className="mt-6">
        <p>Loading...</p>
        {/* or redirect to the login page */}
      </div>
    );
  }

  // Log user properties individually for better diagnostics
  console.log("User Email:", user.email);
  console.log("User Role:", user.role);

  return (
    <div className="mt-[200px] md:w-[700px] md:mx-[450px] relative justify-center bg-gradient-to-r from-blue-300 via-white to-pink-300 rounded-md shadow-md mb-[100px]">
      <h2 className="text-3xl font-bold mb-10 text-center">Profile Details</h2>
      <div className="grid grid-cols-2 gap-1 text-center">
        <div>
          <p className="mb-2 flex items-center">
            <strong className="mr-2 md:mx-[70px]">Name:</strong> {user.name}
          </p>
          <p className="mb-2 md:mx-[50px]">
            <strong className="mr-2 md:mx-[20px]" >Email:</strong> {user.email}
          </p>
          <p className="mb-2 flex items-center">
            <strong className="mr-2 md:mx-[70px]">Role:</strong> {user.role}
          </p>
        </div>
        <div>
          {user.role === "dealers" && (
            <>
              <p className="mb-2 md:mr-[50px]">
                <strong>Address:</strong> {user.address}
              </p>
              <p className="mb-2 md:mr-[50px]">
                <strong>Phone:</strong> {user.phone}
              </p>
            </>
          )}
          {user.role === "customers" && (
            <>
              <p className="mb-2 md:mr-[50px]">
                <strong>Address:</strong> {user.address}
              </p>
              <p className="mb-2 md:mr-[50px]">
                <strong>Phone:</strong> {user.phone}
              </p>
              <p className="mb-2 md:mr-[50px]">
                <strong>Gender:</strong> {user.gender}
              </p>
              <p className="mb-2 md:mr-[50px]">
                <strong>Annual Income:</strong> ${user.annualincome}
              </p>
            </> 
          )}
        </div>
      </div> 
    </div>
  );
};

export default Profile;
