/// <reference types="cypress" />


describe('UI-testing', () => {
    beforeEach(() => {
      // Cypress starts out with a blank slate for each test
      // so we must tell it to visit our website with the `cy.visit()` command.
      // Since we want to visit the same URL at the start of all our tests,
      // we include it in our beforeEach function so that it runs before each test
      cy.visit('http://localhost:3000/')
    }) 
    it('display Man and Woman hover contents', () => {
        // We use the `cy.get()` command to get all elements that match the selector.
        // Then, we use `should` to assert that there are two matched items,
        // which are the two default items.
        cy.get('[data-cy=Man]').should('have.text', 'Man')
        cy.get('[data-cy=Woman]').should('have.text', 'Woman')
        
        //when hover on man and woman should have block appear
        cy.get('[data-cy=Man]').trigger('mouseover')
        //cy.get('[id=mouse-over-popover]').should('be.visible')
        cy.get('[data-cy=Mancontent]').should('be.visible')

        cy.get('[data-cy=Man]').trigger('mouseout')
        cy.get('[data-cy=Mancontent]').should('not.exist')
        //when leave should be invisible 
        cy.get('[data-cy=Woman]').trigger('mouseover')
        cy.get('[data-cy=Womancontent]').should('be.visible')

        cy.get('[data-cy=Woman]').trigger('mouseout')
        cy.get('[data-cy=Womancontent]').should('not.exist')
    })
    it('display search bar',()=>{
        //onfocus searchContainer should appear search bar
        cy.get('[data-cy=searchContainer]').focus()
        cy.get('[data-cy=searchBar]').should('be.visible')
        cy.get('body').click(0,0);
        //cy.get('[data-cy=searchContainer]').blur()
        cy.get('[data-cy=searchBar]').should('not.be.visible')
        //not focus then searchContainer should close search bar 
    })
    it('display shopping cart',()=>{
      cy.get('[data-cy=shoppingCart]').click()
      cy.get('[data-cy=shoppingCartPopover]').should('be.visible')
      cy.get('body').click(0,0);
      cy.get('[data-cy=shoppingCartPopover]').should('not.be.visible')
      //click again then the shopping cart would disappear 
    })
})
    

