import React, { createContext, useContext } from 'react';

// Define the shape of the context
interface AuthenticationContextType {
  isLoggedIn: boolean
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
}

// Create the context with a default value
export const AuthenticationContext = createContext<AuthenticationContextType | undefined>(undefined)

// Custom hook to use the AuthenticationContext
export const useAuthenticationContext = (): AuthenticationContextType => {
  const context = useContext(AuthenticationContext)
  if (!context) {
    throw new Error('useAuthenticationContext must be used within an AuthenticationProvider')
  }
  return context;
}