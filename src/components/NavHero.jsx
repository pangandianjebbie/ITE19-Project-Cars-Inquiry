import React from 'react';
import crmv from '../assets/crmv.png';
import { Link } from 'react-router-dom';

const NavHero = () => {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-r from-white via-blue-300 to-pink-300 flex flex-col items-center justify-center relative"  >
        <img
          src={crmv}
          alt="pic"
          className="h-[80vw] w-[500vw] mt-[40px] md:h-[400px] md:w-[700px] absolute top-0 right-[0] md:top-[10%] md:mt-[150px] md:mx-[-70px] md:right-[5%] grid-flow-row cursor-pointer"
          style={{ zIndex: 500 }}
        />
        <div className="h-[30vw] w-[80vw] md:h-[400px] md:w-[590px] absolute left-[5%] mx-[10px] mt-[15%] md:mt-[10%] text-indigo-900">
          <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 4rem)', 
              fontWeight: '900', 
            }}>
            Find your dream car with Connect Corp.
          </h2>
          <p className="py-2 text-indigo-500 font-semibold mt-3">Explore a wide range of vehicles and connect with the best deals to be offer. Your dream car is just a click away!</p>
          <button className="h-[20vw] w-[50vw] md:h-[70px] md:w-[200px] border-none outline-none bg-orange-500 hover:bg-orange-600 text-white mt-4" >
            <Link to="/signup">Sign Up</Link>
          </button>
        </div>
      </div>
    </>
  );
};

export default NavHero;
