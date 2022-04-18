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
} from "@radix-ui/colors";

const lightTheme = {
  colors: {
    ...gray,
    ...red,
    ...green,
    ...orange,
    ...blue,
  },
};

const darkTheme = {
  colors: {
    ...grayDark,
    ...redDark,
    ...greenDark,
    ...orangeDark,
    ...blueDark,
  },
};

const light = {
  colors: {
    bg: "#fbfbfb",
    fg: "#1890ff",
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
    background-color: ${(props) => props.theme.colors.gray2};
    font-family: "IBM Plex Sans Arabic", sans-serif;
    color:  ${(props) => props.theme.colors.gray12};
  }
`;

export { GlobalStyle, lightTheme, darkTheme, light };
