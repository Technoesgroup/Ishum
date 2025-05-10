import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem("token"));
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

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      console.log("my token :", token)
      // Fetch user data from /api/get-user if token is available
      const fetchUser = async () => {
        try {
          const res = await axios.get("http://localhost:4000/api/user/get-user", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(res.data.user); // ✅ Extract proper user object
          console.log("Fetched user from backend:", res.data.user);

        } catch (error) {
          console.error("Error fetching user:", error);
          setUser(null); // If there's an error, reset the user data
        }
      };
      fetchUser();
    } else {
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);



