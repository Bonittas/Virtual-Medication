import React, { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get("/api/auth/currentUser");
        setCurrentUser(response.data.user);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching current user:", error);
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, []);

  const value = {
    currentUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
