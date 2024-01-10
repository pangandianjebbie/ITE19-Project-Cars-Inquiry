import React, { useState, useEffect } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { IoCart } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom"; 
import logo from "../assets/logo.png";
import Modal from "./Modal";
import { supabase } from "./Supabase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import car from "../assets/car0.jpg";
import { FaRegCircleUser } from "react-icons/fa6";
import { RiLockPasswordLine } from "react-icons/ri";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUser } from "./UserContext"; 

function Navbar() {
  const [nav, setNav] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
  const [visible, setVisible] = useState(true);
  const [showModal1, setShowModal1] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState(null);
  const [selectedRole, setSelectedRole] = useState("customers");
  const { login } = useUser();
  const navigate = useNavigate();

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

  const handleShowModal1 = (isVisible) => {
    setShowModal1(isVisible);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      setFormError("Email and password are required.");
      return;
    }

    try {
      let data, error;

      // Fetch user data based on the selected role
      if (selectedRole === "admin") {
        ({ data, error } = await supabase
          .from("admin")
          .select("adminid, email, password")
          .eq("email", email)
          .single());
      } else if (selectedRole === "dealers") {
        ({ data, error } = await supabase
          .from("dealers")
          .select("dealerid, dealername, address, phone, email, password")
          .eq("email", email)
          .single());
      } else if (selectedRole === "customers") {
        ({ data, error } = await supabase
          .from("customers")
          .select(
            "customerid, name, address, phone, gender, annualincome, email, password"
          )
          .eq("email", email)
          .single());
      }
      if (error) {
        console.error(`Error fetching ${selectedRole} data:`, error);
      } else if (data) {
        // User found, check the password
        const storedPassword = data.password; // Replace with the actual column name

        // Compare the entered password with the stored password
        if (password === storedPassword) {
          toast.success(`${selectedRole} login successful`);
          console.log(`${selectedRole} login successful:`, data);

          // Modify the login function to store only the necessary user data
          const userData = {
            email: data.email,
            role: selectedRole,
            customerid: data.customerid,
            brandid: data.brandid,
            dealerid: data.dealerid,
            dealername: data.dealername,
            name: data.name,
            address: data.address,
            phone: data.phone,
            gender: data.gender,
            annualincome: data.annualincome,
            ...data,
          };

        login(userData);
        console.log('User data after login:', userData);

          // Redirect or perform additional actions as needed
          if (selectedRole === "admin") {
            navigate("/admin");
          } else if (selectedRole === "dealers") {
            navigate("/dealer");
          } else if (selectedRole === "customers") {
            navigate("/home");
          }
        } else {
          // Passwords do not match, handle authentication failure
          setFormError("Invalid password");
        }
      } else {
        // User not found, handle authentication failure
        setFormError(`${selectedRole} not found`);
      }
    } catch (error) {
      console.error("Error signing in:", error);
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
        <Link to="/">
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
            <Link to="/">
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
            <Link to="/aabout">
              <span
                className={`text-black ml-4 lg:ml-8 hover:text-pink-800 ${
                  visible ? "text-black" : "text-white"
                }`}
              >
                About
              </span>
            </Link>
          </li>  
          <li className="mb-3">
            <Link to="/contactnav">
              <span
                className={`text-black ml-4 lg:ml-8 hover:text-pink-800 ${
                  visible ? "text-black" : "text-white"
                }`}
              >
                Contact
              </span>
            </Link>
          </li>  
          <li className="mb-3">
            <button
              className={`btn bg-blue-600 text-white py-2 px-5 md:ml-5 rounded md:static ${
                visible ? "text-blue-600 hover:bg-blue-700" : "text-white"
              }`}
              onClick={() => handleShowModal1(true)}
            >
              Log In
            </button>
          </li>
        </ul>
        <Modal isvisible={showModal1} onClose={() => handleShowModal1(false)}>
          <div className="flex min-h-full flex-col justify-center px-6 py-[300px]lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <img
                className="mx-auto h-[60px] w-auto"
                src={logo}   
                alt="Your Company"
              />
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Sign in to your account
              </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form className="space-y-6" >
                <div>
                <label
                  htmlFor="role"
                  className="block text-sm font-medium leading-8 text-gray-900"
                >
                  Select Role
                </label>
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="block border border-grey-light w-full p-[15px] rounded mb-4 text-black"
                >
                  <option value="admin">Admin</option>
                  <option value="dealers">Dealer</option>
                  <option value="customers">Customer</option>
                </select>

                  <label
                    for="email"
                    className="block text-sm font-medium leading-8 text-gray-900" 
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                  <div className="relative mb-4">
                  <FaRegCircleUser className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" />
                    <input 
                      type="text" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                      required
                      className="block border border-grey-light w-full p-[15px] pl-[50px] rounded mb-4 text-black"
                    />
                  </div>
                  </div>
                </div>

                <div> 
                  <div className="relative mb-4">
                <RiLockPasswordLine className="absolute top-1/2 left-3 transform -translate-y-1/2 mt-3 text-gray-500" />
                  <div className="flex items-center justify-between">
                    <label
                      for="password"
                      class="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Password
                    </label> 
                  </div>
                  <div className="mt-2">
                    <input
                      type={showPassword ? "text" : "password"} 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)} 
                      required
                      minLength="8" 
                      className="block border border-grey-light w-full p-[15px] pl-[50px] rounded mb-4 text-black"
                    />
                    <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute my-[-62px] md:mx-[350px] mx-[290px] cursor-pointer"
                  >
                    {showPassword ? (
                      <FontAwesomeIcon
                        icon={faEyeSlash}
                        className="text-gray-400"
                      />
                    ) : (
                      <FontAwesomeIcon icon={faEye} className="text-gray-400" />
                    )}
                  </span>
                  </div> 
                  </div>
                </div>

                {formError && <div className="text-red-500">{formError}</div>}

                <div>
                  <button
                    type="submit"
                    onClick={handleLogin}
                    className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                  >
                    Sign in
                  </button>
                </div>
                <ToastContainer
                position="top-right"
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
              />
              </form>

              <p className="mt-10 text-center text-sm text-gray-500 ">
              Don't have an account?
                <Link
                  to="/signup"
                  className="font-semibold leading-6 text-orange-600 hover:text-orange-500 mx-2"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </div> 
        </Modal>
      </div>
    </div>
  );
}

export default Navbar;
