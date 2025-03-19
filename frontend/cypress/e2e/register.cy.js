describe('Test de la page d\'inscription', () => {
    beforeEach(() => {
      // Aller sur la page d'inscription avant chaque test
      cy.visit('/users/register')
    })
  
    it('Affiche correctement la page d\'inscription', () => {
      cy.get('h1').should('contain', 'Créer un compte')
      cy.get('input[name="username"]').should('exist')
      cy.get('input[name="email"]').should('exist')
      cy.get('input[name="password"]').should('exist')
      cy.get('button').should('contain', "S'inscrire")
    })
  
    it('Permet de saisir un nom, un email et un mot de passe', () => {
      cy.get('input[name="username"]').type('TestUser')
      cy.get('input[name="email"]').type('testuser@example.com')
      cy.get('input[name="password"]').type('MotDePasse123')
  
      cy.get('input[name="username"]').should('have.value', 'TestUser')
      cy.get('input[name="email"]').should('have.value', 'testuser@example.com')
      cy.get('input[name="password"]').should('have.value', 'MotDePasse123')
    })
  
    it('Affiche un message d\'erreur si le formulaire est vide', () => {
      cy.get('button').click()
      cy.get('p').should('contain', 'Erreur') // Ajuste selon ton message d'erreur
    })
  
    it('Simule une inscription réussie', () => {
      cy.intercept('POST', '**/api/register', {
        statusCode: 200,
        body: { message: 'Inscription réussie !' }
      }).as('register')
  
      cy.get('input[name="username"]').type('NewUser')
      cy.get('input[name="email"]').type('newuser@example.com')
      cy.get('input[name="password"]').type('TestPassword123')
      
      cy.get('button').click()
      
      cy.wait('@register')
      cy.get('p').should('contain', 'Inscription réussie')
    })
  
    it('Simule une erreur lors de l\'inscription', () => {
      cy.intercept('POST', '**/api/register', {
        statusCode: 400,
        body: { message: 'Email déjà utilisé' }
      }).as('registerError')
  
      cy.get('input[name="username"]').type('ExistingUser')
      cy.get('input[name="email"]').type('existing@example.com')
      cy.get('input[name="password"]').type('TestPassword123')
      
      cy.get('button').click()
      
      cy.wait('@registerError')
      cy.get('p').should('contain', 'Email déjà utilisé')
    })
  })
  