export const SERVER_URL = window.location.host === 'localhost:3000' ? 'http://localhost:3001' : window.location.origin

export const getAxiosConfig = () => ({
  headers: {
    'Content-Type': 'application/json' 
  }, 
  timeout: 2400000
})
