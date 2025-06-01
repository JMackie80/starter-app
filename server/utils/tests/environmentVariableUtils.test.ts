import { getEnvironmentVariable } from '../environmentVariableUtils'

describe('getEnvironmentVariable', () => {
    beforeEach(() => {
        process.env.TEST_VARIABLE = 'test_value'
    })

    afterEach(() => {
        delete process.env.TEST_VARIABLE
    })

    it('should return the value of an existing environment variable', () => {
        const result = getEnvironmentVariable('TEST_VARIABLE')
        expect(result).toBe('test_value')
    })

    it('should return undefined for a non-existing environment variable', () => {
        const result = getEnvironmentVariable('NON_EXISTENT_VARIABLE')
        expect(result).toBeUndefined()
    })
})