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
    isArchived: true,
  });
  const { notes, loading, addNote, editNote, moveToTrash, removeFromArchive } =
    useNotes();
  const archivedNotes = notes.filter((note) => note.isArchived);

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

  const closeAndClearForm = () => {
    setNote({
      title: "",
      color: "blue",
      body: "",
      isArchived: true,
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

  const toggleModal = () => setShowModal((s) => !s);
  const closeModal = () => setShowModal(false);
  const noteActions = [
    {
      id: "trash",
      icon: <AiOutlineDelete />,
      title: "Move to Trash",
      actionHandler: moveToTrash,
    },
    {
      id: "archive",
      icon: <IoArchiveOutline />,
      title: "Archive Note",
      actionHandler: removeFromArchive,
    },
  ];

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
        {archivedNotes.length > 0 ? (
          <NotesContainer>
            {archivedNotes.map((note) => (
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
          <Empty message="There are no archived notes." />
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
