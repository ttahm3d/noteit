import styled from "styled-components";
import NoteIt from "../../assets/NoteIt.svg";

export default function Footer() {
  return (
    <FooterContainer>
      <Logo>
        <img src={NoteIt} alt="NoteIt Logo" />
      </Logo>
      <FooterLinksWrapper>First</FooterLinksWrapper>
      <FooterLinksWrapper>Second</FooterLinksWrapper>
    </FooterContainer>
  );
}

const FooterContainer = styled.footer`
  padding: 2rem 1rem;
  margin-top: auto;
  border-top: 1px solid ${(props) => props.theme.colors.blue6};
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4rem;
`;

const FooterLinksWrapper = styled.footer``;

const Logo = styled.div``;
