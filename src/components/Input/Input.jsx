import styled from "styled-components";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

export default function Input(props) {
  const {
    label,
    id,
    type,
    name,
    required,
    value,
    disabled,
    placeholder,
    onChangeHandler,
    toggleShowPassword,
    showPassword,
  } = props;
  return (
    <FormItem>
      {label && <Label htmlFor={id}>{label}</Label>}
      {type === "password" ? (
        <>
          <StyledInput
            type={type === "password" && showPassword ? "text" : "password"}
            id={id}
            name={name}
            value={value}
            required={required}
            placeholder={placeholder}
            disabled={disabled}
            onChange={onChangeHandler}
          />
          <ShowButton onClick={toggleShowPassword}>
            {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </ShowButton>
        </>
      ) : (
        <StyledInput
          type={type}
          id={id}
          name={name}
          value={value}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          onChange={onChangeHandler}
        />
      )}
    </FormItem>
  );
}

const FormItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 0.5rem 0;
  position: relative;
`;

const Label = styled.label`
  text-transform: capitalize;
`;

const StyledInput = styled.input`
  padding: 0.25rem;
  border-radius: 0.25rem;
  font-size: 1rem;
  background-color: ${(props) => props.theme.colors.blue3};
  border: 1px solid ${(props) => props.theme.colors.blue7};
  color: ${(props) => props.theme.colors.blue12};

  :focus {
    background-color: ${(props) => props.theme.colors.blue5};
    outline: 1px solid ${(props) => props.theme.colors.blue8};
  }

  :disabled {
    background-color: ${(props) => props.theme.colors.blue3};
    cursor: not-allowed;
  }
`;

const ShowButton = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  border-radius: 0 0.25rem 0.25rem 0;
  justify-content: center;
  padding: 0.44rem;
  top: 46.5%;
  right: 1px;
  font-size: 1.2rem;
  cursor: pointer;
  background-color: ${(props) => props.theme.colors.blue6};

  :hover {
    background-color: ${(props) => props.theme.colors.blue7};
  }
`;
