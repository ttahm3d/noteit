import styled from "styled-components";

const IconButton = (props) => {
  const { icon } = props;

  return <StyledIconButton {...props}>{icon}</StyledIconButton>;
};

const Button = (props) => {
  const { variant, fullwidth, margin, rounded } = props;

  return (
    <StyledButton
      variant={variant}
      fullwidth={fullwidth}
      margin={margin}
      radius={rounded}
      {...props}>
      {props.children}
    </StyledButton>
  );
};

export { IconButton, Button };

const StyledButton = styled.button`
  outline: 2px solid transparent;
  background-color: ${(props) => {
    if (props.variant === "primary__block") return props.theme.colors.violet9;
    if (props.variant === "primary__cta") return props.theme.colors.violet4;
    if (props.variant === "primary__outline") return props.theme.colors.violet2;
    if (props.variant === "secondary__block") return props.theme.colors.orange9;
    if (props.variant === "secondary__cta") return props.theme.colors.orange4;
    if (!props.variant) return props.theme.colors.blue2;
  }};
  color: ${(props) => {
    if (props.variant === "primary__block") return props.theme.colors.white;
    if (props.variant === "primary__cta") return props.theme.colors.violet11;
    if (props.variant === "primary__outline")
      return props.theme.colors.violet10;
    if (props.variant === "secondary__block") return props.theme.colors.white;
    if (props.variant === "secondary__cta") return props.theme.colors.orange11;
    if (!props.variant) return props.theme.colors.gray12;
  }};
  border-radius: ${({ radius }) => (radius ? `${radius}rem` : "0")};
  border: ${(props) => {
    if (props.variant === "primary__block") return "none";
    if (props.variant === "secondary__block") return "none";
    if (props.variant === "primary__outline")
      return `1px solid ${props.theme.colors.violet7}`;
    if (props.variant === "primary__cta")
      return `1px solid ${props.theme.colors.violet6}`;
    if (props.variant === "secondary__cta")
      return `1px solid ${props.theme.colors.orange6}`;
    if (!props.variant) return 0;
  }};
  font-weight: 500;
  outline-offset: 2px;
  padding: 0.25rem 0.75rem;
  width: ${(props) => (props.fullwidth ? "100%" : "fit-content")};

  :hover {
    background-color: ${(props) => {
      if (props.variant === "primary__block")
        return props.theme.colors.violet10;
      if (props.variant === "primary__cta") return props.theme.colors.violet5;
      if (props.variant === "primary__outline")
        return props.theme.colors.violet3;
      if (props.variant === "secondary__block")
        return props.theme.colors.orange10;
      if (props.variant === "secondary__cta") return props.theme.colors.orange5;
      if (!props.variant) return props.theme.colors.blue4;
    }};
  }

  :active {
    background-color: ${(props) => {
      if (props.variant === "primary__block") return props.theme.colors.violet6;
      if (props.variant === "primary__cta") return props.theme.colors.violet6;
      if (props.variant === "primary__outline")
        return props.theme.colors.violet4;
      if (props.variant === "secondary__block")
        return props.theme.colors.orange9;
      if (props.variant === "secondary__cta") return props.theme.colors.orange6;
      if (!props.variant) return props.theme.colors.blue5;
    }};
  }

  :disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

const StyledIconButton = styled(StyledButton)`
  border: 1px solid transparent;
  align-items: center;
  border-radius: 0.25rem;
  padding: 0.25rem;
  display: flex;
  justify-content: center;
`;
