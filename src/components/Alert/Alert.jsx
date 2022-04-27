import styled from "styled-components";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useEffect } from "react";

export default function Alert({
  showAlert,
  closeAlert,
  message,
  timeout,
  type,
}) {
  useEffect(() => {
    setTimeout(() => {
      closeAlert();
    }, timeout);
  }, [showAlert, closeAlert, timeout]);

  return (
    <>
      {showAlert && (
        <AlertContainer showAlert={showAlert}>
          <AlertIcon>
            <AiOutlineCloseCircle />
          </AlertIcon>
          <AlertMessage>{message}</AlertMessage>
        </AlertContainer>
      )}
    </>
  );
}

const AlertContainer = styled.div`
  background-color: ${(props) => props.theme.colors.red4};
  color: ${(props) => props.theme.colors.red9};
  display: flex;
  align-items: center;
  padding: 1rem;
  gap: 0.5rem;
  position: fixed;
  top: ${({ showAlert }) => (showAlert ? "15%" : "-100%")};

  /* top: -100%; */
  left: auto;
  right: auto;
  transition: ${({ showAlert }) =>
    showAlert ? "0.5s top linear" : "0.5s top linear"}; ;
`;

const AlertIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AlertMessage = styled.div``;
