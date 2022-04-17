import { Sidebar } from "../../components";
import { Container, MainContainer } from "../../styles/globals";

export default function () {
  return (
    <MainContainer>
      <Sidebar />
      <Container>
        <h3>Archive page</h3>
      </Container>
    </MainContainer>
  );
}
