describe('Tunnuksen luonti', function () {
    before(() => {
        cy.task('db:deleteUsers')
    })
    it('Etusivu aukeaa', function () {
        cy.visit('http://localhost:8080/')
        cy.contains('Risbeegomfkerho')
    })
    it('Luo uusi käyttäjä', function () {
        cy.get('input[name="tunnus"').last().type('Cypress');
        cy.get('input[name="password').last().type('RandomPassword');
        cy.get('input[name="password2').last().type('RandomPassword');
        cy.get('button').contains('Luo').click();
        cy.contains('luotiin onnistuneesti');
    })
    it('Aktivoimattomalla tunnuksella ei voi kirjautua sisään', function () {
        cy.get('input[name="tunnus"]').first().type('Cypress')
        cy.get('input[name="password"]').first().type("RandomPassword")
        cy.get('button').contains('Kirjaudu').click()
        cy.contains('ei ole aktivoitu');
    })
    it('Aktivoidaan käyttäjä -> kirjautuminen onnistuu', function () {
        cy.task('db:activateUsers');
        cy.get('input[name="tunnus"]').first().type('Cypress');
        cy.get('input[name="password"]').first().type("RandomPassword");
        cy.get('button').contains('Kirjaudu').click();
        cy.contains('kirjautunut sisään tunnuksella Cypress');
    })
    it('Kirjaudutaan ulos', function () {
        cy.get('button').contains('Logout').click();
        cy.wait(1000);  // Odotetaan sekunti jotta ehtii kirjautua ulos...
        cy.contains('Olet kirjautunut sisään').should('not.exist');
    })
})