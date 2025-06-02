import { Container, Row, Col, Alert } from 'reactstrap'
import { useEffect, useState } from 'react'

import './profileSetup.css'
import { httpGet, httpPatch } from './utils/axiosUtils'
import { useQuery } from 'react-query'

function ProfileSetup() {
  const [state, setState] = useState({
    userId: '',
    firstName: '',
    lastName: '',
    headline: '',
    bio: '',
    profilePictureUrl: '',
    interests: '',
  })
  const [formError, setFormError] = useState<string | null>(null)
  const { isLoading, error, data } = useQuery({
      queryKey: [`myProfile`],
      queryFn: async () => {
        try {
          return await httpGet('/userProfiles/me')
        } catch (err) {
          return null
        }
      },
    })
  
  useEffect(() => {
    if (data) {
      setState({ ...data, interests: data.interests.join(', ') })
    }
  }, [data])  

  if (isLoading) return (<>{'Loading...'}</>)
  if (error) return (<>{'An error has occurred: ' + error}</>)

  const handleSubmit = async (event: any) => {
    event.preventDefault()

    try {
      const formData = new FormData(event.target)
      const data = Object.fromEntries(formData)
      await httpPatch(`userProfiles/me`, data)
      window.location.href = '/profile'
      setFormError(null)
    } catch (error) {
      setFormError((error as { message?: string })?.message || 'An unexpected error occurred. Please try again later.')
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
              <input type="text" id="firstName" name="firstName" required placeholder="Jane" value={state.firstName} onChange={(e) => setState({ ...state, firstName: e.target.value })} />

              <label htmlFor="lastName">Last Name</label>
              <input type="text" id="lastName" name="lastName" required placeholder="Doe" value={state.lastName} onChange={(e) => setState({ ...state, lastName: e.target.value })} />

              <label htmlFor="headline">Headline</label>
              <input type="text" id="headline" name="headline" placeholder="Software Engineer, Writer, Creator" value={state.headline} onChange={(e) => setState({ ...state, headline: e.target.value })} />

              <label htmlFor="bio">Bio</label>
              <textarea id="bio" name="bio" rows={4} placeholder="Tell us a little about yourself..." value={state.bio} onChange={(e) => setState({ ...state, bio: e.target.value })}></textarea>

              <label htmlFor="profilePictureUrl">Profile Picture URL</label>
              <input type="url" id="profilePic" name="profilePictureUrl" placeholder="https://example.com/your-photo.jpg" value={state.profilePictureUrl} onChange={(e) => setState({ ...state, profilePictureUrl: e.target.value })} />

              <label htmlFor="interests">Interests (comma-separated)</label>
              <input type="text" id="interests" name="interests" placeholder="coding, hiking, AI, music" value={state.interests} onChange={(e) => setState({ ...state, interests: e.target.value })} /> 

              {formError && <Alert color="danger">{formError}</Alert>}

              <button type="submit">Save Changes</button>
            </form>
          </section>
        </Col>
      </Row>
    </Container>
  )
}

export default ProfileSetup
