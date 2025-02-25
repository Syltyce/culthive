import { render, screen } from "@testing-library/react";
import WorkCardMovie from "@/components/WorkCardMovie"; // Adapté selon ton chemin d'import
import React from "react";
import '@testing-library/jest-dom'; // pour matcher les assertions comme toBeInTheDocument

describe("WorkCardMovie", () => {
  const mockWork = {
    id: 1,
    title: "Movie Title",
    release_date: "2025-01-01",
    overview: "This is an overview of the movie that is a bit long.",
    poster_path: "/path/to/poster.jpg",
    vote_average: 8.5,
  };

  test("affiche les informations du film correctement lorsque work est bien formé", () => {
    render(<WorkCardMovie work={mockWork} />);

    // Vérification des éléments affichés
    expect(screen.getByText(mockWork.title)).toBeInTheDocument();
    expect(screen.getByText(mockWork.release_date)).toBeInTheDocument();
    expect(screen.getByText(mockWork.overview.slice(0, 100) + "...")).toBeInTheDocument();
    expect(screen.getByText(`Rating: ${mockWork.vote_average}/10`)).toBeInTheDocument();

    // Vérification de l'image
    const image = screen.getByAltText(mockWork.title);
    expect(image).toHaveAttribute('src', `https://image.tmdb.org/t/p/w500${mockWork.poster_path}`);
  });

  test("le lien mène à la page du film correspondant", () => {
    render(<WorkCardMovie work={mockWork} />);

    // Vérification du lien
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', `/works/movies/${mockWork.id}`);
  });
});
