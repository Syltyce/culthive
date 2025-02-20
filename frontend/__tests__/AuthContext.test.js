import "@testing-library/jest-dom";
import { render, screen, act } from "@testing-library/react";
import React, { useContext } from "react";
import AuthContext, { AuthProvider } from "@/components/AuthContext";

// Composant de test pour accéder au contexte
const TestComponent = ({ onSetUser }) => {
  const { user, isAuthenticated, setUser } = useContext(AuthContext);

  // On expose setUser à l'extérieur pour le test
  React.useEffect(() => {
    if (onSetUser) onSetUser(setUser);
  }, [onSetUser, setUser]);

  return (
    <div>
      <p data-testid="auth-status">
        {isAuthenticated ? "Authenticated" : "Not Authenticated"}
      </p>
      <p data-testid="user-info">{user ? `User: ${user.name}` : "No user"}</p>
    </div>
  );
};

describe("AuthContext", () => {
  it("devrait initialiser l'authentification en fonction du token dans localStorage", () => {
    localStorage.setItem("token", "fake-token");

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByTestId("auth-status")).toHaveTextContent(
      "Authenticated"
    );
  });

  it('devrait afficher "Not Authenticated" si aucun token n\'est présent dans localStorage', () => {
    localStorage.removeItem("token");

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByTestId("auth-status")).toHaveTextContent(
      "Not Authenticated"
    );
  });

  it("devrait mettre à jour les données utilisateur", () => {
    let setUserFunction; // Variable pour stocker la fonction setUser

    render(
      <AuthProvider>
        <TestComponent onSetUser={(setUser) => (setUserFunction = setUser)} />
      </AuthProvider>
    );

    // Simuler une mise à jour du contexte utilisateur avec act()
    act(() => {
      setUserFunction({ name: "John Doe" });
    });

    expect(screen.getByTestId("user-info")).toHaveTextContent("User: John Doe");
  });
});
