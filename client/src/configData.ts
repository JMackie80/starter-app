export const SERVER_URL = 'http://localhost:3001'

export const getAxiosConfig = () => ({
  headers: {
    'Content-Type': 'application/json' 
  }, 
  timeout: 2400000
})
