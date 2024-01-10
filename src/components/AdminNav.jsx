import React, { useState, useEffect } from 'react' 
import { IoCart } from "react-icons/io5"; 
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai' 
import { Link } from 'react-router-dom' 
import { CgProfile } from 'react-icons/cg'
import { supabase } from './Supabase'
import logo from '../assets/logo.png'

function Nav() {
  const [nav, setNav] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
  const [showProfile, setProfile] = useState(false);
  const [visible, setVisible] = useState(true);

  const handleNav = () => {
    setNav(!nav);
  };

  const logoo = {
    width: "80px",
  };
  
  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset;
    setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
    setPrevScrollPos(currentScrollPos);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos, visible]);
 

  const handleProfile = () => {
    setProfile(!showProfile);
  }; 

  const handleLogout = async () => {
    // Display a confirmation prompt
    const shouldLogout = window.confirm('Are you sure you want to logout?');

    if (!shouldLogout) {
      return;
    }

    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error('Error signing out:', error.message);
      } else {
        console.log('Sign-out successful');
        // Optionally, you can redirect the user to another page after logout
        window.location.href = '/'; // Redirect to the login page after logout
      }
    } catch (error) {
      console.error('Error signing out:', error.message);
    }
  };  

  return (
    <div
      className={`shadow-md w-full fixed top-0 left-0 transition-all duration-300 ease-in-out ${
        visible ? "bg-white" : "backdrop-blur-md"
      }`}
      style={{ zIndex: 1000 }}
    >
      <div className="md:px-12 px-7 md:flex justify-between items-center">
        <Link to="/admin">
          <div className="flex text-2xl cursor-pointer items-center gap-2">
            <img src={logo} alt="Logo" className="py-4" style={logoo} />
            <span
              className={`hover:text-pink-800 text-lg font-bold ${
                visible ? "text-black" : "text-white"
              }`}
            >
              Connect Corp.
            </span>
          </div>
        </Link>

        <div
          onClick={handleNav}
          className="w-7 h-7 absolute right-8 top-6 cursor-pointer md:hidden"
        >
          {nav ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
        </div>

        <ul
          className={`${
            nav ? "block" : "hidden"
          } md:flex md:items-center md:pb-0 pb-[100px] 
          md:static absolute md:top-0
           ${visible ? "bg-white" : "bg-transparent"} left-0 w-full md:w-auto 
           md:pl-0 pl-9 transition-all duration-500 
           ease-in`}
        > 

              <li className="mb-3">
                  <Link to="/admin">
                    <span
                      className={`text-black ml-4 lg:ml-8 hover:text-pink-800 ${
                        visible ? "text-black" : "text-white"
                      }`}
                    >
                      Home
                    </span>
                  </Link>
                </li>
                <li className="mb-3">
                  <Link to="/adcars">
                    <span
                      className={`text-black ml-4 lg:ml-8 hover:text-pink-800 ${
                        visible ? "text-black" : "text-white"
                      }`}
                    >
                      Cars
                    </span>
                  </Link>
                </li>
                <li className="mb-3">
                  <Link to="/addealer">
                    <span
                      className={`text-black ml-4 lg:ml-8 hover:text-pink-800 ${
                        visible ? "text-black" : "text-white"
                      }`}
                    >
                      Dealers
                    </span>
                  </Link>
                </li>   
          <li className="mb-3 ml-4 cursor-pointer">
          <div onClick={handleProfile}>
             <CgProfile className='w-7 h-7'/>
              <ul className={`${showProfile ? 'block' : 'hidden'} absolute top-90 md:left-[1350px] text-black bg-gradient-to-r from-indigo-200  to-pink-200 py-2 px-10 mt-2 rounded-md cursor-pointer`}> 
                <li><button onClick={handleLogout}>Logout</button></li>
              </ul>
          </div>    
          </li> 
        </ul>
      </div>
    </div>
  );
}

export default Nav;
