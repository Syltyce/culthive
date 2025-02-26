import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Footer from '@/components/Footer'

describe('Footer', () => {
  it('devrait afficher les liens de mentions légales, politique de confidentialité, gestion des cookies, CGU, et CGV', () => {
    render(<Footer />)

    // Vérifier la présence de chaque lien
    expect(screen.getByText(/Mentions légales/i)).toBeInTheDocument()
    expect(
      screen.getByText(/Politique de confidentialité/i)
    ).toBeInTheDocument()
    expect(screen.getByText(/Gestion des cookies/i)).toBeInTheDocument()
    expect(screen.getByText(/CGU/i)).toBeInTheDocument()
    expect(screen.getByText(/CGV/i)).toBeInTheDocument()
  })

  it('devrait afficher le texte de copyright', () => {
    render(<Footer />)
    const copyrightText = screen.getByText(/© 2025 CultHive/i)
    expect(copyrightText).toBeInTheDocument()
  })
})
