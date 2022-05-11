import DOMPurify from "dompurify";
import { IconButton } from "../Button/Button";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import styled from "styled-components";
import { useNotes } from "../../context/notes";
import { formatDate } from "../../common/utils";

export default function NoteCard({ note, toggleModal, setNote, setIsEdit }) {
  const { id, created_at, title, body, color } = note;
  const date = new Date(created_at.slice(0));
  const { deleteNote } = useNotes();

  const editHandler = () => {
    setNote(note);
    setIsEdit(true);
    toggleModal();
  };

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
      <Title color={color} title={title}>
        {title}
      </Title>
      <Body
        color={color}
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(body),
        }}></Body>
      <DateDiv color={color}>
        <span>Last updated on:</span> {formatDate(date)}
      </DateDiv>
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
  height: 20rem;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  border-radius: 0.25rem;
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
