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
import { NotesContainer, Content } from "../styles/NotePage.styles";

export default function Trash() {
  const [isEdit, setIsEdit] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [note, setNote] = useState({
    title: "",
    color: "blue",
    body: "",
  });
  const { notes, loading } = useNotes();
  const archivedNotes = notes.filter((note) => note.isArchived);

  const toggleModal = () => setShowModal((s) => !s);
  const closeModal = () => setShowModal(false);
  const noteActions = [
    {
      id: "trash",
      icon: <AiOutlineDelete />,
      title: "Move to Trash",
      // actionHandler: moveToTrash,
    },
    {
      id: "archive",
      icon: <IoArchiveOutline />,
      title: "Archive Note",
      // actionHandler: moveToArchive,
    },
  ];

  if (loading) return <Loader />;

  return (
    <Container>
      <Content>
        <h3>Archived Notes page</h3>
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
          <Empty />
        )}
      </Content>
    </Container>
  );
}
