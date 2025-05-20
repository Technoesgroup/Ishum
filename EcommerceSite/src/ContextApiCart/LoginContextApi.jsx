import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem("token"));
  const [loadingUser, setLoadingUser] = useState(false);
  const [user, setUser] = useState(() => {
  const storedUser = localStorage.getItem("user");
    if (!storedUser || storedUser === "undefined") return null;

    try {
      return JSON.parse(storedUser);
    } catch (error) {
      console.error("Failed to parse user from localStorage:", error);
      return null;
    }
  });

  const baseURL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

useEffect(() => {
  if (token && !user) {
    setLoadingUser(true);
    localStorage.setItem("token", token);
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${baseURL}/api/user/get-user`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data.user);
      } catch (error) {
        setUser(null);
      } finally {
        setLoadingUser(false);
      }
    };
    fetchUser();
  } else if (!token) {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUser(null);
  }
}, [token]);


  useEffect(() => {
    setIsLoggedIn(!!token);
  }, [token]);

  const logout = () => {
    setUser(null);
    setToken(null);
    setIsLoggedIn(false);
  };

  return (
  <AuthContext.Provider
  value={{
    isLoggedIn,
    setIsLoggedIn,
    user,
    setUser,
    token,
    setToken,
    logout,
    loadingUser, // add this
  }}
>

      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);



