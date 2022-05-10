import styled, { keyframes } from "styled-components";

export default function Loader() {
  return (
    <LoaderContainer>
      <LoaderRing />
    </LoaderContainer>
  );
}

const LoaderContainer = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 90vh;
`;

const spinAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const LoaderRing = styled.div`
  border: 0.5rem solid ${({ theme }) => theme.colors.blue3};
  border-top: 0.5rem solid ${({ theme }) => theme.colors.blue9};
  border-radius: 50%;
  width: 80px;
  height: 80px;
  animation: ${spinAnimation} 0.5s linear infinite;
`;
