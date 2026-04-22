describe("Array Visualizer Simple Test", () => {

  it("Page loads successfully", () => {

    cy.visit("/array")

  })

  it("Insert value into array", () => {

    cy.visit("/array")

    cy.get('input[placeholder="Value to insert"]')
      .first()
      .type("10")

    cy.contains("Insert at End")
      .click()

    cy.contains("10")

  })

})