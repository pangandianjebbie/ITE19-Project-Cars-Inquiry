import React, { useState, useEffect } from "react";
import { supabase } from "./Supabase";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const DisplayVehicleTable = () => {
  const [vehicles, setVehicles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [vehiclesPerPage] = useState(6); // Adjust the number of vehicles per page as needed
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = (isVisible) => {
    setShowModal(isVisible);
  };

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const { data: vehicleData, error: vehicleError } = await supabase
          .from("vehicles")
          .select("*");

          const vehicleDetail = await Promise.all(
            vehicleData.map(async (vehicle) => {
              const { data: brandData, error: brandError } = await supabase
                .from("brands")
                .select("brandname")
                .eq("brandid", vehicle.brandid) // Corrected: use vehicle.brandid
                .limit(1);
          
              const { data: modelData, error: modelError } = await supabase
                .from("models")
                .select("modelname")
                .eq("modelid", vehicle.modelid) // Corrected: use vehicle.modelid
                .limit(1);
          
              return {
                vin: vehicle.vin,
                imageurl: vehicle.imageurl,
                brandName: brandData && brandData.length > 0 ? brandData[0].brandname : null,
                modelName: modelData && modelData.length > 0 ? modelData[0].modelname : null,
                price: vehicle.price,
              };
            })
          );
          

        console.log("Fetched cars with related data:", vehicleDetail);
        setVehicles(vehicleDetail);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchVehicles();
  }, []);

  const handleCardClick = async (vin) => {
    try {
      const { data: vehicleDetails, error: vehicleError } = await supabase
        .from("vehicles")
        .select("vin, brandid, modelid, bodystyleid, coloroptionid, engineoptionid, transmissionoptionid, price, imageurl")
        .eq("vin", vin)
        .single();

      const { data: modelData, error: modelError } = await supabase
        .from("models")
        .select("modelname")
        .eq("modelid", vehicleDetails.modelid)
        .limit(1);

      const { data: brandData } = await supabase
        .from("brands")
        .select("brandname")
        .eq("brandid", vehicleDetails.brandid)
        .limit(1);

      if (!brandData || !brandData.length || !modelData || !modelData.length) {
        console.error(`Brand or model details not found.`);
        return;
      }

      const combinedData = {
        vin: vehicleDetails.vin,
        imageurl: vehicleDetails.imageurl,
        brandName: brandData[0].brandname,
        modelName: modelData[0].modelname,
        price: vehicleDetails.price,
      };

      console.log(combinedData);
    } catch (error) {
      console.log(error.message);
    }
  };

  // Pagination Logic
  const indexOfLastVehicle = currentPage * vehiclesPerPage;
  const indexOfFirstVehicle = indexOfLastVehicle - vehiclesPerPage;
  const currentVehicles = vehicles.slice(indexOfFirstVehicle, indexOfLastVehicle);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="mt-10">
      <h1
        className="text-center font-bold after:bg-gradient-to-r from-blue-400 via-yellow-200 to-pink-400 after:block after:h-[4px] md:after:w-[400px] after:w-[380px] md:after:mx-[560px] after:mx-[20px] after:mt-[10px] mb-4"
        style={{ fontSize: "30px" }}
      >
        Look for the best car!
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-15 bg-gradient-to-r from-white via-blue-300 to-pink-300">
        {currentVehicles.map((vehicle) => (
          <Link key={vehicle.vin} to={`/vehiclecontent/${vehicle.vin}`}>
            <div
              key={vehicle.vin}
              className="bg-gray-100 rounded-lg shadow-md  mt-[20px] mb-[20px] w-[400px] md:mx-[50px] p-4 cursor-pointer"
              onClick={() => handleCardClick(vehicle.vin)}
            >
              <img
                src={vehicle.imageurl}
                alt={vehicle.modelName}
                className="mx-auto mb-2 max-w-full h-auto"
              />
              <p className="text-center text-lg font-bold">Brand: {vehicle.brandName}</p>
              <p className="text-center text-lg">Model: {vehicle.modelName}</p>
              <p className="text-center text-blue-600 text-lg">Price: ${vehicle.price}</p>
            </div>
          </Link>
        ))}
      </div>
      <div className="pagination">
        <ul className="flex space-x-2 mt-4">
          {Array.from({ length: Math.ceil(vehicles.length / vehiclesPerPage) }).map((_, index) => (
            <li key={index} className="mb-5 md:ml-[650px] md:mr-[10px] text-center">
              <button
                className={`${
                  currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-white text-blue-500"
                } px-3 py-1 border`}
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DisplayVehicleTable;
