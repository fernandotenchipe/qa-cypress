describe('Boozang Quiz Automation', () => {

  
    it('1. Speed Game - Detect and click START and END dynamically', () => {
        cy.visit('https://thelab.boozang.com/speedgame');
      
        // Paso 1: Esperar que se cargue el DOM y encontrar el botón START GAME
        cy.wait(2000);
        cy.get('button').should('exist').then(($btns) => {
          const startBtn = [...$btns].find(btn =>
            btn.innerText.trim().toLowerCase().includes('start')
          );
      
          if (startBtn) {
            cy.wrap(startBtn).click();
          } else {
            throw new Error('START GAME button not found');
          }
        });
      
        // Paso 2: Esperar dinámicamente a que aparezca el botón END GAME
        cy.get('button', { timeout: 15000 }).should(($btns) => {
          const found = [...$btns].find(btn =>
            btn.innerText.trim().toLowerCase().includes('end')
          );
          expect(found, 'END GAME button is visible').to.exist;
        }).then(($btns) => {
          const endBtn = [...$btns].find(btn =>
            btn.innerText.trim().toLowerCase().includes('end')
          );
          cy.wrap(endBtn).click();
        });
      
        // Paso 3: Validar que se muestre el mensaje de resultado
        cy.contains('Your reaction time').should('exist');
      });
      
  
      it('2. Wait Game - Detect START and END dynamically y esperar 5 segundos', () => {
        cy.visit('https://thelab.boozang.com/waitGame');
      
        // Paso 1: Detectar botón START GAME
        cy.wait(2000);
        cy.get('button').should('exist').then(($btns) => {
          const startBtn = [...$btns].find(btn =>
            btn.innerText.trim().toLowerCase().includes('start')
          );
      
          if (startBtn) {
            cy.wrap(startBtn).click();
          } else {
            throw new Error('START GAME button not found');
          }
        });
      
        // Paso 2: Esperar 5 segundos exactos
        cy.wait(5100);
      
        // Paso 3: Detectar botón END GAME y hacer click
        cy.get('button', { timeout: 5000 }).should(($btns) => {
          const found = [...$btns].find(btn =>
            btn.innerText.trim().toLowerCase().includes('end')
          );
          expect(found, 'END GAME button is visible').to.exist;
        }).then(($btns) => {
          const endBtn = [...$btns].find(btn =>
            btn.innerText.trim().toLowerCase().includes('end')
          );
          cy.wrap(endBtn).click();
        });
      
        // Paso 4: Verificar que el resultado fue exitoso
        cy.contains('Success').should('exist');
      });
      
  
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
      
  
      it('4. Sorted List - Detect ADD TODO and add 2 items', () => {
        cy.visit('https://thelab.boozang.com/sortedList');
      
        // Esperar a que se cargue todo
        cy.wait(2000);
      
        // Paso 1: Escribir y agregar el primer ítem
        cy.get('input[type="text"]').type('Huevos');
        cy.get('button').should('exist').then(($btns) => {
          const addBtn = [...$btns].find(btn =>
            btn.innerText.trim().toLowerCase().includes('add')
          );
          if (addBtn) {
            cy.wrap(addBtn).click();
          } else {
            throw new Error('ADD TODO button not found');
          }
        });
      
        // Paso 2: Segundo ítem
        cy.get('input[type="text"]').type('Cereal');
        cy.get('button').should('exist').then(($btns) => {
          const addBtn = [...$btns].find(btn =>
            btn.innerText.trim().toLowerCase().includes('add')
          );
          if (addBtn) {
            cy.wrap(addBtn).click();
          } else {
            throw new Error('ADD TODO button not found (2nd item)');
          }
        });
      
        // Paso 3: Verificar que los ítems fueron agregados
        cy.get('li', { timeout: 5000 }).should('have.length.gte', 2);
      });
      
      
      it('5. Form Fill - Fill and verify (con detección dinámica de botones)', () => {
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
      
  });
      