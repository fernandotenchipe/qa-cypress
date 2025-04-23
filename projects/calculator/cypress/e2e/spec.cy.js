describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/')

    // Agregar productos específicos al carrito
    const productsToAdd = [
      { name: 'Carrot', quantity: 3 },
      { name: 'Brocolli', quantity: 5 },
      { name: 'Apple', quantity: 8 }
    ]

    productsToAdd.forEach(product => {
      cy.get('.products').find('.product').each(($el) => {
        const productName = $el.find('h4.product-name').text()
        if (productName.includes(product.name)) {
          for (let i = 0; i < product.quantity; i++) {
            cy.wrap($el).find('button').click()
          }
        }
      })
    })

    // Verificar que el carrito tiene productos y proceder al checkout
    cy.get('.cart-icon').click()
    cy.contains('PROCEED TO CHECKOUT').click()

    // Continuar con el proceso de checkout
    cy.contains('Place Order').click()

    // Seleccionar el país México y aceptar términos
    cy.get('select').select('Mexico')
    cy.get('input[type="checkbox"]').check()
    cy.contains('Proceed').click()

    // Completar la aserción cuando se muestre el mensaje
    cy.contains('Thank you, your order has been placed successfully').should('be.visible')
  })
})