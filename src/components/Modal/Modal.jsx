import styled from "styled-components";
import { AiOutlineClose } from "react-icons/ai";
import { IconButton } from "../Button/Button";
import * as ReactDOM from "react-dom";

export default function Modal({ children, header, showModal, closeModal }) {
  return ReactDOM.createPortal(
    <>
      {showModal && (
        <StyledModalContainer onClick={closeModal}>
          <StyledModal onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <div>{header}</div>
              <CloseIcon
                onClick={closeModal}
                icon={<AiOutlineClose fill="red" />}
              />
            </ModalHeader>
            <ModalText>{children}</ModalText>
          </StyledModal>
        </StyledModalContainer>
      )}
    </>,
    document.querySelector("#modal")
  );
}

const StyledModalContainer = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
  transition: all 0.3s linear;
`;

const StyledModal = styled.div`
  width: min(30rem, 90vw);
  max-height: 80vh;
  background-color: ${(props) => props.theme.colors.slate2};
`;

const ModalHeader = styled.div`
  padding: 1rem;
  display: flex;
  padding-bottom: 0.5rem;
  align-items: center;
  font-size: 1.2rem;
`;

const CloseIcon = styled(IconButton)`
  margin-left: auto;
  background-color: ${(props) => props.theme.colors.red5} !important;
  border: 1px solid ${(props) => props.theme.colors.red7};
  color: ${(props) => props.theme.colors.red7};

  :hover {
    background-color: ${(props) => props.theme.colors.red5};
  }

  :active {
    background-color: ${(props) => props.theme.colors.red6};
  }
`;

const ModalText = styled.div``;
