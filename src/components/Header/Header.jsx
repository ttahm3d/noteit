import styled from "styled-components";
import { FiSun } from "react-icons/fi";
import { IoMdMoon } from "react-icons/io";
import NoteIt from "../../assets/NoteIt.svg";
import { IconButton } from "../Button/Button";

export default function ({ theme, toggleTheme }) {
  return (
    <HeaderComponent>
      <Navbar>
        <Logo>
          <img src={NoteIt} alt="NoteIt Logo" />
        </Logo>
        <NavItems>
          <IconButton
            icon={theme === "light" ? <IoMdMoon /> : <FiSun />}
            onClick={toggleTheme}
            title="Change theme"
          />
        </NavItems>
      </Navbar>
    </HeaderComponent>
  );
}

const HeaderComponent = styled.header`
  padding: 0.75rem 1rem;
  box-shadow: 0 0 4px ${(props) => props.theme.colors.gray6};
  z-index: 9;
`;

const Navbar = styled.nav`
  display: flex;
  align-items: center;
`;

const NavItems = styled.div`
  margin-left: auto;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
