import styled from "styled-components";
import { Link } from "react-router-dom";

export default function NavigationLink(props) {
  const { children, to } = props;
  return (
    <StyledLink to={to} {...props}>
      {children}
    </StyledLink>
  );
}

const StyledLink = styled(Link)`
  border-bottom: 2px solid ${(props) => props.theme.colors.blue7};
  color: ${(props) => props.theme.colors.blue11};
`;
