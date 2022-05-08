import { useState } from "react";
import { Button, Modal, NoteForm } from "../../components";
import { useNotes } from "../../context/notes";
import { Container } from "../../styles/globals";
import { supabase } from "../../SupabaseClient";

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
