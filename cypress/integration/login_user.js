describe('Sisäänkirjautuminen', function() {
    it('Sisäänkirjautuminen onnistuu', function () {
        cy.visit('http://localhost')
        cy.get('input[name="tunnus"]').first().type(Cypress.env('CYPRESS_TEST_USER'))
        cy.get('input[name="password"]').first().type(Cypress.env('CYPRESS_TEST_PASSWORD'))
        cy.get('button').contains('Kirjaudu').click()
        cy.contains('Olet kirjautunut sisään')
    })
    it('Settings sivulle navigointi', function() {
        // Etsi oikea navinappi ja klikkaa
        cy.get('.navilinkki').contains('Settings').click()

        // Testataan että ollaan oikeassa paikassa hakemalla paria otsikkoa
        cy.contains('Asetukset')
        cy.contains('Vaihda email')
    })
    it ('Takaisin etusivulle ja logout', function () {
        // Etsitään etusivun navinappi
        cy.get('.navilinkki').contains('Etusivu').click()

        // Etsitään logout-nappi & klikki
        cy.get('button').contains('Logout').first().click();

        // Kirjaudu sisään taas näkyvillä
        cy.contains('Kirjaudu sisään')

        // Navilinkeissä ei näy mm. Settings ja Stats -sivuja
        cy.get('.navilinkki').contains('Settings').should('not.exist')
        cy.get('.navilinkki').contains('Stats').should('not.exist')
    })
  })