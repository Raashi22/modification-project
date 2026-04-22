describe("Array Test", () => {

  it("Insert value", () => {

    cy.visit("/")

    cy.get('input[placeholder="Value to insert"]')
      .first()
      .type("10")

    cy.contains("Insert at End")
      .click()

    cy.wait(1000)

    cy.contains("10").should("exist")

  })

})