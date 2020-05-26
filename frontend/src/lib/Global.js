import { createGlobalStyle } from "styled-components"

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Roboto', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-repeat: no-repeat;
    background-size: cover;
    background-color: #ba913a;
    background-image: linear-gradient(0deg, #ba913a 0%, #f4b5ff 100%);


    @media (max-width: 400px) {
    background-color: #c5f759;
    background-image: none;
  }
    
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
      monospace;
}
`