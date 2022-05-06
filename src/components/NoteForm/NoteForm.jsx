import styled from "styled-components";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";

export default function NoteForm() {
  const [note, setNote] = useState({
    title: "",
    color: "gray",
    body: "",
  });
  const colorsList = ["yellow", "crimson", "violet", "orange", "green", "gray"];

  console.log(note);

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

  return (
    <NotesContainer color={note.color}>
      <TitleInput
        value={note.title}
        required={true}
        name="title"
        type="text"
        color={note.color}
        placeholder="Enter Title"
        onChange={(e) => setNote({ ...note, title: e.target.value })}
      />
      <ReactQuill
        modules={modules}
        placeholder="Enter Note..."
        value={note.body}
        preserveWhitespace={true}
        onChange={(e) => setNote({ ...note, body: e })}
      />
      <ColorPickerContainer>
        {colorsList.map((notecolor) => (
          <ColorCircle
            notecolor={notecolor}
            color={note.color}
            key={notecolor}
            onClick={() => setNote({ ...note, color: notecolor })}
          />
        ))}
      </ColorPickerContainer>
    </NotesContainer>
  );
}

const NotesContainer = styled.div`
  /* Quill Input */
  .quill {
    display: flex;
    flex-direction: column;
    font-family: inherit;
    background-color: ${({ theme, color }) => `${theme.colors[color + "5"]}`};
    color: ${({ theme, color }) => `${theme.colors[color + "12"]}`};
  }

  .ql-editor.ql-blank::before {
    color: ${({ theme, color }) => `${theme.colors[color + "11"]}`};
    text-decoration: none;
  }

  .ql-container.ql-snow {
    min-height: 8rem;
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
    /* background-color: red; */
  }

  .ql-toolbar button {
    fill: ${({ theme, color }) => `${theme.colors[color + "11"]}`};
  }

  /* Active toolbar icon */
  .ql-toolbar button.ql-active {
    background-color: ${({ theme, color }) => `${theme.colors[color + "5"]}`};
    border: 1px solid ${({ theme, color }) => `${theme.colors[color + "7"]}`};
    border-radius: 0.25rem;
  }

  .ql-snow.ql-toolbar button.ql-active {
    color: red;
  }

  .ql-toolbar button .ql-stroke,
  .ql-picker-label .ql-stroke {
    stroke: ${({ theme, color }) => `${theme.colors[color + "11"]}`};
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
  padding: 1rem;
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
