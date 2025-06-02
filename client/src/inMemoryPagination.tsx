import { Pagination, PaginationItem, PaginationLink } from 'reactstrap'

type InMemoryPaginationInput = {
  onFirstPageClick: () => void,
  onPreviousPageClick: () => void,
  OnNextPageClick: () => void,
  OnLastPageClick: () => void
}

function InMemoryPagination({
  onFirstPageClick,
  onPreviousPageClick,
  OnNextPageClick,
  OnLastPageClick
}: InMemoryPaginationInput) {
  return (
    <Pagination size="lg">
      <PaginationItem>
        <PaginationLink
          first
          onClick={onFirstPageClick}
        />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink
          previous
          onClick={onPreviousPageClick}
        />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink
          next
          onClick={OnNextPageClick}
        />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink
          last
          onClick={OnLastPageClick}
        />
      </PaginationItem>
    </Pagination>
  )
}

export default InMemoryPagination