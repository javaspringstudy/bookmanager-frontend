import { lazy } from 'react'
import styled from 'styled-components'
import { Outlet, useParams, useSearchParams } from 'react-router-dom'
import LatestBooks from '../../components/books/LatestBooks'

const SearchForm = lazy(() => import('./../../components/books/SearchForm'))

const SearchContainer = styled.section`
  > h2 {
    margin-bottom: 20px;
    font-size: 20px;

    > span {
      color: #3f82ff;
    }
  }
`

const SearchBook = () => {
  const { bookId } = useParams()
  const [searchParams] = useSearchParams()
  const keyword = searchParams.get('keyword')

  let title = ''
  if (keyword) {
    title = `검색키워드:`
  } else {
    title = '도서 검색'
  }

  return (
    <SearchContainer>
      {bookId ? (
        <></>
      ) : (
        <h2>
          🔍 {title} {keyword && <span>{keyword}</span>}
        </h2>
      )}

      {bookId ? <></> : <SearchForm />}

      <Outlet />
      {bookId ? <></> : <LatestBooks />}
    </SearchContainer>
  )
}

export default SearchBook
