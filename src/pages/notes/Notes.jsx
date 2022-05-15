import { useState } from "react";
import { Button, Loader, Modal, NoteCard, NoteForm } from "../../components";
import { useNotes } from "../../context/notes";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { IoArchiveOutline } from "react-icons/io5";
import styled from "styled-components";
import { Container } from "../../styles/globals";

export default function Notes() {
  const [isEdit, setIsEdit] = useState(false);
  const { loading, notes, addNote, editNote } = useNotes();

  const [showModal, setShowModal] = useState(false);
  const [note, setNote] = useState({
    title: "",
    color: "blue",
    body: "",
  });

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

  const openAddNoteModal = () => {
    setIsEdit(false);
    toggleModal();
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

  const noteActions = [
    {
      id: "trash",
      icon: <AiOutlineDelete />,
      title: "Move to Trash",
    },
    {
      id: "archive",
      icon: <IoArchiveOutline />,
      title: "Archive Note",
    },
  ];

  if (loading) return <Loader />;

  return (
    <Container>
      <h3>Notes page</h3>
      <Button variant="primary__block" onClick={openAddNoteModal}>
        Add Note
      </Button>
      <NotesContainer>
        {notes.map((note) => (
          <NoteCard
            note={note}
            setNote={setNote}
            setIsEdit={setIsEdit}
            toggleModal={toggleModal}
            noteActions={noteActions}
            key={note.id}
          />
        ))}
      </NotesContainer>
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
