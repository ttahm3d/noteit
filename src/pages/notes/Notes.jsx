import { useState } from "react";
import { Button, Loader, Modal, NoteCard, NoteForm } from "../../components";
import { useNotes } from "../../context/notes";
import styled from "styled-components";
import { Container } from "../../styles/globals";

export default function Notes() {
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [note, setNote] = useState({
    title: "",
    color: "blue",
    body: "",
  });
  const { loading, notes, addNote, editNote } = useNotes();

  const toggleModal = () => setShowModal((s) => !s);
  const closeModal = () => setShowModal(false);

  const closeAndClearForm = () => {
    setNote({
      title: "",
      color: "blue",
      body: "",
    });
    closeModal();
  };

  const saveNote = () => {
    addNote(note);
    closeAndClearForm();
  };

  const saveChanges = () => {
    editNote(note);
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

  const editNoteActions = [
    {
      id: "cancel",
      text: "Cancel",
      action: () => closeAndClearForm(),
      variant: "primary__outline",
    },
    {
      id: "add",
      text: "Save Changes",
      action: () => saveChanges(),
      variant: "primary__block",
    },
  ];

  if (loading) return <Loader />;

  return (
    <Container>
      <h3>Notes page</h3>
      <NotesContainer>
        {notes.map((note) => (
          <NoteCard
            note={note}
            setNote={setNote}
            setIsEdit={setIsEdit}
            toggleModal={toggleModal}
            key={note.id}
          />
        ))}
      </NotesContainer>
      <Button variant="primary__block" onClick={toggleModal}>
        Text
      </Button>
      <Modal
        showModal={showModal}
        header={isEdit ? "Edit Note" : "Add Note"}
        closeModal={closeAndClearForm}>
        <NoteForm
          note={note}
          setNote={setNote}
          actions={isEdit ? editNoteActions : addNoteActions}
        />
      </Modal>
    </Container>
  );
}

const NotesContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
  gap: 1rem;
`;
