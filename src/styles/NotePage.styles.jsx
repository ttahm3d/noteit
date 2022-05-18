import styled from "styled-components";

const NotesContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
  gap: 1rem;
`;

const AddNoteContainer = styled.div`
  background-color: ${(props) => props.theme.colors.blue1};
  position: sticky;
  z-index: 2;
  top: 65px;
  padding: 1rem 0;
`;

export { NotesContainer, AddNoteContainer };
