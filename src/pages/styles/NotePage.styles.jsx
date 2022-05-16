import styled from "styled-components";

const NotesContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
  gap: 1rem;
`;

const Content = styled.div`
  padding: 2rem 0;
`;

export { NotesContainer, Content };
