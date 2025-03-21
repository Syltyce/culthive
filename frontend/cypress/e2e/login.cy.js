describe('Connexion Utilisateur', () => {
  beforeEach(() => {
    cy.window().then((win) => {
      win.localStorage.setItem('tarteaucitron', 'accepted')
    })
    // Empeche tarte au citron de se lancer pour le test et de bloquer l'accès à l'inscription
    cy.intercept('/tarteaucitron/tarteaucitron.min.js', {
      forceNetworkError: true,
    })
    cy.visit('/users/login') // Visite la page de connexion
    cy.wait(2000) // Attente courte pour éviter le problème de rendu
  })

  it('Doit afficher un message de succès après une connexion valide', () => {
    cy.get('input[name="username"]').type('testuser@example2.com') // Utilise "username" ici
    cy.get('input[name="password"]').type('Test1234?')

    cy.get('button[type="submit"]').click()

    // Vérifie que le message de succès est affiché
    cy.contains('Connexion Réussie !')
  })

  it('Doit afficher une erreur si le mot de passe est faux', () => {
    cy.get('input[name="username"]').type('testuser@example.com') // Utilise "username" ici
    cy.get('input[name="password"]').type('123')

    cy.get('button[type="submit"]').click()

    // Vérifie que le message d'erreur s'affiche
    cy.contains('Email ou Mot de Passe incorrect.')
  })


})

Cypress.on('uncaught:exception', (err, runnable) => {
  if (err.message.includes('Hydration failed')) {
    return false // Ignore l'erreur et continue le test
  }
})
