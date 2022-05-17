import { useState } from "react";
import { Container } from "../../styles/globals";
import {
  Button,
  Empty,
  Loader,
  Modal,
  NoteCard,
  NoteForm,
} from "../../components";
import { AiOutlineDelete } from "react-icons/ai";
import { IoArchiveOutline } from "react-icons/io5";
import { useNotes } from "../../context/notes";
import {
  NotesContainer,
  Content,
  AddNoteContainer,
} from "../styles/NotePage.styles";

export default function Trash() {
  const [isEdit, setIsEdit] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [note, setNote] = useState({
    title: "",
    color: "blue",
    body: "",
    isTrashed: true,
  });
  const { notes, loading, addNote, editNote, removeFromTrash, moveToArchive } =
    useNotes();

  const trashedNotes = notes.filter((note) => note.isTrashed);

  const toggleModal = () => setShowModal((s) => !s);
  const closeModal = () => setShowModal(false);
  const noteActions = [
    {
      id: "trash",
      icon: <AiOutlineDelete />,
      title: "Move to Trash",
      actionHandler: removeFromTrash,
    },
    {
      id: "archive",
      icon: <IoArchiveOutline />,
      title: "Archive Note",
      actionHandler: moveToArchive,
    },
  ];

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

  const closeAndClearForm = () => {
    setNote({
      title: "",
      color: "blue",
      body: "",
      isTrashed: true,
    });
    closeModal();
  };

  if (loading) return <Loader />;

  return (
    <Container>
      <AddNoteContainer>
        <Button
          variant="primary__block"
          onClick={openAddNoteModal}
          title="Add Note">
          Add Note
        </Button>
      </AddNoteContainer>
      <Content>
        {trashedNotes.length > 0 ? (
          <NotesContainer>
            {trashedNotes.map((note) => (
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
        ) : (
          <Empty message="There are no notes in Trash." />
        )}
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
      </Content>
    </Container>
  );
}
