import { useState, useEffect } from 'react'
import { useQuery } from 'react-query'
import { 
  Card, 
  CardBody, 
  CardTitle, 
  Container, 
  Row, 
  Col, 
  CardSubtitle
} from 'reactstrap'

import { httpGet } from './utils/axiosUtils'
import InMemoryPagination from './inMemoryPagination'
import ProfileCard from './profileCard'

function MyFeed() {
  const pageSize = 9
  const [currentPage, setCurrentPage] = useState(1)
  const [maxPages, setMaxPages] = useState(1)
  const [cards, setCards] = useState<any[]>([])
  const { isLoading, error, data } = useQuery({
    queryKey: [`myFeed`],
    queryFn: async () => await httpGet('/userProfiles'),
  })

  useEffect(() => {
    if (!isLoading) {
      setCards(createCards())
    }
  }, [data, currentPage])

  const createCards = () => {
    const startIndex = (currentPage - 1) * pageSize
    const endIndex = startIndex + pageSize

    setMaxPages(!data.length ? 1 : Math.ceil(data.length / pageSize))
    return (
      data.slice(startIndex, endIndex).map((profile: any) => {
        return (
          <Row className="mb-3" key={profile.userId}>
            <Card key={profile.userId}>
              <div className="card-body">
                <ProfileCard data={profile} key={profile.userId} />
              </div>
            </Card>
          </Row>
        )
      })
    )
  }

  if (isLoading) return (<>{'Loading...'}</>)
  if (error) return (<>{'An error has occurred: ' + error}</>)

  const onFirstPageClick = () => {
    setCurrentPage(1)
  }

  const onPreviousPageClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const OnNextPageClick = () => {
    if (currentPage < maxPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const OnLastPageClick = () => {
    setCurrentPage(maxPages)
  }

  return (
    <Container>
      <Row>
        <h2>
          My Feed
        </h2>
      </Row>
      <Row>
        <Container>
          {cards && cards.length > 0 ? (
            cards
          ) : (
            <Row>
              <Col xs="12">
                <Card className="text-center">
                  <CardBody>
                    <CardTitle>No profiles found</CardTitle>
                    <CardSubtitle>Try to check back later.</CardSubtitle>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          )}  
        </Container>
      </Row>
      <Row>
        <Col>
          <InMemoryPagination 
            onFirstPageClick={onFirstPageClick}
            onPreviousPageClick={onPreviousPageClick}
            OnNextPageClick={OnNextPageClick}
            OnLastPageClick={OnLastPageClick}
          />
        </Col>
      </Row>
    </Container>
  )
}

export default MyFeed
