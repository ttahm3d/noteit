import styled from "styled-components";
import Icon from "../../assets/Icon.svg";

export default function Empty({ message }) {
  return (
    <EmptyContainer>
      <ImageWrapper>
        <img src={Icon} alt="Notes Icon" />
      </ImageWrapper>
      <Message>{message}</Message>
    </EmptyContainer>
  );
}

const EmptyContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: min(100% - 2rem, 45em);
  margin: 2rem auto;
  font-size: 1.25rem;
`;

const ImageWrapper = styled.div``;

const Message = styled.div`
  color: ${(props) => props.theme.colors.slate12};
  padding: 2rem 0;

  div {
    color: ${(props) => props.theme.colors.slate11};
  }
`;

// const LinksContainer = styled.div`
//   color: ${(props) => props.theme.colors.slate11};
// `;
