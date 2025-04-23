it('7. Concatenate Strings - Read and submit', () => {
    cy.visit('https://thelab.boozang.com/concatStrings');
  
    // Paso 1: Click en el botón "Generate strings"
    cy.contains('button', 'Generate strings').click();
  
    // Paso 2: Leer las dos palabras generadas
    cy.wait(300);
    cy.get('div.strings').then(($div) => {
      const words = $div.text()
        .trim()
        .split('\n')
        .map(w => w.trim())
        .filter(Boolean);
  
      const fullString = words.slice(0, 2).join('');
  
      // Paso 3: Escribir el string en el input
      cy.get('input[name="strings"]').type(fullString);
  
      // Paso 4: Detectar dinámicamente el botón Submit string
      cy.get('button').should('exist').then(($btns) => {
        const submitBtn = [...$btns].find(btn =>
          btn.innerText.trim().toLowerCase().includes('submit string')
        );
        if (submitBtn) {
          cy.wrap(submitBtn).click();
        } else {
          throw new Error('Submit button not found');
        }
      });
  
      // Paso 5: Verificar que diga Success!
      cy.contains('Success!').should('exist');
    });
  });
  