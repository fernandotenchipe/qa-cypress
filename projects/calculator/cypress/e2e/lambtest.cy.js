describe('Prueba de botón de login con Google en LambdaTest', () => {
    it('verifica que el botón existe y redirige a Google', () => {
      Cypress.on('uncaught:exception', () => false) // ignora errores React
  
      cy.visit('https://www.lambdatest.com/')
  
      // Aceptar cookies si aparece
      cy.get('body').then(($body) => {
        if ($body.find('#cookie-accept').length > 0) {
          cy.get('#cookie-accept').click()
        }
      })
  
      // Buscar y hacer clic en el botón
      cy.contains('Start free with Google', { timeout: 10000 }).should('be.visible').click()
  
      // Validar que el redireccionamiento ocurrió correctamente
      cy.origin('https://accounts.google.com', () => {
        cy.url().should('include', 'accounts.google.com')
      })
    })
  })
  