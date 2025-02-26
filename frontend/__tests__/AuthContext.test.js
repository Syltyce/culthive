import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { AuthProvider } from '@/components/AuthContext'
import AuthContext from '@/components/AuthContext'

// Mock de la fonction fetch
global.fetch = jest.fn()

describe('AuthContext', () => {
  beforeEach(() => {
    // Réinitialiser fetch avant chaque test
    fetch.mockClear()
  })

  it("devrait mettre à jour l'état de l'utilisateur et l'authentification si un token est stocké", async () => {
    // Mock de la réponse fetch
    const mockUser = { name: 'Utilisateur Test', email: 'test@example.com' }
    localStorage.setItem('token', 'fake-token') // Simuler un token stocké dans localStorage

    fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(mockUser),
    })

    // Rendre le composant avec le contexte
    render(
      <AuthProvider>
        <AuthContext.Consumer>
          {({ user, isAuthenticated }) => (
            <>
              <div>
                {isAuthenticated ? 'Authenticated' : 'Not Authenticated'}
              </div>
              <div>{user ? user.name : 'No User'}</div>
            </>
          )}
        </AuthContext.Consumer>
      </AuthProvider>
    )

    // Attendre la mise à jour de l'état
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:3000/api/users/profile',
        expect.objectContaining({
          headers: expect.objectContaining({
            Authorization: 'Bearer fake-token',
          }),
        })
      )
    })

    // Vérifier si l'utilisateur est authentifié et que les informations de l'utilisateur sont rendues
    await waitFor(() => {
      expect(screen.getByText('Authenticated')).toBeInTheDocument()
      expect(screen.getByText('Utilisateur Test')).toBeInTheDocument()
    })
  })

  it('devrait ne pas authentifier si un token est absent ou invalide', async () => {
    localStorage.removeItem('token') // Retirer le token de localStorage

    // Rendre le composant avec le contexte
    render(
      <AuthProvider>
        <AuthContext.Consumer>
          {({ user, isAuthenticated }) => (
            <>
              <div>
                {isAuthenticated ? 'Authenticated' : 'Not Authenticated'}
              </div>
              <div>{user ? user.name : 'No User'}</div>
            </>
          )}
        </AuthContext.Consumer>
      </AuthProvider>
    )

    // Attendre que le composant se mette à jour
    await waitFor(() => {
      expect(screen.getByText('Not Authenticated')).toBeInTheDocument()
      expect(screen.getByText('No User')).toBeInTheDocument()
    })
  })

  it('devrait gérer les erreurs de requête API', async () => {
    localStorage.setItem('token', 'fake-token') // Simuler un token stocké dans localStorage

    fetch.mockRejectedValueOnce(new Error('Erreur de connexion'))

    // Rendre le composant avec le contexte
    render(
      <AuthProvider>
        <AuthContext.Consumer>
          {({ user, isAuthenticated }) => (
            <>
              <div>
                {isAuthenticated ? 'Authenticated' : 'Not Authenticated'}
              </div>
              <div>{user ? user.name : 'No User'}</div>
            </>
          )}
        </AuthContext.Consumer>
      </AuthProvider>
    )

    // Attendre que le composant se mette à jour après l'échec de la requête
    await waitFor(() => {
      expect(screen.getByText('Not Authenticated')).toBeInTheDocument()
      expect(screen.getByText('No User')).toBeInTheDocument()
    })
  })
})
