import { Container, Row, Col, Alert } from 'reactstrap'
import { useState } from 'react'

import './profileSetup.css'
import { httpPost } from './utils/axiosUtils'

function ProfileSetup() {
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (event: any) => {
    event.preventDefault()

    try {
      const formData = new FormData(event.target)
      const data = Object.fromEntries(formData)
      await httpPost(`userProfiles`, data)
      window.location.href = '/profile'
      setError(null)
    } catch (error) {
      setError((error as { message?: string })?.message || 'An unexpected error occurred. Please try again later.')
    }
  }

  return (
    <Container>
      <Row>
        <Col>
          <section className="profile-section" aria-label="Edit Profile">
            <h2>Your Profile</h2>
            <form onSubmit={handleSubmit} className="profile-form">
              <label htmlFor="firstName">First Name</label>
              <input type="text" id="firstName" name="firstName" required placeholder="Jane" />

              <label htmlFor="lastName">Last Name</label>
              <input type="text" id="lastName" name="lastName" required placeholder="Doe" />

              <label htmlFor="headline">Headline</label>
              <input type="text" id="headline" name="headline" placeholder="Software Engineer, Writer, Creator" />

              <label htmlFor="bio">Bio</label>
              <textarea id="bio" name="bio" rows={4} placeholder="Tell us a little about yourself..."></textarea>

              <label htmlFor="profilePictureUrl">Profile Picture URL</label>
              <input type="url" id="profilePic" name="profilePictureUrl" placeholder="https://example.com/your-photo.jpg" />

              <label htmlFor="interests">Interests (comma-separated)</label>
              <input type="text" id="interests" name="interests" placeholder="coding, hiking, AI, music" />

              {error && <Alert color="danger">{error}</Alert>}

              <button type="submit">Save Changes</button>
            </form>
          </section>
        </Col>
      </Row>
    </Container>
  )
}

export default ProfileSetup
