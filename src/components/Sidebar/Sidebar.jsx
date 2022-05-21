import styled from "styled-components";
import { NavLink } from "react-router-dom";
import {
  MdOutlineArchive,
  MdOutlineEditNote,
  MdDeleteOutline,
  MdBarChart,
} from "react-icons/md";
import { Button } from "../Button/Button";
import { useAuth } from "../../context/auth";
import Modal from "../Modal/Modal";
import { useState } from "react";
import { useNotes } from "../../context/notes";
import NoteForm from "../NoteForm/NoteForm";

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
  const [showModal, setShowModal] = useState(false);
  const { addNote } = useNotes();
  const [note, setNote] = useState({
    title: "",
    color: "blue",
    body: "",
    tag: "Personal",
  });

  const toggleModal = () => setShowModal((s) => !s);
  const closeModal = () => setShowModal(false);

  const closeAndClearForm = () => {
    setNote({
      title: "",
      color: "blue",
      body: "",
      tag: "Personal",
    });
    closeModal();
  };

  const saveNote = () => {
    addNote(note);
    closeAndClearForm();
  };

  const addNoteActions = [
    {
      id: "cancel",
      text: "Cancel",
      action: () => closeAndClearForm(),
      variant: "primary__outline",
    },
    {
      id: "add",
      text: "Save Note",
      action: () => saveNote(),
      variant: "primary__block",
    },
  ];

  return (
    <StyledSidebar showSidebar={showSidebar}>
      <SidebarWrapper>
        {user?.id && (
          <SidebarSection>
            <Button variant="primary__block" fullwidth onClick={toggleModal}>
              Add Note
            </Button>
          </SidebarSection>
        )}

        <SidebarSection onClick={toggleSidebar}>
          <SidebarItem to="/dashboard">
            <div className="icon">
              <MdBarChart />
            </div>
            <div>Dashboard</div>
          </SidebarItem>
        </SidebarSection>

        <SidebarSection>
          <SidebarItemsContainer>
            {sidebarItems.map((sidebarItem) => (
              <li key={sidebarItem.id} onClick={toggleSidebar}>
                <SidebarItem to={sidebarItem.path}>
                  <div className="icon">{sidebarItem.icon}</div>
                  <div>{sidebarItem.text}</div>
                </SidebarItem>
              </li>
            ))}
          </SidebarItemsContainer>
        </SidebarSection>
      </SidebarWrapper>
      <Modal showModal={showModal} closeModal={closeModal} header="Add Note">
        <NoteForm note={note} setNote={setNote} actions={addNoteActions} />
      </Modal>
    </StyledSidebar>
  );
}

const StyledSidebar = styled.aside`
  border-right: 1px solid ${(props) => props.theme.colors.blue6};
  background-color: ${(props) => props.theme.colors.blue1};
  position: sticky;
  top: 65px;
  bottom: 111.4px;
  height: calc(100vh - 179px);
  min-height: calc(100vh - 0px);
  z-index: 7;

  @media screen and (max-width: 64em) {
    position: fixed;
    height: 100%;
    top: 65px;
    width: 15rem;
    left: ${({ showSidebar }) => (showSidebar ? "0" : "-100%")};
    transition: ${({ showSidebar }) =>
      showSidebar ? "0.5s left linear" : "0.5s left linear"};
  }
`;

const SidebarSection = styled.div`
  padding: 1rem;
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

const SidebarWrapper = styled.div`
  position: sticky;
  top: 65px;
`;
