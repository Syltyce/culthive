describe('Inscription utilisateur', () => {
  beforeEach(() => {
    cy.window().then((win) => {
      win.localStorage.setItem('tarteaucitron', 'accepted');
    });
    // Empeche tarte au citron de se lancer pour le test et de bloquer l'accès à l'inscription 
    cy.intercept('/tarteaucitron/tarteaucitron.min.js', { forceNetworkError: true });
    cy.visit('/users/register') // Visite la page d'inscription
    cy.wait(2000) // Attente courte pour éviter le problème de rendu
  })

  it('Doit afficher un message de succès après une inscription valide', () => {    

    const email = `testuser_${Date.now()}@example.com`;  // Email unique à chaque fois

    cy.get('input[name="username"]').type('TestUser')
    cy.get('input[name="email"]').type(email)  // Utilisation d'un email unique
    cy.get('input[name="password"]').type('Test1234')

    cy.get('button[type="submit"]').click()

    // Vérifie que le message de succès est affiché
    cy.contains('Inscription réussie ! Vous pouvez vous connecter désormais !')
  })

  it('Doit afficher une erreur si le mot de passe est trop faible', () => {
    cy.get('input[name="username"]').type('TestUser')
    cy.get('input[name="email"]').type('testuser@example.com')
    cy.get('input[name="password"]').type('123')

    cy.get('button[type="submit"]').click()

    // Vérifie que le message d'erreur s'affiche
    cy.contains(
      'Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule et un chiffre.'
    )
  })

  it('Doit afficher une erreur si l’email est invalide', () => {
    cy.get('input[name="username"]').type('TestUser')
    cy.get('input[name="email"]').type('testuser@invalid')
    cy.get('input[name="password"]').type('Test1234')

    cy.get('button[type="submit"]').click()

    // Vérifie que le message d'erreur s'affiche
    cy.contains("L'email est invalide.")
  })

  it('Doit afficher une erreur si un champ est vide', () => {

    cy.get('input[name="username"]').type('TestUser')
    cy.get('input[name="email"]').clear() // Vider l'email
    cy.get('input[name="password"]').type('Test1234')

    cy.get('button[type="submit"]').click()

    // Vérifie que le message d'erreur s'affiche
    cy.contains('Tous les champs obligatoires ne sont pas remplis.')
  })
})

Cypress.on('uncaught:exception', (err, runnable) => {
  if (err.message.includes('Hydration failed')) {
    return false // Ignore l'erreur et continue le test
  }
})
