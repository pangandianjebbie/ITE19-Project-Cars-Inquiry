import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // Load user data from localStorage on component mount
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const [user, setUser] = useState(storedUser);

  useEffect(() => {
    // Save user data to localStorage whenever it changes
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  
  // If you want to ensure that specific properties are always available, you can provide default values here.
  // Adjust the default values based on your actual data structure.
  const defaultUser = {
    email: '',
    role: '',
    name: '',
    address: '',
    phone: '',
    gender: '',
    annualincome: '',
  };

  return context ? context : { user: defaultUser };
};

export default UserContext;
