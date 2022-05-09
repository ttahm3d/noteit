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
  slate,
  slateDark,
  mauve,
  mauveDark,
  lime,
  limeDark,
  crimson,
  crimsonDark,
  teal,
  tealDark,
  plum,
  plumDark,
} from "@radix-ui/colors";

const lightTheme = {
  colors: {
    ...gray,
    ...red,
    ...green,
    ...orange,
    ...blue,
    ...violet,
    ...slate,
    ...mauve,
    ...lime,
    ...crimson,
    ...teal,
    ...plum,
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
    ...slateDark,
    ...mauveDark,
    ...limeDark,
    ...crimsonDark,
    ...tealDark,
    ...plumDark,
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
    background-color: ${(props) => props.theme.colors.blue1};
    font-family: "IBM Plex Sans Arabic", sans-serif;
    color:  ${(props) => props.theme.colors.slate12};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

export { GlobalStyle, lightTheme, darkTheme };
