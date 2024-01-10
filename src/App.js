import React from 'react';  
import { Routes, Route, Navigate } from 'react-router-dom'; 
import HeroPage from './route/HeroPage'; 
import Signup from './components/Signup';
import HomePage from './route/HomePage';
import LoginPage from './components/LoginPage';   
import DisplayVehicleTable from './components/Vehicle';
import ShoppingCart from './components/ShoppingCart';
import AdminPage from './route/AdminPage';   
import AdminCars from './components/AdminCars'; 
import AdminDealers from './components/AdminDealers'; 
import AboutPage from './route/AboutPage';
import VehicleContent from './components/VehicleContent'; 
import { useUser } from './components/UserContext';
import ProfilePage from './route/ProfilePage'; 
import DealerPage from './route/DealerPage';
import DealerProfile from './route/DealerProfile';
import ContactPage from './route/ContactPage';
import HeroAbout from './route/HeroAbout';
import CustomerDashboard from './components/CustomerDashboard';  
import ContactNav from './route/ContactNav'; 
 
 

const App = () => {
  const { user } = useUser();
  return (
     <> 
     <Routes> 
      <Route path='/' element={<HeroPage/>}/> 
      <Route path='/signup' element={<Signup/>}/>  
      <Route path='/login' element={<LoginPage/>}/>  
      <Route path='/home' element={<HomePage/>}/>   
      <Route path='/aabout' element={<HeroAbout/>}/>
      <Route path='/vehicle' element={<DisplayVehicleTable/>}/>
      <Route path='/cart' element={<ShoppingCart/>}/>
      <Route path='/admin' element={<AdminPage/>}/>
      <Route path='/adcars' element={<AdminCars/>}/> 
      <Route path='/addealer' element={<AdminDealers/>}/> 
      <Route path='/about' element={<AboutPage/>}/> 
      <Route path='/vehiclecontent/:vin' element={<VehicleContent/>}/>   
      <Route path="/profile" element={<ProfilePage/>}/> 
      <Route path="/dealer" element={<DealerPage/>}/>
      <Route path="/dealerprofile" element={<DealerProfile/>}/>
      <Route path="/contact" element={<ContactPage/>}/>
      <Route path="/customerdashboard" element={<CustomerDashboard/>}/> 
      <Route path="/contactnav" element={<ContactNav/>}/>  
     </Routes>

     </>
  );
}

export default App;