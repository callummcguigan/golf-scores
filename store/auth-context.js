import React, { useState, useContext, useEffect } from "react";
import { setCookies, getCookie, removeCookies } from "cookies-next";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  userId: "",
  login: (token) => {},
  logout: () => {},
  update: (token) => {},
});

export const AuthContextProvider = (props) => {
  const initialToken = getCookie("token");

  const [token, setToken] = useState(initialToken);
  const [id, setID] = useState("none");

  const userIsLoggedIn = !!token;

  const updateToken = (token) => {
    setToken(token);
  };

  const loginHandler = (token, id) => {
    setToken(token);
    setCookies("token", token);
    setID(id);
  };

  const logoutHandler = () => {
    setToken(null);
    removeCookies("token");
    setID(null);
    userIsLoggedIn = false;
  };

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    userId: id,
    login: loginHandler,
    logout: logoutHandler,
    update: updateToken,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
