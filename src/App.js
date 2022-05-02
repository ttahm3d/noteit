import { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { Footer, Header, ScrollToTop, Sidebar } from "./components";
import { useLocalStorage } from "./hooks";
import Router from "./router/Router";
import { MainContainer, Page } from "./styles/globals";
import { GlobalStyle, lightTheme, darkTheme } from "./styles/theme";

function App() {
  const [theme, setTheme] = useLocalStorage("noteit-theme");
  const [showSidebar, setShowSidebar] = useState(false);
  const toggleSidebar = () => setShowSidebar((s) => !s);

  useEffect(() => {
    if (theme) setTheme(theme);
    else setTheme("light");
  }, []);

  const toggleTheme = () =>
    theme === "light" ? setTheme("dark") : setTheme("light");

  const closeSidebar = () => setShowSidebar(false);

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyle />
      <ScrollToTop />
      <Page>
        <Header
          theme={theme}
          toggleTheme={toggleTheme}
          toggleSidebar={toggleSidebar}
          closeSidebar={closeSidebar}
        />
        <MainContainer>
          <Sidebar
            showSidebar={showSidebar}
            toggleSidebar={toggleSidebar}
            closeSidebar={closeSidebar}
          />
          <Router />
        </MainContainer>
        <Footer />
      </Page>
    </ThemeProvider>
  );
}

export default App;
