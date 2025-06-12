import "@testing-library/jest-dom"; // extended matchers like toBeInTheDocument

// Optional: mock server, fetch, etc.
// global.fetch = jest.fn(() =>
//   Promise.resolve({
//     json: () => Promise.resolve({}),
//   })
// ) as jest.Mock;

beforeEach(() => {
  jest.clearAllMocks();
});
