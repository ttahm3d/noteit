import styled from "styled-components";

const IconButton = (props) => {
  const { icon } = props;

  return <StyledIconButton {...props}>{icon}</StyledIconButton>;
};

export { IconButton };

const Button = styled.button`
  outline: 2px solid transparent;
  background-color: ${(props) => props.theme.colors.gray2};
  color: ${(props) => props.theme.colors.gray9};
  font-weight: 500;
  outline-offset: 2px;

  :hover {
    background-color: ${(props) => props.theme.colors.gray4};
  }

  :active {
    background-color: ${(props) => props.theme.colors.gray5};
  }
`;

const StyledIconButton = styled(Button)`
  border: 1px solid transparent;
  align-items: center;
  border-radius: 0.25rem;
  padding: 0.25rem;
  display: flex;
  justify-content: center;

  :focus {
    border: 1px solid ${(props) => props.theme.colors.gray7};
  }
`;
