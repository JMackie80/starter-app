import { Container, Row, Col} from 'reactstrap'

function Footer() {
  return (
    <footer className="site-footer">
      <Container>
        <Row>
          <Col xs={{ size: 7, offset: 3 }} className='text-center'>
            <h5>Social</h5>
            <a
                className='btn btn-social-icon btn-instagram'
                href='http://instagram.com/'
            >
                <i className='fa fa-instagram' />
            </a>{' '}
            <a
                className='btn btn-social-icon btn-facebook'
                href='http://www.facebook.com/'
            >
                <i className='fa fa-facebook' />
            </a>{' '}
            <a
                className='btn btn-social-icon btn-twitter'
                href='http://twitter.com/'
            >
                <i className='fa fa-twitter' />
            </a>{' '}
            <a
                className='btn btn-social-icon btn-google'
                href='http://youtube.com/'
            >
                <i className='fa fa-youtube' />
            </a>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
