import styled from "styled-components";
import NoteIt from "../../assets/NoteIt.svg";

export default function Footer() {
  return (
    <FooterContainer>
      <Logo>
        <img src={NoteIt} alt="NoteIt Logo" />
      </Logo>
    </FooterContainer>
  );
}

const FooterContainer = styled.footer`
  padding: 2rem 1rem;
  margin-top: auto;
  border-top: 1px solid ${(props) => props.theme.colors.blue6};
`;

const Logo = styled.div``;
