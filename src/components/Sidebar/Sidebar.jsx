import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { MdOutlineArchive, MdOutlineEditNote } from "react-icons/md";

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
];

export default function ({ showSidebar, toggleSidebar }) {
  return (
    <StyledSidebar showSidebar={showSidebar}>
      <SidebarItemsContainer>
        {sidebarItems.map((sidebarItem) => (
          <li key={sidebarItem.id}>
            <SidebarItem
              to={sidebarItem.path}
              style={({ isActive }) => console.log(isActive)}>
              <div className="icon">{sidebarItem.icon}</div>
              <div>{sidebarItem.text}</div>
            </SidebarItem>
          </li>
        ))}
      </SidebarItemsContainer>
    </StyledSidebar>
  );
}

const StyledSidebar = styled.aside`
  border-right: 1px solid ${(props) => props.theme.colors.gray4};
  background-color: ${(props) => props.theme.colors.gray2};

  @media screen and (max-width: 64em) {
    position: fixed;
    z-index: 7;
    height: 100%;
    top: 69.6px;
    width: 10rem;
    left: ${({ showSidebar }) => (showSidebar ? "0" : "-100%")};
    transition: 0.3s all linear;
  }
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
  padding: 1rem;
  cursor: pointer;
  transition: 0.3s linear background;

  &[aria-current] {
    background-color: ${(props) => props.theme.colors.gray5};
    color: ${(props) => props.theme.colors.gray12};
    font-weight: 500;
  }

  .icon {
    display: flex;
    align-content: center;
    justify-content: center;
    font-size: 1.5rem;
  }
`;
