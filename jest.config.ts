import type { Config } from "jest";

const config: Config = {
  // ts-jest verwandelt TypeScript in JavaScript fuer Jest
  preset: "ts-jest",

  // jsdom simuliert einen Browser (brauchen wir spaeter fuer Component-Tests)
  testEnvironment: "jsdom",

  // Damit "@/..." Imports funktionieren (wie in tsconfig.json definiert)
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },

  // Nach dem Test-Environment laden: jest-dom Matcher registrieren
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],

  // Nur Dateien mit .test.ts oder .test.tsx werden als Tests erkannt
  testMatch: ["**/__tests__/**/*.test.ts?(x)"],
};

export default config;
