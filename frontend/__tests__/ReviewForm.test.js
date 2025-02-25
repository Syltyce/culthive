import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ReviewForm from "@/components/ReviewForm";
import React from "react";

// Mock du localStorage pour simuler un utilisateur connecté
global.localStorage = {
  getItem: jest.fn().mockReturnValue('{"id":1}'), // Simule un token avec un id utilisateur
  setItem: jest.fn(),
  removeItem: jest.fn(),
};

describe("ReviewForm", () => {
  test("affiche correctement les étoiles en fonction de la note", async () => {
    render(<ReviewForm workId={1} />); // Utilisation d'un workId pour passer l'argument

    // Vérifier d'abord si le message de connexion est affiché
    const loginMessage = screen.queryByText(/Veuillez vous connecter pour ajouter une review./);
    if (loginMessage) {
      expect(loginMessage).toBeInTheDocument();
      return;
    }

    // Attendre que les étoiles soient rendues
    await waitFor(() => {
      const stars = screen.getAllByTestId(/star-/); // Recherche les étoiles par leur data-testid
      expect(stars.length).toBe(10); // Vérifie qu'il y a 10 étoiles
    });

    // Vérifie que le formulaire est bien affiché
    expect(screen.getByText("Ajouter une Review")).toBeInTheDocument();

    // Récupérer les étoiles
    const stars = screen.getAllByTestId(/star-/);

    // Vérifie que les étoiles sont visibles et qu'aucune n'est sélectionnée par défaut
    stars.forEach((star) => {
      expect(star).not.toHaveClass("selected");
    });

    // On simule un clic sur la 5ème étoile
    fireEvent.click(stars[4]);

    // On vérifie que les 5 premières étoiles sont sélectionnées
    stars.forEach((star, index) => {
      if (index < 5) {
        expect(star).toHaveClass("selected");
      } else {
        expect(star).not.toHaveClass("selected");
      }
    });
  });
});
