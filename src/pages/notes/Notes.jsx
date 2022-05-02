import { useState } from "react";
import { Button, Modal, NoteForm } from "../../components";
import { Container } from "../../styles/globals";

export default function Notes() {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => setShowModal((s) => !s);
  const closeModal = () => setShowModal(false);

  return (
    <Container>
      <h3>Notes page</h3>
      <Button variant="primary__block" onClick={toggleModal}>
        Text
      </Button>
      <Modal showModal={showModal} header="Add a Note" closeModal={closeModal}>
        <NoteForm />
      </Modal>
    </Container>
  );
}
