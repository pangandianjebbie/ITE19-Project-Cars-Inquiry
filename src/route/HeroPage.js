import React from 'react'
import Navbar from '../components/Navbar'
import NavHero from '../components/NavHero'  
import Footer from '../components/Footer'; 
import FeaturedCars from '../components/FeaturedCars';

const HeroPage = () => {
  return (
    <>
     <Navbar /> 
     <NavHero/> 
     <FeaturedCars/>
     <Footer/>
    </>
  )
}

export default HeroPage;
