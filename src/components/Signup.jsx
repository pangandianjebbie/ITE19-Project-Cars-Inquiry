import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Navbar from "./Navbar";
import { supabase } from "./Supabase";
import car1 from "../assets/car1.jpg";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [dealername, setDealername] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [annual_Income, setAnnual_Income] = useState("");
  const [role, setRole] = useState("customers"); // Default role is customer
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const validateEmail = (email) => {
    return true;
  };

  const validatePassword = (password) => {
    return true;
  };

  const handleSignUp = async () => {
    setNameError("");
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");
    let isValid = true;
  
    if (name.trim() === "") {
      setNameError("Name is required");
      isValid = false;
    }
  
    if (!validateEmail(email)) {
      setEmailError("Invalid email address");
      isValid = false;
    }
  
    if (!validatePassword(password)) {
      setPasswordError("Invalid password");
      isValid = false;
    }
  
    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      isValid = false;
    }
  
    if (!isValid) {
      return;
    }
  
    try {
      if (role === "dealers") {
        // Insert data into the Supabase 'dealer' table
        const { data: dealerData, error: dealerError } = await supabase
          .from("dealers")
          .upsert([
            {
              dealername,
              address,
              phone,
              email,
              password,
            },
          ]);
  
        if (dealerError) {
          console.error("Error inserting data into dealer table:", dealerError);
        } else {
          console.log("Data inserted into dealer table:", dealerData);
        }
      } else if (role === "customers") {
        // Insert data into the Supabase 'customer' table
        const { data: customerData, error: customerError } = await supabase
          .from("customers")
          .upsert([
            {
              name,
              address,
              phone,
              gender,
              annualincome: annual_Income, 
              email,
              password,
            },
          ]);
  
        if (customerError) {
          console.error(
            "Error inserting data into customer table:",
            customerError
          );
        } else {
          console.log("Data inserted into customer table:", customerData);
        }
      }
  
      // Optionally, redirect to a new page after successful sign-up
      window.location.href = "/login"; // Redirect to the login page after signup
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };
  

  return (
    <>
      <Navbar />
      <div
        className="text-black flex flex-col sm:flex-row bg-gradient-to-r from-pink-400 via-white to-blue-400" 
      >
        <div className="w-full h-[1110px]"></div>
        <div className="w-full flex items-center md:ml-[-1490px] p-4 sm:p-12 mt-[-690px] mb-[30px] ">
          <div className="container md:max-w-[700px] sm:max-w-[400px] md:mt-[830px] mt-[-260px] mx-auto border bg-gradient-to-r from-violet-100 to-violet-200 ">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center pb-4 mt-[40px]">
              Create an Account
            </h1>

            <label
              for="role"
              class="block mb-2 md:px-[70px] text-sm font-medium text-gray-900 dark:text-white"
            >
              Create account for{" "}
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className='bg-gray-50 border md:mx-[70px] md:max-w-[520px]  border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" py-3 my-2'
            >
              <option value="dealers">Dealer</option>
              <option value="customers">Customer</option>
            </select>

            <label
              for="name"
              class="block mb-2 md:px-[70px] my-3 text-sm font-medium text-gray-900 dark:text-white px"
            >
              Name
            </label>
            <input
              type="text"
              className={`bg-gray-50 border md:mx-[70px] md:max-w-[520px] border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" py-3 my-2 ${
                nameError ? "border-red-500" : ""
              }`}
              name="name"
              placeholder="Will Smith"
              onChange={(e) => {
                setName(e.target.value);
                setDealername(e.target.value);
                setNameError("");
              }}
            />
            {nameError && <p className="text-red-500">{nameError}</p>}

            <label
              for="email"
              class="block mb-2 md:px-[70px] my-3  text-sm font-medium text-gray-900 dark:text-white"
            >
              Email
            </label>
            <input
              type="text"
              className={`bg-gray-50 border md:mx-[70px] md:max-w-[520px] border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" py-3 my-2  ${
                emailError ? "border-red-500" : ""
              }`}
              name="email"
              placeholder="name@gmail.com"
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError("");
              }}
            />
            {emailError && <p className="text-red-500">{emailError}</p>}

            <div className="relative">
              <label
                for="password"
                class="block mb-2 md:px-[70px] my-3  text-sm font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                className={`bg-gray-50 border md:mx-[70px] md:max-w-[520px] border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" py-3 my-2 ${
                  passwordError ? "border-red-500" : ""
                }`}
                name="password"
                placeholder="Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError("");
                }}
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute my-[15px] md:mx-[80px] top-1/2 right-4 transform -translate-y-1/2 cursor-pointer"
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
            {passwordError && <p className="text-red-500">{passwordError}</p>}

            <div className="relative">
              <label
                for="confirm_password"
                class="block mb-2 md:px-[70px] my-3 text-sm font-medium text-gray-900 dark:text-white"
              >
                Confirm Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                className={`bg-gray-50 border md:mx-[70px] md:max-w-[520px] border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" py-3 my-2 ${
                  confirmPasswordError ? "border-red-500" : ""
                }`}
                name="confirm_password"
                placeholder="Confirm Password"
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setConfirmPasswordError("");
                }}
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute my-[12px] md:mx-[80px] top-1/2 right-4 transform -translate-y-1/2 cursor-pointer"
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
            {confirmPasswordError && (
              <p className="text-red-500">{confirmPasswordError}</p>
            )}

            {/* Add more input fields for specific roles (admin, seller, customer) */}
            {role === "customers" && (
              <>
                <label
                  for="address"
                  class="block mb-2 md:px-[70px] my-3 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Address
                </label>
                <input
                  type="text"
                  className='bg-gray-50 border md:mx-[70px] md:max-w-[520px] border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" py-3 my-2'
                  name="address"
                  placeholder="Address"
                  onChange={(e) => setAddress(e.target.value)}
                />

                <label
                  for="phone"
                  class="block mb-2 md:px-[70px] my-3 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Phone
                </label>
                <input
                  type="text"
                  className='bg-gray-50 border md:mx-[70px] md:max-w-[520px] border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" py-3 my-2'
                  name="phone"
                  placeholder="Phone"
                  onChange={(e) => setPhone(e.target.value)}
                />

                <label
                  for="gender"
                  class="block mb-2 md:px-[70px] my-3  text-sm font-medium text-gray-900 dark:text-white"
                >
                  Gender
                </label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className='bg-gray-50 border md:mx-[70px] md:max-w-[520px] border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" py-3 my-2'
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>

                <label
                  for="income"
                  class="block mb-2 md:px-[70px] my-3 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Annual Income
                </label>
                <input
                  type="text"
                  className='bg-gray-50 border md:mx-[70px] md:max-w-[520px] border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" py-3 my-2'
                  name="annual_income"
                  placeholder="Annual Income"
                  onChange={(e) => setAnnual_Income(e.target.value)}
                />
              </>
            )}

            {role === "dealers" && (
              <>
                <label
                  for="address"
                  class="block mb-2 md:px-[70px] my-3 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Address
                </label>
                <input
                  type="text"
                  className='bg-gray-50 border md:mx-[70px] md:max-w-[520px] border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" py-3 my-2'
                  name="address"
                  placeholder="Address"
                  onChange={(e) => setAddress(e.target.value)}
                />

                <label
                  for="phone"
                  class="block md:mb-2 md:px-[70px] md:my-3 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Phone
                </label>
                <input
                  type="text"
                  className='bg-gray-50 border md:mx-[70px] md:max-w-[520px] border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" py-3 my-2'
                  name="phone"
                  placeholder="Phone"
                  onChange={(e) => setPhone(e.target.value)}
                />
              </>
            )}

            <button
              type="button"
              onClick={handleSignUp}
              className="w-full text-center md:max-w-[300px] md:mx-[190px] my-[40px] py-3 rounded bg-green-500 text-white hover:bg-green-600 focus:outline-none "
            >
              Create Account
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
