/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleNameMapper: {
        '^@App/(.*)$': '<rootDir>/src/$1',
        '^lib/(.*)$': '<rootDir>/common/$1',
        '^@/(.*)$': '<rootDir>/src/$1',
        '^ui/(.*)$': '<rootDir>/ui/$1',
        '^uicomponents/(.*)$': '<rootDir>/ui/components/$1',
        '^components/(.*)$': '<rootDir>/src/components/$1',
        '^pages/(.*)$': '<rootDir>/src/pages/$1',
        '^services/(.*)$': '<rootDir>/src/services/$1',
        '^api/(.*)$': '<rootDir>/src/api/$1',
        '^store/(.*)$': '<rootDir>/src/store/$1',
        '^utils/(.*)$': '<rootDir>/src/utils/$1',
        '^models/(.*)$': '<rootDir>/src/models/$1',
    },
    clearMocks: true,
};
