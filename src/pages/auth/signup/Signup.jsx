import { useState } from "react";
import styled from "styled-components";
import { Button, Input, NavigationLink } from "../../../components";
import { useAuth } from "../../../context/auth";
import { Container } from "../../../styles/globals";

export default function Signup() {
  const [signupForm, setSignupForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const { signUp } = useAuth();

  const toggleShowPassword = () => setShowPassword((s) => !s);

  const handleChange = (event) => {
    setSignupForm({
      ...signupForm,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { error } = signUp(
      {
        email: signupForm.email,
        password: signupForm.password,
      },
      {
        data: {
          firstName: signupForm.firstName,
          lastName: signupForm.lastName,
        },
      }
    );
    if (error) {
      alert(error);
    } else {
      alert("SignUp successful. Check your email for confirmation link");
    }
  };

  const formItems = [
    {
      id: "firstName",
      label: "First Name",
      name: "firstName",
      type: "text",
      value: signupForm.firstName,
      onChangeHandler: (e) => handleChange(e),
      required: true,
    },
    {
      id: "lastName",
      label: "Last Name",
      name: "lastName",
      type: "text",
      value: signupForm.lastName,
      onChangeHandler: (e) => handleChange(e),
      required: true,
    },
    {
      id: "email",
      label: "email",
      name: "email",
      type: "email",
      value: signupForm.email,
      onChangeHandler: (e) => handleChange(e),
      required: true,
    },
    {
      id: "password",
      label: "password",
      name: "password",
      type: "password",
      value: signupForm.password,
      onChangeHandler: (e) => handleChange(e),
      required: true,
      showPassword: showPassword,
      toggleShowPassword: toggleShowPassword,
    },
  ];

  return (
    <Container>
      <FormContainer>
        <FormHeading>Signup</FormHeading>
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
          <SignupBtn variant="primary__cta" rounded={0.25}>
            Signup
          </SignupBtn>
        </form>
        <div>
          Already have an account?{" "}
          <NavigationLink to="/auth/signup">Login now</NavigationLink>
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

const SignupBtn = styled(Button)`
  margin: 2rem 0;
`;
