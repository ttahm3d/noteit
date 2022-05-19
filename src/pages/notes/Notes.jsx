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
  const [eNote, setENote] = useState({
    title: "",
    color: "blue",
    body: "",
    tag: "",
  });
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

  const normalNotes = notes.filter(
    (note) => !(note.isArchived || note.isTrashed)
  );

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

  const isValidAdd = note.title !== "";

  const isValidEdit = (initNote, note) => {
    const { title: iTitle, body: iBody, color: iColor, tag: iTag } = initNote;
    const { title: mTitle, body: mBody, color: mColor, tag: mTag } = note;
    const isValueSame = !(
      iTitle === mTitle &&
      iBody === mBody &&
      iColor === mColor &&
      iTag === mTag
    );

    return isValueSame && isValidAdd;
  };

  const addNoteActions = [
    {
      id: "cancel",
      text: "Cancel",
      action: () => closeAndClearForm(),
      variant: "primary__outline",
      disabled: false,
    },
    {
      id: "add",
      text: "Save Note",
      action: () => saveNote(),
      variant: "primary__block",
      disabled: !isValidAdd,
    },
  ];

  const editNoteActions = [
    {
      id: "cancel",
      text: "Cancel",
      action: () => closeAndClearForm(),
      variant: "primary__outline",
      disabled: false,
    },
    {
      id: "add",
      text: "Save Changes",
      action: () => saveChanges(),
      variant: "primary__block",
      disabled: !isValidEdit(eNote, note),
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
        {normalNotes.length > 0 ? (
          <NotesContainer>
            {normalNotes.map((note) => (
              <NoteCard
                note={note}
                setNote={setNote}
                setIsEdit={setIsEdit}
                setENote={setENote}
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
