describe('app works correctly with routes', function() {
  before(function() {
    cy.visit('http://localhost:3001');
  });

  it("should open main page by default", function () {
    cy.contains("Соберите бургер");
  });

  it('should open ingredient modal', function() {
    cy.get("ul").contains("Краторная булка N-200i").click();
    cy.contains("Детали ингредиента").should("exist");
    cy.get("#modal").contains("Краторная булка N-200i").should("exist");
  });

  it('should reload page and open ingredient page', function() {
    cy.reload();
    cy.get("p").contains("Краторная булка N-200i").should("exist");
  });

  it('should return to previous page (without modal)', function() {
    cy.go('back');
    cy.contains("Соберите бургер");
  });

  it("should open feed page by click on menu button", function () {
    cy.get("a").contains("Лента заказов").click();
    cy.contains("Лента заказов");
  });

  it("should open login page by click on user button", function () {
    cy.get("a").contains("Личный кабинет").click();
    cy.contains("Вход");
    cy.get("a").contains("Конструктор").click();
  });
});