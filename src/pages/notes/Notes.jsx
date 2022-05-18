import { useState } from "react";
import {
  Button,
  Empty,
  Loader,
  Modal,
  NoteCard,
  NoteForm,
} from "../../components";
import { useNotes } from "../../context/notes";
import { AiOutlineDelete } from "react-icons/ai";
import { IoArchiveOutline } from "react-icons/io5";
import { NotesContainer, AddNoteContainer } from "../../styles/NotePage.styles";
import { Container, Content } from "../../styles/globals";

export default function Notes() {
  const [isEdit, setIsEdit] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [note, setNote] = useState({
    title: "",
    color: "blue",
    body: "",
    tag: "",
  });

  const { loading, notes, addNote, editNote, moveToTrash, moveToArchive } =
    useNotes();

  const toggleModal = () => setShowModal((s) => !s);
  const closeModal = () => setShowModal(false);

  const closeAndClearForm = () => {
    setNote({
      title: "",
      color: "blue",
      body: "",
      tag: "",
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
    setIsEdit(false);
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
      actionHandler: moveToTrash,
    },
    {
      id: "archive",
      icon: <IoArchiveOutline />,
      title: "Archive Note",
      actionHandler: moveToArchive,
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
        {notes.length > 0 ? (
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
        ) : (
          <Empty message="There are no notes to be shown here. Want to add a note now?" />
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
