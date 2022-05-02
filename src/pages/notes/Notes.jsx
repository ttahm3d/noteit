import { useState } from "react";
import { Button } from "../../components";
import Modal from "../../components/Modal/Modal";
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
      <Modal
        showModal={showModal}
        header="sample header"
        closeModal={closeModal}>
        This is sample modal
      </Modal>
    </Container>
  );
}
