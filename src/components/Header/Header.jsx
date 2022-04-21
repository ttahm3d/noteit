import styled from "styled-components";
import { FiSun } from "react-icons/fi";
import { IoMdMoon } from "react-icons/io";
import NoteIt from "../../assets/NoteIt.svg";
import { AiOutlineMenu } from "react-icons/ai";
import { IconButton } from "../Button/Button";
import { Link } from "react-router-dom";

export default function ({ theme, toggleTheme, toggleSidebar }) {
  return (
    <HeaderComponent>
      <Navbar>
        <MenuButton icon={<AiOutlineMenu />} onClick={toggleSidebar} />
        <Link to="/">
          <Logo>
            <img src={NoteIt} alt="NoteIt Logo" />
          </Logo>
        </Link>
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
  border-bottom: 1px solid ${(props) => props.theme.colors.gray6};
  background-color: ${(props) => props.theme.colors.gray2};
  z-index: 9;
  position: sticky;
  top: 0;
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

const MenuButton = styled(IconButton)`
  font-size: 1.25rem;
  margin-right: 1rem;
`;
