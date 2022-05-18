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
    tag: "",
    isTrashed: true,
  });
  const { notes, loading, editNote, removeFromTrash, moveToArchive } =
    useNotes();

  const trashedNotes = notes.filter((note) => note.isTrashed);

  const toggleModal = () => setShowModal((s) => !s);
  const closeModal = () => setShowModal(false);
  const noteActions = [
    {
      id: "trash",
      icon: <AiOutlineDelete />,
      title: "Restore Note",
      actionHandler: removeFromTrash,
    },
    {
      id: "archive",
      icon: <IoArchiveOutline />,
      title: "Archive Note",
      actionHandler: moveToArchive,
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

  const saveChanges = () => {
    editNote(note);
    closeAndClearForm();
  };

  const closeAndClearForm = () => {
    setNote({
      title: "",
      color: "blue",
      body: "",
      tag: "",
      isTrashed: true,
    });
    closeModal();
  };

  if (loading) return <Loader />;

  return (
    <Container>
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
          header={"Edit Note"}
          closeModal={closeAndClearForm}>
          <NoteForm note={note} setNote={setNote} actions={editNoteActions} />
        </Modal>
      </Content>
    </Container>
  );
}
