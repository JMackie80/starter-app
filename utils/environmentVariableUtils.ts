import dotenv from 'dotenv'

dotenv.config()

export const getEnvironmentVariable = (variablename: string): string | undefined => {
  return process.env[variablename]
}
