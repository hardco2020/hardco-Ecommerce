/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  // collectCoverage: true,
  collectCoverageFrom: [
    "**/*.{ts,tsx}",
    "!src/App.tsx",
    "!src/axiosURL.ts",
    "!src/data.ts",
    "!src/firebase.ts",
    "!src/react-app-env.d.ts",
    "!src/responsive.ts",
    "!src/theme.tsx",
    "!src/components/chatbot/Chatbot.tsx",
    "!src/index.tsx",
    "!src/components/stripe/Stripe.tsx",
  ],
  coverageDirectory: "coverage",
  testPathIgnorePatterns: ["/node_modules/"],
  verbose: true,
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  // collectCoverageFrom: ["**/*.{ts,tsx}"],
  // coveragePathIgnorePatterns: [
  //   "/node_modules/",
  //   "testconfig.js",
  //   "package.json",
  //   "package-lock.json",
  // ],
  // setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
};
