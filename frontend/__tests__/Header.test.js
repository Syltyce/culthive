import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "@/components/Header";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("Header", () => {
  it("devrait afficher le logo de CultHive", () => {
    render(<Header />);
    const logo = screen.getByAltText(/Logo de CultHive/i);
    expect(logo).toBeInTheDocument();
  });

  it("devrait afficher les liens de navigation", () => {
    render(<Header />);
    expect(screen.getByText(/Accueil/i)).toBeInTheDocument();
    expect(screen.getByText(/Films/i)).toBeInTheDocument();
    expect(screen.getByText(/Séries/i)).toBeInTheDocument();
    expect(screen.getByText(/Faire un don/i)).toBeInTheDocument();
  });

  it("devrait afficher la barre de recherche", () => {
    render(<Header />);
    expect(screen.getByPlaceholderText(/Rechercher.../i)).toBeInTheDocument();
  });

  it("devrait mettre à jour la recherche lorsque l'utilisateur tape", () => {
    render(<Header />);
    const input = screen.getByPlaceholderText(/Rechercher.../i);
    fireEvent.change(input, { target: { value: "Inception" } });
    expect(input.value).toBe("Inception");
  });
});
