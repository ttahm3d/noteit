import { useState } from "react";
import { Container, Content } from "../../styles/globals";
import { Empty, Loader, Modal, NoteCard, NoteForm } from "../../components";
import { IoArchiveOutline } from "react-icons/io5";
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
  const { notes, loading, editNote, removeFromArchive } = useNotes();

  const archivedNotes = notes.filter((note) => note.isArchived);

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
      id: "edit",
      text: "Save Changes",
      action: () => saveChanges(),
      variant: "primary__block",
      disabled: !isValidEdit(eNote, note),
    },
  ];

  const closeAndClearForm = () => {
    setNote({
      title: "",
      color: "blue",
      body: "",
      tag: "",
      isArchived: true,
    });
    closeModal();
  };

  const saveChanges = () => {
    editNote(note);
    closeAndClearForm();
  };

  const noteActions = [
    {
      id: "archive",
      icon: <IoArchiveOutline />,
      title: "Un-archive Note",
      actionHandler: removeFromArchive,
    },
  ];

  if (loading) return <Loader />;

  return (
    <Container>
      <Content>
        {archivedNotes.length > 0 ? (
          <NotesContainer>
            {archivedNotes.map((note) => (
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
          <Empty message="There are no archived notes." />
        )}
        <Modal
          showModal={showModal}
          header="Edit Note"
          closeModal={closeAndClearForm}>
          <NoteForm note={note} setNote={setNote} actions={editNoteActions} />
        </Modal>
      </Content>
    </Container>
  );
}
