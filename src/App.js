import { useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { Footer, Header, ScrollToTop } from "./components";
import { useLocalStorage } from "./hooks";
import Router from "./router/Router";
import { Page } from "./styles/globals";
import { GlobalStyle, lightTheme, darkTheme, light } from "./styles/theme";

function App() {
  const [theme, setTheme] = useLocalStorage("noteit-theme");

  useEffect(() => {
    if (theme) setTheme(theme);
    else setTheme("light");
  }, []);

  const toggleTheme = () =>
    theme === "light" ? setTheme("dark") : setTheme("light");

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyle />
      <ScrollToTop />
      <Page>
        <Header theme={theme} toggleTheme={toggleTheme} />
        <Router />
        <Footer />
      </Page>
    </ThemeProvider>
  );
}

export default App;
