import React from 'react'
import { Link } from 'react-router-dom'

import { MainContainer, SubContainer, ButtonContainer, Button, Header, Text } from './styled-components/homepage-style'

const HomePage = () => {
  return (
    <MainContainer>
      <SubContainer>
        <Header>
          Welcome
        </Header>
        <Text>
          Would you like to know our super secret?
        </Text>
        <ButtonContainer>
          <Link to="/login">
            <Button>
              Yes!
            </Button>
          </Link>
        </ButtonContainer>
      </SubContainer>
    </MainContainer>
    )
}

export default HomePage