import { render, screen } from '@testing-library/react'
import WorkCardSerie from '@/components/WorkCardSerie'
import React from 'react'
import '@testing-library/jest-dom' // pour matcher les assertions comme toBeInTheDocument

describe('WorkCardSerie', () => {
  const mockWork = {
    id: 1,
    name: 'Serie Name',
    first_air_date: '2025-01-01', // Mise à jour ici
    overview: 'This is an overview of the Serie that is a bit long.',
    poster_path: '/path/to/poster.jpg',
    vote_average: 8.5,
  }

  test('affiche les informations de la série correctement lorsque work est bien formé', () => {
    render(<WorkCardSerie work={mockWork} />)

    // Vérification des éléments affichés
    expect(screen.getByText(mockWork.name)).toBeInTheDocument()
    expect(screen.getByText(mockWork.first_air_date)).toBeInTheDocument() // Mise à jour ici
    expect(
      screen.getByText(mockWork.overview.slice(0, 100) + '...')
    ).toBeInTheDocument()
    expect(
      screen.getByText(`Rating: ${mockWork.vote_average}/10`)
    ).toBeInTheDocument()

    // Vérification de l'image
    const image = screen.getByAltText(mockWork.name)
    expect(image).toHaveAttribute(
      'src',
      `https://image.tmdb.org/t/p/w500${mockWork.poster_path}`
    )
  })

  test('le lien mène à la page de la série correspondant', () => {
    render(<WorkCardSerie work={mockWork} />)

    // Vérification du lien
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', `/works/series/${mockWork.id}`)
  })
})
