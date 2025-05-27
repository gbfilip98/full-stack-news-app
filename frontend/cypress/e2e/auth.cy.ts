//example

// describe("Login page", () => {
//   it("allows user to login", () => {
//     cy.visit("/");
//     cy.contains("Sign In").click();
//     cy.get("input[name=email]").type("test@example.com");
//     cy.get("input[name=password]").type("password123");
//     cy.get("button[type=submit]").click();
//     cy.contains("Welcome").should("exist");
//   });
// });

// describe('Auth Flow', () => {
//   it('should show login form and allow login', () => {
//     cy.visit('/login');
//     cy.get('input[name="email"]').type('test@example.com');
//     cy.get('input[name="password"]').type('password123');
//     cy.get('form').submit();

//     cy.url().should('include', '/home');
//     cy.contains('Latest News');
//   });
// });
