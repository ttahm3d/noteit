import styled from "styled-components";
import ReactQuill from "react-quill";
import Input from "../Input/Input";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";

export default function NoteForm() {
  const [title, setTitle] = useState("");

  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };
  return (
    <NotesContainer>
      <TitleInput
        value={title}
        required={true}
        name="title"
        type="text"
        placeholder="Enter Title"
        onChange={(e) => setTitle(e.target.value)}
      />
      <ReactQuill modules={modules} placeholder="Enter Note..." />
    </NotesContainer>
  );
}

const NotesContainer = styled.div`
  /* Quill Input */
  .quill {
    display: flex;
    flex-direction: column;
    font-family: inherit;
    background-color: ${(props) => props.theme.colors.orange4};
    color: ${(props) => props.theme.colors.orange10};
  }

  .ql-editor.ql-blank::before {
    color: ${(props) => props.theme.colors.orange11};
    text-decoration: none;
  }

  .ql-container.ql-snow {
    min-height: 8rem;
    font-size: 1rem;
    font-family: inherit;
    border: none;
  }

  /* toolbar icons container */
  .ql-toolbar.ql-snow {
    display: flex;
    padding: 10px;
    border: none;
    background-color: ${(props) => props.theme.colors.orange3};
  }

  /* toolbar icons wrapper*/
  .ql-toolbar.ql-snow .ql-formats {
    display: flex;
    margin-right: 0;
    /* background-color: red; */
  }

  .ql-toolbar button {
    fill: ${(props) => props.theme.colors.orange11};
  }

  /* Active toolbar icon */
  .ql-toolbar button.ql-active {
    background-color: ${(props) => props.theme.colors.orange5};
    border: 1px solid ${(props) => props.theme.colors.orange7};
    border-radius: 0.25rem;
  }

  .ql-snow.ql-toolbar button.ql-active {
    color: red;
  }

  .ql-toolbar button .ql-stroke,
  .ql-picker-label .ql-stroke {
    stroke: ${(props) => props.theme.colors.orange11};
  }

  .ql-snow.ql-toolbar button:hover .ql-stroke,
  .ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke,
  .ql-snow .ql-stroke,
  .ql-snow.ql-toolbar button.ql-active .ql-stroke {
    stroke: ${(props) => props.theme.colors.orange11};
  }

  .ql-snow.ql-toolbar button:hover .ql-fill,
  .ql-snow.ql-toolbar .ql-picker-label:hover .ql-fill,
  .ql-snow.ql-toolbar button.ql-active .ql-fill {
    fill: ${(props) => props.theme.colors.orange11};
  }
`;

const TitleInput = styled.input`
  padding: 0.25rem;
  border-radius: 0.25rem;
  font-size: 1rem;
  width: 100%;
  background-color: ${(props) => props.theme.colors.orange3};
  border: 1px solid ${(props) => props.theme.colors.orange7};
  color: ${(props) => props.theme.colors.orange11};

  ::placeholder {
    color: ${(props) => props.theme.colors.orange11};
  }

  :focus {
    background-color: ${(props) => props.theme.colors.orange5};
    outline: 1px solid ${(props) => props.theme.colors.orange8};
    outline-offset: -2px;
  }

  :disabled {
    background-color: ${(props) => props.theme.colors.orange3};
    cursor: not-allowed;
  }
`;
