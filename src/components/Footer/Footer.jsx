import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  AiOutlineLinkedin,
  AiOutlineGithub,
  AiOutlineTwitter,
} from "react-icons/ai";
import NoteIt from "../../assets/NoteIt.svg";

export default function Footer() {
  const internalLinks = [
    {
      id: 1,
      name: "Dashboard",
      path: "/dashboard",
    },
    {
      id: 2,
      name: "Notes",
      path: "/notes",
    },
    {
      id: 3,
      name: "Archive",
      path: "/archive",
    },
    {
      id: 4,
      name: "Trash",
      path: "/trash",
    },
  ];

  const externalLinks = [
    {
      id: 1,
      name: "Github",
      icon: <AiOutlineGithub />,
      path: "https://github.com/ttahm3d",
    },
    {
      id: 2,
      name: "Linked In",
      icon: <AiOutlineLinkedin />,
      path: "https://www.linkedin.com/in/tahirahmedt/",
    },
    {
      id: 3,
      name: "Twitter",
      icon: <AiOutlineTwitter />,
      path: "https://twitter.com/ttahm3d",
    },
  ];

  return (
    <FooterContainer>
      <Logo>
        <img src={NoteIt} alt="NoteIt Logo" />
      </Logo>
      <FooterLinksWrapper>
        <FooterHeader>Quick Links</FooterHeader>
        <LinksContainer>
          {internalLinks.map(({ id, name, path }) => (
            <FooterLink to={path} key={id}>
              {name}
            </FooterLink>
          ))}
        </LinksContainer>
      </FooterLinksWrapper>
      <FooterLinksWrapper>
        <FooterHeader>Other Links</FooterHeader>
        <LinksContainer>
          {externalLinks.map(({ id, name, icon, path }) => (
            <ExtLink href={path} key={id}>
              <div className="icon">{icon}</div>
              <>{name}</>
            </ExtLink>
          ))}
        </LinksContainer>
      </FooterLinksWrapper>
    </FooterContainer>
  );
}

const FooterContainer = styled.footer`
  padding: 2rem 1rem;
  margin-top: auto;
  border-top: 1px solid ${(props) => props.theme.colors.blue6};
  display: grid;
  gap: 4rem;
  grid-template-columns: 1fr;

  @media screen and (min-width: 64em) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const FooterLinksWrapper = styled.footer``;

const FooterHeader = styled.div`
  font-weight: 500;
  margin-bottom: 1rem;
`;

const LinksContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-direction: column;
`;

const FooterLink = styled(Link)`
  color: ${(props) => props.theme.colors.slate11};

  :hover {
    color: ${(props) => props.theme.colors.slate12};
  }
`;

const ExtLink = styled.a`
  display: flex;
  gap: 1rem;
  color: ${(props) => props.theme.colors.slate11};

  :hover {
    color: ${(props) => props.theme.colors.slate12};
  }

  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
  }
`;

const Logo = styled.div``;
