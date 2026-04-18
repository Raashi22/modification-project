describe("Array Visualizer Simple Test", () => {

  it("Page loads successfully", () => {

    cy.visit("/ArrayVisualizer.tsx")

    cy.contains("Array")

  })


  it("Insert value into array", () => {

    cy.visit("/ArrayVisualizer")

    cy.get('input[placeholder="Value to insert"]')
      .first()
      .type("10")

    cy.contains("Insert at End")
      .click()

    cy.contains("10")

  })

})