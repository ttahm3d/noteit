import { useState } from "react";
import styled from "styled-components";
import { useAuth } from "../../../context/auth";
import { Alert, Button, Input, NavigationLink } from "../../../components";
import { Container } from "../../../styles/globals";
import { useLocation, useNavigate } from "react-router-dom";

export default function Login() {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.state?.from?.pathname || "/";

  const [showAlert, setShowAlert] = useState(false);
  const [error, setError] = useState(null);

  const toggleShowPassword = () => setShowPassword((s) => !s);

  const handleChange = (event) => {
    setLoginForm({
      ...loginForm,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { error } = await signIn(loginForm);
      if (error) {
        setError(error.message);
        setShowAlert(true);
      } else {
        navigate(path);
        setLoginForm({ email: "", password: "" });
      }
    } catch (e) {}
  };

  const guestLogin = async (event) => {
    event.preventDefault();
    try {
      const { error } = await signIn({
        email: "tahirahmedt97@gmail.com",
        password: "py2qry9c",
      });
      if (error) {
        setError(error.message);
        setShowAlert(true);
      } else {
        navigate(path);
        setLoginForm({ email: "", password: "" });
      }
    } catch (e) {}
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
          <LoginBtn variant="primary__cta" rounded="0.25" fullwidth>
            Login
          </LoginBtn>
          <LoginBtn
            variant="secondary__cta"
            rounded="0.25"
            fullwidth
            onClick={guestLogin}>
            Login as guest
          </LoginBtn>
        </form>
        <div>
          Don't have an account?&nbsp;&nbsp;
          <NavigationLink to="/auth/signup">Create one now</NavigationLink>
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

const LoginBtn = styled(Button)`
  margin: 2rem 0 0;

  :last-child {
    margin-bottom: 2rem;
  }
`;
