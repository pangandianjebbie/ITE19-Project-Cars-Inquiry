import React from 'react';
import car from '../assets/car.jpg';
import loz from '../assets/loz.png';
import carz from '../assets/car1.jpg';

const About = () => (
  <>
    {/* Header Section */}
    <section className="relative md:min-h-[300px] w-full bg-cover bg-center" style={{ backgroundImage: `url(${car})` }}>
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="flex flex-col items-center justify-center text-white relative">
        <h2 className="text-3xl md:text-5xl mt-[150px] font-bold mb-4 text-indigo-400">LEARN MORE ABOUT US</h2>
        <p className="text-lg md:text-xl text-center text-indigo-300">Embark on a journey to discover the essence of Encar Connect, where connection becomes an enriching experience.</p>
      </div>
    </section> 

    <section className="bg-gray-200 py-8 md:py-16">
      <div className="container mx-auto grid grid-row-1 md:grid-row-2 gap-8 md:flex-col items-center" style={{ backgroundImage: `url(${carz})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', opacity: '0.9'}}>
        
        {/* Left Side: Goals, Work, Passion Boxes */} 
        <div className="flex flex-col p-4 md:p-2 mb-8 md:mb-0 text-indigo-600">
         <h2 className="text-xl md:text-2xl font-bold mb-2 md:mb-4 text-center">Car Service</h2> 
        </div>
        <div className="flex flex-col p-4 md:p-2 mb-8 md:mb-0 text-indigo-500">
         <h2 className="text-xl md:text-2xl font-bold mb-2 md:mb-4 text-center">Car Parts</h2> 
        </div>
        <div className="flex flex-col p-4 md:p-2 mb-8 md:mb-0 text-indigo-400">
         <h2 className="text-xl md:text-2xl font-bold mb-2 md:mb-4 text-center">Car Brands & Models</h2> 
        </div>
        </div>

 
        <div className="md:ml-8 mt-10">
        <div>
            <h2 className="text-2xl md:text-4xl font-bold mb-2 md:mb-30 text-center text-indigo-800">ENCAR CONNECT</h2>
            <div className=" text-center mb-10 mt-[30px] text-indigo-600" style={{ lineHeight: '2.0' }}>
              <p>Connect Corp. Symbolizes connection of cars through various brands and models!</p>
              <p>Dive into the essence of Connect Corp., where discovering more is an invitation to explore <br></br>
              the intricate web of automotive connections, unveiling the heart and soul of our brand.</p> 
            </div>
          </div>
          <img src={loz} alt=" " className="md:w-[400px] md:h-[400px] md:mx-[550px] object-cover mb-10" /> 
        </div> 
    </section> 
  </>
);

export default About;
