import { Container, Row, Col } from 'reactstrap'

import './notFound.css'
import { SERVER_URL } from './configData'

function NotFound() {
  return (
    <Container>
      <Row>
        <Col>
          <section className="not-found-section" aria-label="404 Page">
            <h1>404</h1>
            <h2>Page Not Found</h2>
            <p>The page you're looking for doesn’t exist or was moved.</p>
            <a className="back-home" href="/">← Back to Home</a>
          </section>
        </Col>
      </Row>
    </Container>
  )
}

export default NotFound
