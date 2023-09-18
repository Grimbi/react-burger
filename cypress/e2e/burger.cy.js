export const INGREDIENTS_URL = 'https://norma.nomoreparties.space/api/ingredients';
export const LOGIN_URL = 'https://norma.nomoreparties.space/api/auth/login';
export const ORDER_URL = 'https://norma.nomoreparties.space/api/orders';

describe("service is available", () => {
    beforeEach(() => {
        cy.visit("/");
    });

    it("should be available on localhost", () => {
        cy.get("[class^=BurgerIngredients]")
            .should("exist");
    });

    it("should has loaded ingredients", () => {
        cy.get("[data-testid=ingredient]").should("have.length.at.least", 2);
    });
});

describe("drag & drop ingredients", () => {
    beforeEach(() => {
        cy.visit("/");
    });

    it("should drag ingredient to the basket work properly", () => {
        cy.get("[data-testid=burger-ingredient").should("not.exist");

        const dataTransfer = new DataTransfer()

        cy.get("[data-testid=ingredient]").eq(0).trigger("dragstart", {dataTransfer})
        cy.get("[class^=BurgerConstructor_container]").trigger("drop", {dataTransfer})

        cy.get("[data-testid=burger-ingredient]").should("exist");
    });
});

describe("ingredient modal window", () => {
    beforeEach(() => {
        cy.visit("/");
        cy.get("[data-testid=ingredient]").eq(0).click();
    });

    it("should show ingredient modal", () => {
        cy.get("[data-testid=modal]").should("be.visible");
    });

    it("should modal window have ingredient details", () => {
        cy.get("[class^=IngredientDetails_modalHeader]").should('exist');
        cy.get("[class^=IngredientDetails_image]").should("exist");
        cy.get("[class^=IngredientDetails_nutrients]").should("exist");
    });

    it("should close modal properly", () => {
        cy.get("[class^=Modal_close]").should("exist").click();
        cy.get("[data-testid=modal]").should("not.exist");
    });
});

describe("making order", () => {
    beforeEach(() => {
        cy.intercept("GET", INGREDIENTS_URL, {fixture: "ingredients-response.json"});
        cy.intercept("POST", LOGIN_URL, {fixture: "login-response.json"}).as("loginSuccess");
        cy.intercept('POST', ORDER_URL, {fixture: "make-order-response.json"});

        cy.visit("login#/login");

        cy.get("[type=email]").type("test@mail.com");
        cy.get("[type=password]").type("1234");
        cy.get("[type=submit]").click();

        cy.wait("@loginSuccess");

        const dataTransfer = new DataTransfer();
        cy.get("[data-testid=ingredient]").eq(0).trigger("dragstart", {dataTransfer});
        cy.get("[class^=BurgerConstructor_container]").trigger("drop", {dataTransfer});

        cy.get("[data-testid=ingredient]").eq(2).trigger("dragstart", {dataTransfer});
        cy.get("[class^=BurgerConstructor_container]").trigger("drop", {dataTransfer});

        cy.get("[data-testid=makeOrderButton]").click();
    })

    it("should show order modal", () => {
        cy.get("[data-testid=modal]").should("be.visible");
    });

    it("should have correct order number", () => {
        cy.get("[class^=OrderDetails_order").should("have.text", "555");
    })

    it("should close", () => {
        cy.get("[class^=Modal_close]").should("exist").click();
        cy.get("[data-testid=modal]").should("not.exist");
    })
})