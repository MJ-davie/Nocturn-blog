import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

    :root {
      --primary-color: #0059A1;
      --secondary-color: #EBE7D9;
      
      --font-family: 'Noto Sans KR', sans-serif;
      --font-size: 16px;
  }

  body {
    margin: 0 30px 0px 30px;
    padding: 0;
    font-family: var(--font-family);
    font-size: var(--font-size);
    background-color: black;
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
    padding: 0;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;

export default GlobalStyle;
