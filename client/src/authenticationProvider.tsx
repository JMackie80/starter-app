import React, { useState, useEffect } from 'react';
import { AuthenticationContext } from './authenticationContext';

export const AuthenticationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const storedState = localStorage.getItem('isLoggedIn')
    return storedState ? Boolean(JSON.parse(storedState)) : false
  })

  useEffect(() => {
    localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
  }, [isLoggedIn])

  return (
    <AuthenticationContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthenticationContext.Provider>
  )
}