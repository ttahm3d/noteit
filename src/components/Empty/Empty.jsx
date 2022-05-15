import styled from "styled-components";
import Icon from "../../assets/Icon.svg";
import NavigationLink from "../Links/Link";

export default function Empty({ message, firstLink, secondLink }) {
  return (
    <EmptyContainer>
      <ImageWrapper>
        <img src={Icon} alt="Notes Icon" />
      </ImageWrapper>
      <Message>{message}</Message>
      <div>
        Check for notes in&nbsp;
        <NavigationLink to={firstLink.link}>
          {firstLink.text}
        </NavigationLink> or{" "}
        <NavigationLink to={secondLink.link}>{secondLink.text}</NavigationLink>{" "}
        pages.
      </div>
    </EmptyContainer>
  );
}

const EmptyContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: min(100% - 2rem, 45em);
  margin: 1rem auto;
  font-size: 1.25rem;
`;

const ImageWrapper = styled.div``;

const Message = styled.div`
  color: ${(props) => props.theme.colors.slate11};
  padding: 1rem 0;
`;
