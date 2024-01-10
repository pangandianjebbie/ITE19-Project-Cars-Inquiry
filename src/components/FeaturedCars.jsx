import React, { useState, useEffect } from 'react';
import { supabase } from './Supabase';

const FeaturedCars = () => {
  const [featuredCars, setFeaturedCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3); // Adjust this value based on your design
  const indexOfLastCar = currentPage * itemsPerPage;
  const indexOfFirstCar = indexOfLastCar - itemsPerPage;
  const currentCars = featuredCars.slice(indexOfFirstCar, indexOfLastCar);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: cars, error: carsError } = await supabase.from('vehicles').select('*');
        if (carsError) throw carsError;

        // Fetch brand names
        const brandIds = cars.map((car) => car.brandid);
        const { data: brands, error: brandsError } = await supabase.from('brands').select('*').in('brandid', brandIds);
        if (brandsError) throw brandsError;

        // Fetch model names
        const modelIds = cars.map((car) => car.modelid);
        const { data: models, error: modelsError } = await supabase.from('models').select('*').in('modelid', modelIds);
        if (modelsError) throw modelsError;

        // Fetch engine and transmission option values
        const optionIds = cars.reduce((acc, car) => {
          acc.push(car.engineoptionid, car.transmissionoptionid);
          return acc;
        }, []);
        const { data: options, error: optionsError } = await supabase.from('options').select('*').in('optionid', optionIds);
        if (optionsError) throw optionsError;

        // Combine data for each car
        const carsWithDetails = cars.map((car) => {
          const brand = brands.find((brand) => brand.brandid === car.brandid);
          const model = models.find((model) => model.modelid === car.modelid);
          const engineOption = options.find((option) => option.optionid === car.engineoptionid);
          const transmissionOption = options.find((option) => option.optionid === car.transmissionoptionid);

          return {
            ...car,
            brandname: brand ? brand.brandname : '',
            modelname: model ? model.modelname : '',
            engine: engineOption ? engineOption.optionvalue : '',
            transmission: transmissionOption ? transmissionOption.optionvalue : '',
          };
        });

        setFeaturedCars(carsWithDetails);
      } catch (error) {
        setIsError(true);
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching data</p>;

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4 text-indigo-900">FEATURED CARS</h2>
        <p className="text-indigo-500 font-bold mb-8">
          Embark on a journey of sophistication and innovation with our handpicked featured cars, where luxury meets the thrill of the open road.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {currentCars.map((car) => (
            <div key={car.vin} className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer">
              <img
                src={car.imageurl}
                alt={car.modelname}
                className="md:w-[300px] w-[300px] md:h-[200px] h-[200px] md:mx-[80px] mx-[150px] md:mt-[20px] mt-[10px] object-cover"
              />
              <div className="p-4">
                <div className="flex justify-between mb-2">
                  <span className="text-lg text-indigo-900 mx-[200px]">${car.price}</span>
                </div>
                <h3 className="text-xl font-bold mb-2">
                  {car.brandname} - {car.modelname}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  <span>Engine: {car.engine} cc</span> <br />
                  <span>Transmission: {car.transmission}</span>
                </p>
                <div className="flex justify-between items-center">
                  <div className='mx-[190px]'>
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <span key={rating} className="text-yellow-500 text-lg">
                        ★
                      </span>
                    ))}
                  </div>  
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-8">
          <ul className="flex justify-center space-x-2">
            {Array.from({ length: Math.ceil(featuredCars.length / itemsPerPage) }, (_, index) => (
              <li key={index}>
                <button
                  className={`${
                    currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'
                  } py-2 px-4 rounded-full`}
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCars;
