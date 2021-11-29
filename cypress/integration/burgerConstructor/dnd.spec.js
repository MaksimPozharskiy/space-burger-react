describe("app correctly works with dnd", function () {
  before(function () {
    cy.visit("http://localhost:3001");
  });

  it("should drag and drop and delete ingredient", function () {
    cy.get("div").contains("Соус Spicy-X").trigger("dragstart");
    cy.get("#dropTarget").trigger("drop");
    cy.get("#dropTarget").contains("Соус Spicy-X").should("exist");
    cy.get("span.constructor-element__action").click();
    cy.get("#dropTarget")
      .contains("Соус Spicy-X")
      .should("not.exist");
  });

  it("should drag and drop buns ingredient", function () {
    cy.get("div")
      .contains("Флюоресцентная булка R2-D3")
      .trigger("dragstart");
    cy.get("#dropTarget").trigger("drop");
    cy.get("#dropTarget")
      .contains("Флюоресцентная булка R2-D3")
      .should("exist");
  });

  it("should drag and drop not buns ingredient", function () {
    cy.get("div").contains("Соус Spicy-X").trigger("dragstart");
    cy.get("#dropTarget").trigger("drop");
    cy.get("#dropTarget").contains("Соус Spicy-X").should("exist");
  });
});