import styled from "styled-components";
import { NavLink } from "react-router-dom";
import {
  MdOutlineArchive,
  MdOutlineEditNote,
  MdDeleteOutline,
} from "react-icons/md";
import { Button } from "../Button/Button";
import { useAuth } from "../../context/auth";

const sidebarItems = [
  {
    id: 1,
    text: "Notes",
    path: "/notes",
    icon: <MdOutlineEditNote />,
  },
  {
    id: 2,
    text: "Archive",
    path: "/archive",
    icon: <MdOutlineArchive />,
  },
  {
    id: 3,
    text: "Trash",
    path: "/trash",
    icon: <MdDeleteOutline />,
  },
];

export default function Sidebar({ showSidebar, toggleSidebar }) {
  const { user } = useAuth();

  return (
    <StyledSidebar showSidebar={showSidebar}>
      {user?.id && (
        <SidebarSection>
          <Button variant="primary__block" fullwidth>
            Add Note
          </Button>
        </SidebarSection>
      )}

      <SidebarSection>
        <SidebarItemsContainer>
          {sidebarItems.map((sidebarItem) => (
            <li key={sidebarItem.id} onClick={toggleSidebar}>
              <SidebarItem
                to={sidebarItem.path}
                style={({ isActive }) => console.log(isActive)}>
                <div className="icon">{sidebarItem.icon}</div>
                <div>{sidebarItem.text}</div>
              </SidebarItem>
            </li>
          ))}
        </SidebarItemsContainer>
      </SidebarSection>
    </StyledSidebar>
  );
}

const StyledSidebar = styled.aside`
  border-right: 1px solid ${(props) => props.theme.colors.blue6};
  background-color: ${(props) => props.theme.colors.blue1};
  position: fixed;
  z-index: 7;
  height: 100%;
  top: 65px;
  width: 15rem;
  left: ${({ showSidebar }) => (showSidebar ? "0" : "-100%")};
  transition: ${({ showSidebar }) =>
    showSidebar ? "0.5s left linear" : "0.5s left linear"};

  @media screen and (max-width: 64em) {
    top: 59px;
  }
`;

const SidebarSection = styled.div`
  padding: 1rem 0.25rem;
`;

const SidebarItemsContainer = styled.ul`
  display: flex;
  margin: 0;
  padding: 0;
  flex-direction: column;
  list-style: none;
`;

const SidebarItem = styled(NavLink)`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  color: ${(props) => props.theme.colors.gray11};
  padding: 0.5rem;
  transition: 0.3s linear background;
  border-radius: 0.25rem;
  font-weight: 500;
  cursor: pointer;

  &[aria-current] {
    background-color: ${(props) => props.theme.colors.violet5};
    color: ${(props) => props.theme.colors.gray12};
  }

  :hover {
    background-color: ${(props) => props.theme.colors.violet4};
  }

  .icon {
    display: flex;
    align-content: center;
    justify-content: center;
    font-size: 1.25rem;
  }
`;
