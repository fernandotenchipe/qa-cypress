it('6. Cat Shelter - Add 2 cats and assign homes', () => {
    const cats = {
      cat1: 'Michi',
      cat2: 'Gatón'
    };
  
    const addCat = (catName, notes, behaviorLabel) => {
      cy.visit('https://thelab.boozang.com/catshelter');
  
      // Detectar el botón "Add Cat" como <a> con clase específica
      cy.get('a.link_btn.add').should('exist').click();
      cy.url({ timeout: 10000 }).should('include', '/addcat');
  
      // Llenar el formulario en /addcat
      cy.get('input[name="name"]').type(catName);
      cy.get('textarea').type(notes);
  
      // Seleccionar comportamiento
      cy.get('button').should('exist').then(($btns) => {
        const behaviorBtn = [...$btns].find(btn =>
          btn.innerText.trim().toLowerCase().includes(behaviorLabel.toLowerCase())
        );
        if (behaviorBtn) cy.wrap(behaviorBtn).click();
      });
  
      // Confirmar con el botón final "ADD CAT"
      cy.get('button').should('exist').then(($btns) => {
        const confirmBtn = [...$btns].find(btn =>
          btn.innerText.trim().toLowerCase().includes('add cat')
        );
        if (confirmBtn) cy.wrap(confirmBtn).click();
      });
    };
  
    // Agregar dos gatos
    addCat(cats.cat1, 'Le gusta dormir', 'stay inside');
    addCat(cats.cat2, 'Es muy activo', 'wants to go outside');
  
    // Validar que aparecen en la lista
    cy.visit('https://thelab.boozang.com/catshelter');
    cy.contains(cats.cat1).should('exist');
    cy.contains(cats.cat2).should('exist');
  });
  