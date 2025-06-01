export default {
    transform: {
      '^.+\\.tsx?$': 'ts-jest', // Transform TypeScript files
      '^.+\\.jsx?$': 'babel-jest', // Transform JavaScript files
    },
    extensionsToTreatAsEsm: ['.ts', '.tsx'], // Treat TypeScript files as ES modules
}