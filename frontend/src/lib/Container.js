import styled from 'styled-components/macro'

export const Container = styled.div`
  width: 290px;
  min-height: 531px;
  margin: 16px;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rosybrown;
  ${'' /* background: snow; */}
  border-radius: 3px;
  
  @media (min-width: 500px) {
    width: 480px;
    padding: 0 16px;
  }
`

export const ScreenContainer = styled(Container)`
  margin-top: 48%;
  min-height: 300px;
`