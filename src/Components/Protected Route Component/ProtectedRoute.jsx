import { useContext } from "react";
import { authContext } from "../../Context/AuthContextProvider";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { Token, setToken } = useContext(authContext);

  if (!Token) {
    const savedToken = localStorage.getItem("userToken");
    if (savedToken) {
      setToken(savedToken);
    } else {
      return <Navigate to="/login" />;
    }
  }

  return <>{children}</>;
}
