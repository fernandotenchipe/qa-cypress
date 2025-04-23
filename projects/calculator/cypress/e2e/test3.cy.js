it('3. Yellow or Blue - Detect and click correct color button', () => {
    cy.visit('https://thelab.boozang.com/yellowOrBlue');
  
    // Paso 1: Detectar y hacer clic en botón "GENERATE COLOR"
    cy.wait(2000);
    cy.get('button').should('exist').then(($btns) => {
      const generateBtn = [...$btns].find(btn =>
        btn.innerText.trim().toLowerCase().includes('generate')
      );
      if (generateBtn) {
        cy.wrap(generateBtn).click();
      } else {
        throw new Error('GENERATE COLOR button not found');
      }
    });
  
    // Paso 2: Esperar a que aparezca BLUE o YELLOW y hacer clic en el correcto
    cy.wait(500);
    cy.get('button').should('exist').then(($btns) => {
      const colorBtn = [...$btns].find(btn => {
        const text = btn.innerText.trim().toLowerCase();
        return text.includes('blue') || text.includes('yellow');
      });
  
      if (colorBtn) {
        cy.wrap(colorBtn).click();
      } else {
        throw new Error('Color button not found');
      }
    });
  
    // Paso 3: Verificar que diga Success
    cy.get('body').invoke('text').then((text) => {
        cy.log('Texto visible en body:', text);
        expect(text.includes('Success!'), 'Texto Success! visible').to.be.true;
      });          
  });