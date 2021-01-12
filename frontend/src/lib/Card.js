import styled from "styled-components/macro"

export const Container = styled.main`
  background: #fff;
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const Wrapper = styled.section`
  box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14),
    0 1px 3px 0 rgba(0, 0, 0.12);
  border-radius: 3px;
  margin-bottom: 20px;
  width: 80%;
  padding: 20px;
  background: #000;
`

export const Form = styled.form`
  display: grid;
  grid-row-gap: 20px;
`

export const Label = styled.label`
  width: 80%;
  font-size: 20px;
`

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export const Input = styled.input`
  background: transparent; 
  border: none; 
  border-bottom: 2px solid #fff;
  color: #fff;
  padding: 10px 0;
  font-size: 16px;
`

export const ButtonWrapper = styled(InputWrapper)`
  flex-direction: row; 
  justify-content: space-between;
`

export const Title = styled.h1`
  font-size: 28px;
  text-align: center;
`

// export const CustomButton = styled.button`
//   width: 300px;
//   border-radius: 3px;
//   background: transparent; 
//   border: 2px solid green;
  
//   ${({ startBtn }) => startBtn && `
//     width: 10em;
//     padding: 0.2em;
//     &:hover {
//       animation: grow 2s ease-in-out;
//       color: #fff;
  
//       @keyframes grow {
//         50% {
//           transform: scale(1.1);
//         }
//       }
//     }
//     `}
// `

// const Heading = styled.h1`
//   margin: 0;
//   font-size: 24px;
// `

// const TitleWrapper = styled.div`
//   display: flex;
//   align-items: center;
// `

// export const Card = ({ heading, className }) => {
//   return (
//     <Container className={className}>
//         <TitleWrapper>
//           <Heading>{heading}</Heading>
//         </TitleWrapper>
//     </Container>
//   )
// }
