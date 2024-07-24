import React, { createContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/slices/authSlice";

export const GlobalContext = createContext();

const GlobalContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const authorized = localStorage.getItem("token");
    const userData = localStorage.getItem("userData");
    if (authorized && userData) {
      dispatch(
        login({
          userData: JSON.parse(userData),
        })
      );
    }
  }, []);
  return (
    <GlobalContext.Provider value={{ loading, setLoading }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
