it('Form Fill - Fill and verify (con detección dinámica de botones)', () => {
    const formData = {
      firstName: 'Juan',
      lastName: 'Pérez',
      email: 'juan@test.com',
      password: '123456'
    };
  
    cy.visit('https://thelab.boozang.com/formFill');
  
    // Llenar el formulario (name="..." en minúsculas)
    cy.get('input[name="firstname"]').type(formData.firstName);
    cy.get('input[name="lastname"]').type(formData.lastName);
    cy.get('input[name="email"]').type(formData.email);
    cy.get('input[name="password"]').type(formData.password);
  
    // Botón SAVE TO DB (dinámico)
    cy.get('button').should('exist').then(($btns) => {
      const saveBtn = [...$btns].find(btn =>
        btn.innerText.trim().toLowerCase().includes('save')
      );
      if (saveBtn) {
        cy.wrap(saveBtn).click();
      } else {
        throw new Error('SAVE TO DB button not found');
      }
    });
  
    // Botón SHOW USERS IN DB (dinámico)
    cy.get('button').should('exist').then(($btns) => {
      const showBtn = [...$btns].find(btn =>
        btn.innerText.trim().toLowerCase().includes('show')
      );
      if (showBtn) {
        cy.wrap(showBtn).click();
      } else {
        throw new Error('SHOW USERS IN DB button not found');
      }
    });
  
    // Verificar que los datos se muestren
    cy.contains(formData.firstName).should('exist');
    cy.contains(formData.lastName).should('exist');
  });
  