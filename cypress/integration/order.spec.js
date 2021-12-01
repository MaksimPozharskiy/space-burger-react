describe("app correctly works with dnd", function () {
  before(function () {
    cy.visit("http://localhost:3001");
  });

  it("should not make order with only buns and 1 ingredient", function () {
    cy.get("button").contains("Оформить заказ").click();
    cy.get("#modal").contains("Для создания бургера необходимы 2 булки и минимум 1 наполнитель").should("exist");
    cy.get("body").click(0,0);

    cy.get("div").contains("Соус Spicy-X").trigger("dragstart");
    cy.get("#dropTarget").trigger("drop");
    cy.get("#dropTarget").contains("Соус Spicy-X").should("exist");
    cy.get("button").contains("Оформить заказ").click();
    cy.get("#modal").contains("Для создания бургера необходимы 2 булки и минимум 1 наполнитель").should("exist");
    cy.get("body").click(0,0);
    cy.get("span.constructor-element__action").click();

    cy.get("div").contains("Краторная булка N-200i").trigger("dragstart");
    cy.get("#dropTarget").trigger("drop");
    cy.get("#dropTarget").contains("Краторная булка N-200i").should("exist");
    cy.get("button").contains("Оформить заказ").click();
    cy.get("#modal").contains("Для создания бургера необходимы 2 булки и минимум 1 наполнитель").should("exist");
    cy.get("body").click(0,0);
  });

  it("should make order", function () {
    cy.get("div").contains("Соус Spicy-X").trigger("dragstart");
    cy.get("#dropTarget").trigger("drop");
    cy.get("#dropTarget").contains("Соус Spicy-X").should("exist");
    cy.get("div").contains("Краторная булка N-200i").trigger("dragstart");
    cy.get("#dropTarget").trigger("drop");
    cy.get("#dropTarget").contains("Краторная булка N-200i").should("exist");
    cy.get("button").contains("Оформить заказ").click();

    cy.get("input[type='email']").type('1qaz2wsx@gmail.com');
    cy.get("input[type='password']").type('!QAZ2wsx');
    cy.get("button").contains("Войти").click();

    cy.get("a").contains("Конструктор").click();
    cy.get("button").contains("Оформить заказ").click();
  });
});