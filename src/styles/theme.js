import { createGlobalStyle } from "styled-components";
import {
  blue,
  blueDark,
  orange,
  orangeDark,
  red,
  redDark,
  green,
  greenDark,
  gray,
  grayDark,
  violet,
  violetDark,
} from "@radix-ui/colors";

const lightTheme = {
  colors: {
    ...gray,
    ...red,
    ...green,
    ...orange,
    ...blue,
    ...violet,
    white: "#fff",
    black: "#111",
  },
};

const darkTheme = {
  colors: {
    ...grayDark,
    ...redDark,
    ...greenDark,
    ...orangeDark,
    ...blueDark,
    ...violetDark,
    white: "#fff",
    black: "#111",
  },
};

const GlobalStyle = createGlobalStyle`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  img,
  iframe,
  video {
    max-width: 100%;
  }

  input,
  button {
    font-family: inherit;
  }

  button {
    cursor: pointer;
    font-size: 1rem;
  }

  body {
    margin: 0;
    background-color: ${(props) => props.theme.colors.blue2};
    font-family: "IBM Plex Sans Arabic", sans-serif;
    color:  ${(props) => props.theme.colors.gray12};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

export { GlobalStyle, lightTheme, darkTheme };
