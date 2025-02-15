import { createContext, useEffect, useState } from "react";

export const authContext = createContext();

function AuthContextProvider({ children }) {
  const [Token, setToken] = useState(null);

  useEffect(() => {
    const userTokenCheck = localStorage.getItem("userToken");
    if (userTokenCheck) {
      setToken(userTokenCheck);
    } else {
      setToken(null);
    }
  }, []);

  useEffect(() => {
    if (Token) {
      console.log("Token has changed, I'm in AuthContextProvider", Token);
      localStorage.setItem("userToken", Token);
    }
  }, [Token]);

  return (
    <authContext.Provider value={{ Token, setToken }}>
      {children}
    </authContext.Provider>
  );
}

export default AuthContextProvider;
