"use client";

import React, { createContext, useState, useEffect } from "react";

// Création du contexte
const AuthContext = createContext();

// Fournisseur du contexte
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // État pour stocker les données de l'utilisateur
  const [isAuthenticated, setIsAuthenticated] = useState(false); // État pour l'authentification

  useEffect(() => {
    // Exemple : vérifier le token dans localStorage pour maintenir l'état d'authentification
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setIsAuthenticated(true);
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
