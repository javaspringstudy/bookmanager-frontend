import styled from 'styled-components'
import WishList from './WishList'

const WishContainer = styled.section`
  > h2 {
    margin-bottom: 20px;
    font-size: 20px;

    > span {
      color: #3f82ff;
    }
  }
`
const WishBook = () => {
  return (
    <WishContainer>
      <WishList />
    </WishContainer>
  )
}

export default WishBook
