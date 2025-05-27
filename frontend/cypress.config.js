import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173", // tvoj Vite frontend
    supportFile: "cypress/support/e2e.ts",
    specPattern: "cypress/e2e/**/*.cy.{js,ts}",
    // setupNodeEvents(on, config) {
    //   // Dodaj event hookove ako želiš (npr. reset DB-a prije testiranja)
    //   return config;
    // },
  },
});

// import { defineConfig } from "cypress";

// export default defineConfig({
//   e2e: {
//     // baseUrl: 'http://localhost:3000', // ili port koji koristiš
//     // setupNodeEvents(on, config) {
//     //   // implement node event listeners here
//     // },
//   },
// });
