import styled from "styled-components";

const MainContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  min-height: 100vh;
  @media screen and (min-width: 64em) {
    grid-template-columns: ${({ pathname }) =>
      pathname !== "/" ? "1fr 5fr" : "1fr"};
  }
`;

const Container = styled.section`
  width: min(100% - 2rem, 90em);
  margin: 0 auto;
`;

const Content = styled.div`
  padding: 1rem 0 2rem;
`;

const Page = styled.main`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export { Page, Container, MainContainer, Content };
