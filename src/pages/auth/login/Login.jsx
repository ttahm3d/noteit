import { useState } from "react";
import styled from "styled-components";
import { Button, Input, NavigationLink } from "../../../components";
import { Container } from "../../../styles/globals";

export default function Login() {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword((s) => !s);

  const handleChange = (event) => {
    setLoginForm({
      ...loginForm,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(loginForm);
    setLoginForm({
      email: "",
      password: "",
    });
  };

  const formItems = [
    {
      id: "email",
      label: "email",
      name: "email",
      type: "email",
      value: loginForm.email,
      onChangeHandler: (e) => handleChange(e),
      required: true,
    },
    {
      id: "password",
      label: "password",
      name: "password",
      type: "password",
      value: loginForm.password,
      onChangeHandler: (e) => handleChange(e),
      required: true,
      showPassword: showPassword,
      toggleShowPassword: toggleShowPassword,
    },
  ];

  return (
    <Container>
      <FormContainer>
        <FormHeading>Login</FormHeading>
        <form onSubmit={handleSubmit}>
          {formItems.map((inputItem) => (
            <Input
              key={inputItem.id}
              type={inputItem.type}
              name={inputItem.name}
              label={inputItem.label}
              value={inputItem.value}
              onChangeHandler={inputItem.onChangeHandler}
              required={inputItem.required}
              showPassword={inputItem?.showPassword}
              toggleShowPassword={inputItem?.toggleShowPassword}
            />
          ))}
          <LoginBtn variant="primary__cta" rounded="0.25">
            Login
          </LoginBtn>
        </form>
        <div>
          Don't have an account ?{" "}
          <NavigationLink to="/auth/signup">Create one now</NavigationLink>
        </div>
      </FormContainer>
    </Container>
  );
}

const FormContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 80vh;
`;

const FormHeading = styled.h3`
  margin: 0;
  padding-bottom: 1rem;
`;

const LoginBtn = styled(Button)`
  margin: 2rem 0;
`;
