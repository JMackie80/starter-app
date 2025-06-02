import { Container, Nav, Navbar, NavItem } from 'reactstrap'
import { NavLink } from 'react-router'

import { httpGet } from './utils/axiosUtils'

function Header({ isLoggedIn, onLogout }: { isLoggedIn: boolean | undefined, onLogout: () => void }) {
  const logout = async () => {
    await httpGet('auth/logout')
    onLogout?.()
  }

  return (
    <Navbar light sticky='top' expand='md'>
        <Container>
            <h1>Assessment</h1>
            <Nav className="me-auto" navbar>
              <NavItem>
                <NavLink className='nav-link' to='/'>
                  Home
                </NavLink>
              </NavItem>
              {
                !isLoggedIn && 
                (
                  <>
                    <NavItem>
                      <NavLink className='nav-link' to='/login'>
                        Login
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink className='nav-link' to='/signUp'>
                        Sign Up
                      </NavLink>
                    </NavItem>
                  </>
                )
              }
              {
                isLoggedIn &&
                (
                  <>
                    <NavItem>
                      <NavLink className='nav-link' to='/myFeed'>
                        My Feed
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink className='nav-link' to='/profile'>
                        My Profile
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink className='nav-link' onClick={logout} to='/login'>
                        Logout
                      </NavLink>
                    </NavItem>
                  </>
                )
              }
            </Nav>
        </Container>
    </Navbar>
  )
}

export default Header
