import styled from "styled-components";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function NoteForm() {
  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      ["blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
    ],
  };
  return (
    <NotesContainer>
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
    /* background-color: ${(props) => props.theme.colors.violet4}; */
    color: ${(props) => props.theme.colors.mauve12};
  }

  .ql-editor.ql-blank::before {
    color: ${(props) => props.theme.colors.mauve11};
    text-decoration: none;
  }

  .ql-container.ql-snow {
    min-height: 8rem;
    border-radius: 0 0 5px 5px;
    font-size: 1rem;
    font-family: inherit;
    border: none;
  }

  .ql-toolbar.ql-snow {
    display: flex;
    padding: 0.75rem;
    border: none;
    justify-content: space-evenly;
    background-color: ${(props) => props.theme.colors.slate8};
  }

  .ql-toolbar.ql-snow .ql-formats {
    display: flex;
    margin-right: 0;
  }

  .ql-toolbar button.ql-active {
    background-color: ${(props) => props.theme.colors.blue10};
    border-radius: 8px;
    fill: ${(props) => props.theme.colors.white};
  }

  .ql-snow.ql-toolbar button.ql-active {
    color: ${(props) => props.theme.colors.white};
  }

  .ql-toolbar button .ql-fill {
    fill: ${(props) => props.theme.colors.slate11};
  }

  .ql-toolbar button .ql-stroke,
  .ql-picker-label .ql-stroke {
    stroke: ${(props) => props.theme.colors.slate12};
  }

  .ql-snow.ql-toolbar button:hover .ql-stroke,
  .ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke,
  .ql-snow .ql-stroke,
  .ql-snow.ql-toolbar button.ql-active .ql-stroke {
    stroke: ${(props) => props.theme.colors.slate12};
    background-color: ${(props) => props.theme.colors.white};
  }

  .ql-snow.ql-toolbar button:hover .ql-fill,
  .ql-snow.ql-toolbar .ql-picker-label:hover .ql-fill,
  .ql-snow.ql-toolbar button.ql-active .ql-fill {
    fill: ${(props) => props.theme.colors.slate12};
  }
`;
