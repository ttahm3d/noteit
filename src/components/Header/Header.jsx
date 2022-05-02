import styled from "styled-components";
import { FiSun } from "react-icons/fi";
import { IoMdMoon } from "react-icons/io";
import NoteIt from "../../assets/NoteIt.svg";
import { AiOutlineMenu } from "react-icons/ai";
import { MdOutlineLogout } from "react-icons/md";
import { Button, IconButton } from "../Button/Button";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { Container } from "../../styles/globals";

export default function Header({
  theme,
  toggleTheme,
  toggleSidebar,
  closeSidebar,
}) {
  const navigate = useNavigate();

  const { user, signOut } = useAuth();

  const userId = user?.id;
  const firstName = user?.user_metadata?.firstName;

  return (
    <HeaderComponent>
      <Container>
        <Navbar>
          <MenuButton icon={<AiOutlineMenu />} onClick={toggleSidebar} />
          <Link to="/">
            <Logo onClick={closeSidebar}>
              <img src={NoteIt} alt="NoteIt Logo" />
            </Logo>
          </Link>
          <NavItems>
            {userId ? (
              <>
                <UserInfo>
                  <div>Hi</div>
                  <div>{firstName}</div>
                </UserInfo>
                <IconButton
                  style={{ padding: "0.25rem" }}
                  variant="secondary__cta"
                  rounded="0.25"
                  onClick={signOut}
                  icon={<MdOutlineLogout />}
                />
              </>
            ) : (
              <Button
                variant="secondary__cta"
                rounded="0.25"
                onClick={() => navigate("/auth/login")}>
                Login
              </Button>
            )}

            <IconButton
              icon={theme === "light" ? <IoMdMoon /> : <FiSun />}
              onClick={toggleTheme}
              title="Change theme"
            />
          </NavItems>
        </Navbar>
      </Container>
    </HeaderComponent>
  );
}

const HeaderComponent = styled.header`
  padding: 0.75rem 0;
  border-bottom: 1px solid ${(props) => props.theme.colors.blue6};
  background-color: ${(props) => props.theme.colors.blue1};
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
  display: flex;
  gap: 1rem;
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

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;
