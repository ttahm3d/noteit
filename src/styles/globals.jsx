import styled from "styled-components";

const MainContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
`;

const Container = styled.section`
  width: min(100% - 2rem, 90em);
  margin: 0 auto;
`;

const Page = styled.main`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export { Page, Container, MainContainer };
