import { Container, Row, Col } from 'reactstrap'

import './home.css'

function Home() {
  return (
    <Container>
      <Col>
        <Row>
        <section className="hero" aria-label="Introduction">
          <div className="hero-text">
            <h1>Welcome to My Website</h1>
            <p>Discover amazing features and solutions that help you grow and succeed in your projects.</p>
            <a href="/signUp" role="button">Sign Up</a>
          </div>
          <div className="hero-image">
            <img 
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80" 
              alt="Workspace with laptop and coffee" 
              loading="lazy"
            />
          </div>
        </section>

        <section className="features" aria-label="Features">
          <article className="feature-card">
            <h3>Easy to Use</h3>
            <p>Our platform is intuitive and user-friendly, so you can get started quickly without any hassle.</p>
          </article>
          <article className="feature-card">
            <h3>Customizable</h3>
            <p>Tailor features and settings to match your workflow and preferences perfectly.</p>
          </article>
          <article className="feature-card">
            <h3>Secure & Reliable</h3>
            <p>We prioritize your security and provide a robust, dependable experience 24/7.</p>
          </article>
        </section>
        </Row>
      </Col>
    </Container>
  )
}

export default Home
