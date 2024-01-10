import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { supabase } from "./Supabase";
import { FaRegCircleUser } from "react-icons/fa6";
import { RiLockPasswordLine } from "react-icons/ri";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUser } from "./UserContext"; 

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState(null);
  const [selectedRole, setSelectedRole] = useState("customer");
  const { login } = useUser();
  const navigate = useNavigate();

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

      // Redirect using useNavigate
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
    <>
      <Navbar /> 
      <div
        className="text-white md:h-[900px] flex items-center justify-center bg-gradient-to-r from-white via-blue-300 to-pink-300" 
      >
        <div className="container h-[715px] max-w-[500px] md:mt-[150px] mt-[150px]  mx-auto">
          <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form className="space-y-6">
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
                  htmlFor="email"
                  className="block text-sm font-medium leading-8 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <div className="relative mb-4">
                    <FaRegCircleUser className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" />
                    <input
                      type="text"
                      className="block border border-grey-light w-full p-[15px] pl-[50px] rounded mb-4 text-black"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                    />
                  </div>
                </div>

                <div>
                  <div className="relative mb-4">
                    <RiLockPasswordLine className="absolute my-3 mx-1 top-1/2 left-3 transform -translate-y-1/2 text-gray-500" />
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium leading-6 text-gray-900"
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
                          <FontAwesomeIcon
                            icon={faEye}
                            className="text-gray-400"
                          />
                        )}
                      </span>
                    </div>
                  </div>
                </div>

                {formError && <div className="text-red-500">{formError}</div>}

                <button
                  type="submit"
                  onClick={handleLogin}
                  className="w-full text-center py-3 rounded bg-blue-600 text-white hover:bg-green-dark focus:outline-none my-1"
                >
                  Log In
                </button>
              </form>
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
            </div> 
            <div className="text-grey-dark mt-6">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="no-underline border-b border-blue text-orange-600 hover:text-orange-500"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
