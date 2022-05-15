import DOMPurify from "dompurify";
import { IconButton } from "../Button/Button";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { IoTrashBinOutline } from "react-icons/io5";
import { BiDotsVerticalRounded } from "react-icons/bi";
import styled from "styled-components";
import { useNotes } from "../../context/notes";
import { formatDate } from "../../common/utils";
import { useState } from "react";

export default function NoteCard({
  note,
  toggleModal,
  setNote,
  setIsEdit,
  noteActions,
}) {
  const [showMenu, setShowMenu] = useState(false);
  const { id, created_at, title, body, color } = note;
  const date = new Date(created_at.slice(0));
  const { deleteNote } = useNotes();

  const editHandler = () => {
    setNote(note);
    setIsEdit(true);
    toggleModal();
  };

  const toggleMenu = () => setShowMenu((s) => !s);
  const closeMenu = () => setShowMenu(false);

  const actions = [
    {
      id: "edit",
      icon: <AiOutlineEdit />,
      clickHandler: () => editHandler(),
    },
    {
      id: "delete",
      icon: <AiOutlineDelete />,
      clickHandler: () => deleteNote(id),
    },
  ];

  return (
    <Card color={color}>
      <CardHeader>
        <Title color={color} title={title}>
          {title}
        </Title>
        <ActionContainer>
          <ActionButton
            onClick={toggleMenu}
            icon={<BiDotsVerticalRounded />}
            color={color}
          />
          {/* {showMenu && ( */}
          <Dropdown color={color} showMenu={showMenu}>
            <DropdownItem
              color={color}
              title="Edit"
              onClick={() => editHandler()}>
              <AiOutlineEdit />
            </DropdownItem>
            {noteActions.map((action) => (
              <DropdownItem color={color} title={action.title} key={action.id}>
                {action.icon}
              </DropdownItem>
            ))}
            <DropdownItem
              color={color}
              title="Delete"
              onClick={() => deleteNote(id)}>
              <IoTrashBinOutline />
            </DropdownItem>
          </Dropdown>
          {/* )} */}
        </ActionContainer>
      </CardHeader>
      <Body
        color={color}
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(body),
        }}></Body>
      <DateDiv color={color}>
        <span>Last updated on:</span> {formatDate(date)}
      </DateDiv>
    </Card>
  );
}

const Card = styled.div`
  position: relative;
  background-color: ${({ theme, color }) => `${theme.colors[color + "3"]}`};
  height: 20rem;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  border-radius: 0.25rem;
`;

const CardHeader = styled.div`
  display: flex;
  align-items: flex-start;
`;

const Title = styled.div`
  color: ${({ theme, color }) => `${theme.colors[color + "9"]}`};
  text-overflow: ${({ title }) => (title.length > 20 ? "elipses" : "none")};
  font-size: 1.5rem;
  padding-bottom: 1rem;
  font-weight: 700;
  width: 75%;
`;

const Body = styled.div`
  font-size: 0.9rem;
  color: ${({ theme, color }) => `${theme.colors[color + "11"]}`};
  overflow-y: auto;
  text-align: justify;
  padding-right: 1rem;

  p {
    margin: 0;
  }

  ::-webkit-scrollbar {
    width: 0.25rem;
  }

  ::-webkit-scrollbar-track {
    background-color: ${({ theme, color }) => `${theme.colors[color + "5"]}`};
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${({ theme, color }) => `${theme.colors[color + "7"]}`};
  }
`;

const DateDiv = styled.div`
  padding-top: 1rem;
  margin-top: auto;
  color: ${({ theme, color }) => `${theme.colors[color + "10"]}`};
  font-weight: 500;
  font-size: 0.9rem;

  span {
    font-weight: 300;
  }
`;

const ActionContainer = styled.div`
  margin-left: auto;
  position: relative;
  top: 0rem;
  right: 0rem;
  display: flex;
  gap: 0.5rem;
`;

const ActionButton = styled(IconButton)`
  padding: 0.55rem;
  border-radius: 50%;
  background-color: ${({ theme, color }) => `${theme.colors[color + "4"]}`};
  color: ${({ theme, color }) => `${theme.colors[color + "9"]}`};
  border: 1px solid ${({ theme, color }) => `${theme.colors[color + "7"]}`};

  :hover {
    background-color: ${({ theme, color }) => `${theme.colors[color + "5"]}`};
  }

  :active {
    background-color: ${({ theme, color }) => `${theme.colors[color + "6"]}`};
  }
`;

const Dropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 0.1rem;
  color: ${({ theme, color }) => `${theme.colors[color + "9"]}`};
  background-color: ${({ theme, color }) => `${theme.colors[color + "4"]}`};
  border: 1px solid ${({ theme, color }) => `${theme.colors[color + "7"]}`};
  border-radius: 5rem;
  transition: 0.2s all linear;
  display: ${({ showMenu }) => (showMenu ? "block" : "none")};
`;

const DropdownItem = styled.div`
  padding: 0.45rem;
  border-radius: 50px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;

  :hover {
    background-color: ${({ theme, color }) => `${theme.colors[color + "6"]}`};
  }
`;
