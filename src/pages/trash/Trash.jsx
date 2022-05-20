import { useState } from "react";
import { Container, Content } from "../../styles/globals";
import { Empty, Loader, Modal, NoteCard, NoteForm } from "../../components";
import { AiOutlineDelete } from "react-icons/ai";
import { useNotes } from "../../context/notes";
import { NotesContainer } from "../../styles/NotePage.styles";

export default function Trash() {
  const [isEdit, setIsEdit] = useState(false);
  const [eNote, setENote] = useState({
    title: "",
    color: "blue",
    body: "",
    tag: "Personal",
  });
  const [showModal, setShowModal] = useState(false);
  const [note, setNote] = useState({
    title: "",
    color: "blue",
    body: "",
    tag: "",
  });
  const { notes, loading, editNote, removeFromTrash } = useNotes();

  const trashedNotes = notes.filter((note) => note.isTrashed);

  const toggleModal = () => setShowModal((s) => !s);
  const closeModal = () => setShowModal(false);

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
    });
    closeModal();
  };

  const noteActions = [
    {
      id: "trash",
      icon: <AiOutlineDelete />,
      title: "Restore Note",
      actionHandler: removeFromTrash,
    },
  ];

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
                setENote={setENote}
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
