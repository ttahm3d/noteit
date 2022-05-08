import DOMPurify from "dompurify";
import { IconButton } from "../Button/Button";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import styled from "styled-components";
import { useNotes } from "../../context/notes";

export default function NoteCard({ note }) {
  const { id, title, body, color } = note;

  const { deleteNote } = useNotes();

  const actions = [
    {
      id: "edit",
      icon: <AiOutlineEdit />,
      clickHandler: () => console.log("edit this"),
    },
    {
      id: "delete",
      icon: <AiOutlineDelete />,
      clickHandler: () => deleteNote(id),
    },
  ];

  return (
    <Card color={color}>
      <Title color={color} title={title}>
        {title}
      </Title>
      <Body
        color={color}
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(body),
        }}></Body>
      <ActionContainer>
        {actions.map((action) => (
          <ActionButton
            icon={action.icon}
            onClick={action.clickHandler}
            key={action.id}
            color={color}
          />
        ))}
      </ActionContainer>
    </Card>
  );
}

const Card = styled.div`
  position: relative;
  background-color: ${({ theme, color }) => `${theme.colors[color + "3"]}`};
  height: 18rem;
  overflow-y: auto;

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

const Title = styled.div`
  color: ${({ theme, color }) => `${theme.colors[color + "9"]}`};
  text-overflow: ${({ title }) => (title.length > 20 ? "elipses" : "none")};
  font-size: 1.5rem;
  padding: 1rem 1rem 0;
  font-weight: 700;
  width: 80%;
`;

const Body = styled.div`
  padding: 0.5rem 1rem 1rem;
  font-size: 0.85rem;
  text-overflow: ellipsis;
  color: ${({ theme, color }) => `${theme.colors[color + "11"]}`};
`;

const ActionContainer = styled.div`
  padding: 1rem;
  position: absolute;
  top: 0rem;
  right: 0rem;
  display: flex;
  gap: 0.5rem;
`;

const ActionButton = styled(IconButton)`
  padding: 0.55rem 0.35rem;
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
