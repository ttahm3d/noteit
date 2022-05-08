import { useState } from "react";
import { Button, Modal, NoteCard, NoteForm } from "../../components";
import { useNotes } from "../../context/notes";
import styled from "styled-components";
import { Container } from "../../styles/globals";

export default function Notes() {
  const [showModal, setShowModal] = useState(false);
  const [note, setNote] = useState({
    title: "",
    color: "gray",
    body: "",
  });
  const { notes, addNote } = useNotes();

  const toggleModal = () => setShowModal((s) => !s);
  const closeModal = () => setShowModal(false);

  const closeAndClearForm = () => {
    setNote({
      title: "",
      color: "gray",
      body: "",
    });
    closeModal();
  };

  const saveNote = () => {
    addNote(note);
    closeAndClearForm();
  };

  const actions = [
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
    <Container>
      <h3>Notes page</h3>
      <NotesContainer>
        {notes.map((note) => (
          <NoteCard note={note} key={note.id} />
        ))}
      </NotesContainer>
      <Button variant="primary__block" onClick={toggleModal}>
        Text
      </Button>
      <Modal
        showModal={showModal}
        header="Add a Note"
        closeModal={closeAndClearForm}>
        <NoteForm note={note} setNote={setNote} actions={actions} />
      </Modal>
    </Container>
  );
}

const NotesContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
  gap: 1rem;
`;
