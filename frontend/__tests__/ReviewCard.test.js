import { render, screen } from '@testing-library/react'
import ReviewCard from '@/components/ReviewCard'
import React from 'react'

// Mock de la fonction onUpdate et onDelete
const mockOnUpdate = jest.fn()
const mockOnDelete = jest.fn()

describe('ReviewCard', () => {
  const reviewMock = {
    id: 1,
    title: 'Super film',
    comment: 'Très agréable à regarder.',
    rating: 8,
    userId: 123,
    User: { username: 'UtilisateurTest' },
  }

  test('affiche correctement les étoiles en fonction de la note', () => {
    render(
      <ReviewCard
        review={reviewMock}
        onUpdate={mockOnUpdate}
        onDelete={mockOnDelete}
      />
    )

    // Vérifier que les étoiles sont rendues pour une note de 8/10
    const stars = screen.getAllByText('★') // Cherche par texte dans chaque span
    expect(stars).toHaveLength(10) // Vérifie qu'il y a bien 10 étoiles
    expect(
      stars.filter((star) => star.classList.contains('filled'))
    ).toHaveLength(8) // Vérifie qu'il y a 8 étoiles remplies
  })

  test('affiche correctement le titre et le commentaire de la critique', () => {
    render(
      <ReviewCard
        review={reviewMock}
        onUpdate={mockOnUpdate}
        onDelete={mockOnDelete}
      />
    )

    // Vérifier que le texte "Critique de UtilisateurTest" est bien présent
    expect(screen.getByText('Critique de')).toBeInTheDocument()
    expect(screen.getByText('UtilisateurTest')).toBeInTheDocument()
    expect(screen.getByText('Titre : Super film')).toBeInTheDocument()
    expect(
      screen.getByText('Commentaire : Très agréable à regarder.')
    ).toBeInTheDocument()
  })
})
