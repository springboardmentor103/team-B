import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [authReady, setAuthReady] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  // 🔑 SINGLE hydration effect
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    // const expiry = localStorage.getItem("tokenExpiry");
    const storedUser = localStorage.getItem("user");
    // let logoutTimer;

    if (storedToken) {
      setToken(storedToken);
    }
    if (storedUser && storedUser !== undefined) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem("user");
      }
    }
      // const timeout = Number(expiry) - Date.now();
      // logoutTimer = setTimeout(() => logout(), timeout);
    setAuthReady(true);
    // return () => { logoutTimer && clearTimeout(logoutTimer);};
 }, []);

  const login = (newToken,user, expiry) => {
    // localStorage.setItem("token", newToken);
    // // localStorage.setItem("tokenExpiry", expiry);
    // localStorage.setItem("user", JSON.stringify(user));
    console.log("LOGIN CALLED", newToken, user);

  localStorage.setItem("token", newToken);
  localStorage.setItem("user", JSON.stringify(user));

  console.log("LS USER AFTER SET:", localStorage.getItem("user"));

    setToken(newToken); 
    setUser(user);
  };

  const logout = () => {
    // localStorage.removeItem("token");
    // localStorage.removeItem("tokenExpiry");
    localStorage.clear();
    navigate("/login");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isLoggedIn: !!token,
        isVerified: user?.isVerified ?? false,
        login,
        logout,
        authReady,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
