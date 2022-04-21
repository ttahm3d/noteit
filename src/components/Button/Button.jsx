import styled from "styled-components";

const IconButton = (props) => {
  const { icon } = props;

  return <StyledIconButton {...props}>{icon}</StyledIconButton>;
};

const Button = (props) => {
  const { variant, fullwidth } = props;

  return (
    <StyledButton variant={variant} fullwidth>
      {props.children}
    </StyledButton>
  );
};

export { IconButton, Button };

const StyledButton = styled.button`
  outline: 2px solid transparent;
  background-color: ${(props) => {
    if (props.variant === "primary__block") return props.theme.colors.blue10;
    if (props.variant === "secondary__block")
      return props.theme.colors.orange10;
    if (!props.variant) return props.theme.colors.gray2;
  }};
  color: ${(props) => {
    if (props.variant === "primary__block") return props.theme.colors.white;
    if (props.variant === "secondary__block") return props.theme.colors.white;
    if (!props.variant) return props.theme.colors.gray12;
  }};
  border: 0;
  font-weight: 500;
  outline-offset: 2px;
  padding: 0.25rem 0.75rem;
  width: ${(props) => (props.fullwidth ? "100%" : "fit-content")};

  :hover {
    background-color: ${(props) => {
      if (props.variant === "primary__block") return props.theme.colors.blue9;
      if (props.variant === "secondary__block")
        return props.theme.colors.orange9;
      if (!props.variant) return props.theme.colors.gray4;
    }};
  }

  :active {
    background-color: ${(props) => {
      if (props.variant === "primary__block") return props.theme.colors.blue9;
      if (props.variant === "secondary__block")
        return props.theme.colors.orange9;
      if (!props.variant) return props.theme.colors.gray4;
    }};
    transform: scale(1.01);
  }
`;

const StyledIconButton = styled(StyledButton)`
  border: 1px solid transparent;
  align-items: center;
  border-radius: 0.25rem;
  padding: 0.25rem;
  display: flex;
  justify-content: center;

  :focus {
    border: 2px solid ${(props) => props.theme.colors.gray7};
  }
`;
