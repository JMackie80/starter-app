import { Container, Row, Col } from 'reactstrap'
import { useQuery } from 'react-query'

import './profile.css'
import { httpDelete, httpGet } from './utils/axiosUtils'
import ProfileCard from './profileCard'

function Profile() {
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

  if (isLoading) return (<>{'Loading...'}</>)
  if (error) return (<>{'An error has occurred: ' + error}</>)

  const handleProfileCreate = () => {
    window.location.href = '/profile/setup'
  }

  const  handleProfileUpdate = () => {
    window.location.href = '/profile/update'
  }

  const handleProfileDelete = async () => {
    await httpDelete('/userProfiles/me')
    window.location.href = '/profile'
  }

  if (!data) return (
      <>
        <section className="profile-readonly" aria-label="User Profile">
          <div className="hero-text">
            <h2>User Profile</h2>
            <a href="#" onClick={handleProfileCreate} role="button">Create Profile</a>
          </div>
        </section>
      </>
    )

  return (
    <Container>
      <Row>
        <Col>
          <section className="profile-readonly" aria-label="User Profile">
            <div className="hero-text">
              <h2>User Profile</h2>
              <a href="#" onClick={handleProfileUpdate} role="button">Edit Profile</a>
              <a href="#" onClick={handleProfileDelete} role="button">Delete Profile</a>
            </div>
            <ProfileCard {...data} />
          </section>
        </Col>
      </Row>
    </Container>
  )
}

export default Profile
