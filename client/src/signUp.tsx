import { Alert, Container, Row, Col } from 'reactstrap'
import { useState } from 'react'

import './signUp.css'
import { httpPost } from './utils/axiosUtils'

function SignUp() {
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (event: any) => {
    event.preventDefault()

    try {
      const formData = new FormData(event.target)
      const data = Object.fromEntries(formData)
      const response = await httpPost(`auth/signUp`, data)
      if (response.success === true) {
        window.location.href = '/login'
      }
    } catch (error) {
      setError((error as { message?: string })?.message || 'An unexpected error occurred. Please try again later.')
    }
  }

  return (
    <Container>
      <Row>
        <Col>
          <section className="signup-section" aria-label="User Signup">
            <h2>Create Your Account</h2>
            <form onSubmit={handleSubmit} className="signup-form">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" required placeholder="you@example.com" />

              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" required placeholder="Enter your password" />

              <label htmlFor="confirm-password">Confirm Password</label>
              <input type="password" id="confirm-password" name="confirmPassword" required placeholder="Re-enter your password" />

              {error && <Alert color="danger">{error}</Alert>}

              <button type="submit">Sign Up</button>
            </form>
            <p className="login-text">
              Already have an account? <a href="/login">Log in</a>
            </p>
          </section>
        </Col>
      </Row>
    </Container>
  )
}

export default SignUp
