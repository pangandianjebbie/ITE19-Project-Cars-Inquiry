import React, { useState, useEffect } from "react";
import car from "../assets/car1.jpg";
import { supabase } from "./Supabase";
import { Link } from "react-router-dom";

const Hero = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchCriteria, setSearchCriteria] = useState("brand");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [selectedPriceMinRange, setSelectedPriceMinRange] = useState("");
  const [selectedPriceMaxRange, setSelectedPriceMaxRange] = useState("");
  const [selectedBodyStyle, setSelectedBodyStyle] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      let combinedData = [];
      let error = null;

      if (searchCriteria === "brand") {
        const { data: brandData, error: brandError } = await supabase
          .from("brands")
          .select("*")
          .ilike("brandname", `%${searchTerm}%`);
        const brandIds = brandData.map((brand) => brand.brandid);

        const { data: vehicleData, error: vehicleError } = await supabase
          .from("vehicles")
          .select("brandid, modelid, price")
          .in("brandid", brandIds);

        combinedData = vehicleData.map((vehicle) => {
          const matchedBrand = brandData.find(
            (brand) => brand.brandid === vehicle.brandid
          );
          return {
            brandname: matchedBrand?.brandname,
            price: vehicle.price,
          };
        });

        error = brandError || vehicleError;
      } else if (searchCriteria === "model") {
        const { data: modelData, error: modelError } = await supabase
          .from("models")
          .select("*")
          .ilike("modelname", `%${searchTerm}%`);
        combinedData = modelData || [];
        error = modelError;
      } else if (searchCriteria === "price") {
        const minPrice = selectedPriceMinRange;
        const maxPrice = selectedPriceMaxRange;
        console.log("price");
        console.log(minPrice, maxPrice);

        const { data: brandData, error: brandError } = await supabase
          .from("brands")
          .select("*");

        const { data: modelData, error: modelError } = await supabase
          .from("models")
          .select("*");

        const { data: priceData, error: priceError } = await supabase
          .from("vehicles")
          .select("price, brandid,  modelid")
          .gte("price", minPrice ? minPrice : 0)
          .lte("price", maxPrice ? maxPrice : 31000);

        combinedData = priceData.map((vehicle) => {
          const matchedBrand = brandData.find(
            (brand) => brand.brandid === vehicle.brandid
          );
          const matchedModel = modelData.find(
            (model) => model.modelid === vehicle.modelid
          );
          return {
            modelname: matchedModel?.modelname,
            brandname: matchedBrand?.brandname,
            price: vehicle.price,
          };
        });

        combinedData = combinedData;

        error = priceError;
      }

      if (error) {
        console.error("Error fetching data:", error);
      } else {
        setSearchResults(combinedData);
        setShowResults(true);
      }
    };
    fetchData();
    if (searchTerm.trim() === "") {
      setShowResults(false);
    } else {
      fetchData();
    }
  }, [
    searchTerm,
    searchCriteria,
    selectedPriceMinRange,
    selectedPriceMaxRange,
  ]);

  return (
    <>
      <div
        className="h-screen flex flex-col items-center justify-center bg-cover bg-center relative"
        style={{
          backgroundImage: `url(${car})`,
          position: "relative",
          zIndex: 500,
        }}
      >
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="container mx-auto text-white z-10">
          <div className="text-center mb-8 mt-[90px]">
            <h1 className="text-4xl font-bold mb-10">
              Welcome{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-white to-blue-300">
                Customer!
              </span>
              <br />
              <br /> Find Your Perfect Ride with Connect Corp.
            </h1>
            <p className="text-lg mb-15">
              Explore a wide range of vehicles and connect with the best deals
              in the market. Your dream car is just a click away!
            </p>
          </div>

          <div className="md:w-[800px] sm:w-full mx-auto items-center justify-center  mb-8 mt-[60px]">
            <input
              type="text"
              placeholder="Search for your dream car..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-4 rounded bg-gradient-to-r from-white via-blue-300 to-pink-300 text-black focus:outline-none"
            />
            {searchCriteria === "price" ? (
              <>
                <select
                  value={selectedPriceMinRange}
                  onChange={(e) => setSelectedPriceMinRange(e.target.value)}
                  className="mt-4 p-2 rounded bg-gradient-to-r from-white via-blue-300 to-pink-300 text-black focus:outline-none"
                >
                  <option value="">Select Minimum Range</option>
                  <option value="0">$0</option>
                  <option value="20000">$20,000</option>
                  <option value="22000">$22,000</option>
                  <option value="25000">$25,000</option>
                  {/* Add more price ranges as needed */}
                </select>
                <select
                  value={selectedPriceMaxRange}
                  onChange={(e) => setSelectedPriceMaxRange(e.target.value)}
                  className="mt-4 p-2 rounded bg-gradient-to-r from-white via-blue-300 to-pink-300 text-black focus:outline-none"
                >
                  <option value="">Select Maximum Range</option>
                  <option value="25000">$25,000</option>
                  <option value="28000">$28,000</option>
                  <option value="31000">$31,000</option>
                  {/* Add more price ranges as needed */}
                </select>
              </>
            ) : null}
            <select
              value={searchCriteria}
              onChange={(e) => setSearchCriteria(e.target.value)}
              className="mt-4 p-2 rounded bg-gradient-to-r from-white via-blue-300 to-pink-300 text-black focus:outline-none"
            >
              <option value="brand">Brand</option>
              <option value="model">Model</option>
              <option value="price">Price</option>
            </select>
          </div>

          {showResults && searchResults.length > 0 && (
            <div className="bg-gradient-to-r from-white via-blue-300 to-pink-300 text-center md:w-[500px] md:h-[400px] float-left md:mx-[500px] text-black justify-center">
              <h2 className="font-bold mt-2 mb-2">Search Results:</h2>
              <ul>
                {searchResults.map((result, index) => (
                  <li key={index}>
                    <p className="text-lg">
                      <strong>Brand: {result.brandname}</strong>
                    </p>
                    <p className="text-lg">
                      <strong>Model: {result.modelname}</strong>
                    </p>
                    <p className="text-lg">
                      <strong>Price: {result.price}</strong>
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Hero;
