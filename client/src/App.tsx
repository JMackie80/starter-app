import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter, Routes, Route } from 'react-router'

import './App.css'
import MyFeed from './myFeed'
import Header from './header'
import Footer from './footer'
import Home from './home'
import Login from './login'
import SignUp from './signUp'
import Profile from './profile'
import ProfileSetup from './profileSetup'
import NotFound from './notFound'
import AuthenticatedRoute from './authenticatedRoute'
import { useAuthenticationContext } from './authenticationContext'
import ProfileUpdate from './profileUpdate'

function App() {
  const { isLoggedIn, setIsLoggedIn } = useAuthenticationContext()
  const queryClient = new QueryClient()

  const login = () => {
    setIsLoggedIn(true)
    window.location.href = '/myFeed'
  }

  const logout = () => {
    setIsLoggedIn(false)
  }

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Header isLoggedIn={isLoggedIn} onLogout={logout} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login onLogin={login} />} />
            <Route path="/signUp" element={<SignUp />} />

            <Route element={<AuthenticatedRoute isAuthenticated={isLoggedIn} />}>
              <Route path="/myFeed" element={<MyFeed />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/profile/setup" element={<ProfileSetup />} />
              <Route path="/profile/update" element={<ProfileUpdate />} />
            </Route>
            
            <Route path="*" element={<NotFound />} />
          </Routes>   
          <Footer />
        </BrowserRouter>
      </QueryClientProvider>
    </>
  )
}

export default App
