import { Alert, Container, Row, Col } from 'reactstrap'
import { useState } from 'react'

import './login.css'
import { httpPost } from './utils/axiosUtils'

function Login({ onLogin }: { onLogin: () => void }) {
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (event: any) => {
    event.preventDefault()
  
    try {
      const formData = new FormData(event.target)
      const data = Object.fromEntries(formData)
      const response = await httpPost(`auth/login`, data)
      if (response.success === true) {
        onLogin?.()
      }
    } catch (error) {
      setError((error as { message?: string })?.message || 'An unexpected error occurred. Please try again later.')
    }
  }

  return (
    <Container>
      <Row>
        <Col>
          <section className="login-section" aria-label="User Login">
            <h2>Login to Your Account</h2>
            <form onSubmit={handleSubmit} className="login-form">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" required placeholder="you@example.com" />

              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" required placeholder="Enter your password" />

              {error && <Alert color="danger">{error}</Alert>}

              <button type="submit">Log In</button>
            </form>
            <p className="signup-text">
              Don't have an account? <a href="/signUp">Sign up</a>
            </p>
          </section>
        </Col>
      </Row>
    </Container>
  )
}

export default Login
