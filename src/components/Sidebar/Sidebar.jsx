import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { MdOutlineArchive } from "react-icons/md";

export default function () {
  const sidebarItems = [
    {
      id: 1,
      text: "Home",
      path: "/",
      icon: <MdOutlineArchive />,
    },
    {
      id: 2,
      text: "Archive",
      path: "/archive",
      icon: <MdOutlineArchive />,
    },
  ];

  const activeStyle = {
    backgroundColor: "var(--gray5)",
    color: "var(--gray12)",
    fontWeight: "500",
  };

  return (
    <StyledSidebar>
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

const StyledSidebar = styled.aside``;

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
  /* text-decoration: ${(props) => {
    console.log(props);
    return props.style
      ? (isActive) => (isActive ? "underline" : "none")
      : "none";
  }}; */

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
