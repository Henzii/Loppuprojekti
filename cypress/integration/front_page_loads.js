describe('Etusivu ', function() {
    it('Etusivu aukeaa', function() {
      cy.visit('http://localhost')
      cy.contains('Risbeegomfkerho')
      // Ei kirjautunut sisään
      cy.contains('Kirjaudu sisään')
      cy.contains('Stats').should('not.exist')
    })
    it('Sisäänkirjautuminen epäonnistuu väärällä passulla', function () {
        cy.get('input[name="tunnus"]').first().type('Tester')
        cy.get('input[name="password"]').first().type("'ölfkewölfe")
        cy.get('button').contains('Kirjaudu').click()
        cy.contains('Väärä tunnus tai salasana')
    })
  })