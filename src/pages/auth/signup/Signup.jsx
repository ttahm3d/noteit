import { useState } from "react";
import styled from "styled-components";
import { Alert, Button, Input, NavigationLink } from "../../../components";
import { useAuth } from "../../../context/auth";
import { Container } from "../../../styles/globals";

export default function Signup() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const handleCredentialsChange = (event) => {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value,
    });
  };

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
  });
  const handleUserDataChange = (event) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [error, setError] = useState(null);

  const { signUp } = useAuth();

  const toggleShowPassword = () => setShowPassword((s) => !s);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { error } = await signUp(credentials, {
      data: userData,
    });
    if (error) {
      setShowAlert(true);
      setError(error.msg);
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
      value: userData.firstName,
      onChangeHandler: (e) => handleUserDataChange(e),
      required: true,
    },
    {
      id: "lastName",
      label: "Last Name",
      name: "lastName",
      type: "text",
      value: userData.lastName,
      onChangeHandler: (e) => handleUserDataChange(e),
      required: true,
    },
    {
      id: "email",
      label: "email",
      name: "email",
      type: "email",
      value: credentials.email,
      onChangeHandler: (e) => handleCredentialsChange(e),
      required: true,
    },
    {
      id: "password",
      label: "password",
      name: "password",
      type: "password",
      value: credentials.password,
      onChangeHandler: (e) => handleCredentialsChange(e),
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
        <Alert
          message={error}
          showAlert={showAlert}
          timeout={3000}
          closeAlert={() => setShowAlert(false)}
        />
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
