import styled from "styled-components";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Button } from "../Button/Button";

export default function NoteForm({ note, setNote, actions }) {
  const colorsList = ["teal", "crimson", "orange", "brown", "plum", "blue"];

  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
    ],
  };

  const availableTags = [
    {
      id: 1,
      name: "Learning",
    },
    {
      id: 2,
      name: "Work",
    },
    {
      id: 3,
      name: "Personal",
    },
    {
      id: 4,
      name: "To do",
    },
    {
      id: 5,
      name: "In progress",
    },
    {
      id: 6,
      name: "Completed",
    },
  ];

  return (
    <NotesContainer color={note?.color}>
      <TitleInput
        value={note?.title}
        required={true}
        name="title"
        type="text"
        color={note?.color}
        placeholder="Enter Title"
        onChange={(e) => setNote({ ...note, title: e.target.value })}
      />
      <ReactQuill
        modules={modules}
        placeholder="Enter Note..."
        value={note?.body}
        preserveWhitespace={true}
        onChange={(e) => setNote({ ...note, body: e })}
      />
      <NoteFooter color={note?.color}>
        <ColorPickerContainer>
          {colorsList.map((notecolor) => (
            <ColorCircle
              notecolor={notecolor}
              color={note?.color}
              key={notecolor}
              onClick={() => setNote({ ...note, color: notecolor })}
            />
          ))}
        </ColorPickerContainer>
        <TagsContainer>
          {availableTags.map(({ id, name }) => (
            <Tag
              color={note?.color}
              selected={name === note?.tag}
              key={id}
              onClick={(e) => setNote({ ...note, tag: name })}>
              {name}
            </Tag>
          ))}
        </TagsContainer>
      </NoteFooter>
      {actions.length > 0 ? (
        <ActionsContainer>
          {actions?.map((action) => (
            <Button
              variant={action.variant}
              key={action.id}
              rounded={0.25}
              disabled={action?.disabled}
              onClick={action.action}>
              {action.text}
            </Button>
          ))}
        </ActionsContainer>
      ) : null}
    </NotesContainer>
  );
}

const NotesContainer = styled.div`
  /* Quill Input */
  .quill {
    display: flex;
    flex-direction: column;
    font-family: inherit;
    background-color: ${({ theme, color }) => `${theme.colors[color + "4"]}`};
    color: ${({ theme, color }) => `${theme.colors[color + "11"]}`};
  }

  .ql-editor.ql-blank::before {
    color: ${({ theme, color }) => `${theme.colors[color + "11"]}`};
    text-decoration: none;
  }

  .ql-container.ql-snow {
    min-height: 8rem;
    max-height: 15rem;
    overflow: hidden auto;
    font-size: 1rem;
    font-family: inherit;
    border: none;

    :focus {
      background-color: ${({ theme, color }) => `${theme.colors[color + "4"]}`};
    }
  }

  /* toolbar icons container */
  .ql-toolbar.ql-snow {
    display: flex;
    padding: 10px;
    border: none;
    background-color: ${({ theme, color }) => `${theme.colors[color + "5"]}`};
  }

  /* toolbar icons wrapper*/
  .ql-toolbar.ql-snow .ql-formats {
    display: flex;
    margin-right: 0;
  }

  .ql-toolbar button {
    fill: ${({ theme, color }) => `${theme.colors[color + "11"]}`};
  }

  /* Active toolbar icon */
  .ql-toolbar button.ql-active {
    background-color: ${({ theme, color }) => `${theme.colors[color + "7"]}`};
    border: 2px solid ${({ theme, color }) => `${theme.colors[color + "8"]}`};
    border-radius: 0.25rem;
  }

  .ql-snow.ql-toolbar button.ql-active {
    color: red;
  }

  .ql-snow.ql-toolbar button:hover .ql-stroke,
  .ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke,
  .ql-snow .ql-stroke,
  .ql-snow.ql-toolbar button.ql-active .ql-stroke {
    stroke: ${({ theme, color }) => `${theme.colors[color + "11"]}`};
  }

  .ql-snow.ql-toolbar button:hover .ql-fill,
  .ql-snow.ql-toolbar .ql-picker-label:hover .ql-fill,
  .ql-snow.ql-toolbar button.ql-active .ql-fill {
    fill: ${({ theme, color }) => `${theme.colors[color + "11"]}`};
  }
`;

const TitleInput = styled.input`
  padding: 1rem;
  font-size: 1rem;
  font-weight: 500;
  width: 100%;
  background-color: ${({ theme, color }) => `${theme.colors[color + "3"]}`};
  border: 0;
  color: ${({ theme, color }) => `${theme.colors[color + "11"]}`};

  ::placeholder {
    color: ${({ theme, color }) => `${theme.colors[color + "11"]}`};
    font-style: italic;
  }

  :focus {
    outline: 1px solid transparent;
    outline-offset: -2px;
  }

  :disabled {
    background-color: ${({ theme, color }) => `${theme.colors[color + "3"]}`};
    cursor: not-allowed;
  }
`;

const ColorPickerContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const ColorCircle = styled.div`
  padding: 0.75rem;
  cursor: pointer;
  background-color: ${({ theme, notecolor }) =>
    `${theme.colors[notecolor + "9"]}`};
  border-radius: 50%;

  outline: ${({ theme, notecolor, color }) =>
    notecolor === color && `3px solid ${theme.colors[notecolor + "7"]}`};
  outline-offset: 0.25rem;
`;

const ActionsContainer = styled.div`
  padding: 1rem;
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
`;

const NoteFooter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.slate7};
`;

const TagsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const Tag = styled.div`
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 12px;
  cursor: pointer;
  background-color: ${({ theme, selected, color }) =>
    selected ? `${theme.colors[color + "5"]}` : `${theme.colors[color + "3"]}`};
  color: ${({ theme, selected, color }) =>
    selected
      ? `${theme.colors[color + "10"]}`
      : `${theme.colors[color + "9"]}`};
  border: 1px solid ${({ theme, color }) => `${theme.colors[color + "7"]}`};
  font-weight: ${({ selected }) => (selected ? "600" : "400")};

  :hover {
    background-color: ${({ theme, color }) => `${theme.colors[color + "4"]}`};
  }

  :active {
    background-color: ${({ theme, color }) => `${theme.colors[color + "5"]}`};
  }
`;
