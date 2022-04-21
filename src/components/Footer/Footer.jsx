import styled from "styled-components";
import NoteIt from "../../assets/NoteIt.svg";

export default function () {
  return (
    <FooterContainer>
      <Logo>
        <img src={NoteIt} alt="NoteIt Logo" />
      </Logo>
    </FooterContainer>
  );
}

const FooterContainer = styled.footer`
  position: sticky;
  bottom: 0;
  padding: 2rem 1rem;
  margin-top: auto;
  box-shadow: 0 0 4px ${(props) => props.theme.colors.gray6};
`;

const Logo = styled.div``;
