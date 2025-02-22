"use client";

import React, { createContext, useState, useEffect } from "react";

// Création du contexte
const AuthContext = createContext();

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

// Fournisseur du contexte
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // État pour stocker les données de l'utilisateur
  const [isAuthenticated, setIsAuthenticated] = useState(false); // État pour l'authentification

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      fetch(`${API_URL}/api/users/profile`, {
        // Tu dois avoir un endpoint qui renvoie les infos de l'utilisateur
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setUser(data); // Mettre l'utilisateur dans le contexte
          setIsAuthenticated(true);
        })
        .catch(() => {
          setIsAuthenticated(false);
          setUser(null);
        });
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        setUser,
        setIsAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
