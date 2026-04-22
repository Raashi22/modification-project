describe("Array Test", () => {

  it("Insert value", () => {

    cy.visit("/")   // ✅ correct

    cy.get('input[placeholder="Value to insert"]')
      .first()
      .type("10")

    cy.contains("Insert").click()

    cy.contains("10")

  })

})