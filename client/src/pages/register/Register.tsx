import React from "react";
import styled from "styled-components";
import { mobile } from "../../responsive";
import axios from "axios";
import { Formik } from "formik";
import * as Yup from "yup";
// import { rest } from "msw";
// import FacebookLogin from 'react-facebook-login';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
  padding: 20px;
  width: 40%;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  ${mobile({ width: "75%" })};
`;
const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;
const FacebookButton = styled.button`
  border: none;
  padding: 15px 20px;
  cursor: pointer;
  background-color: #4267b2;
  color: white;
`;
const ThirdLogin = styled.div`
  margin: 10px 0px;
`;
const Form = styled.form`
  display: flex;
  flex-direction : column;
  justify-content: center;
  align-items: center;
  /* flex-wrap: wrap; */
`;
const Input = styled.input`
  flex: 1;
  //min-width: 80%;
  width:90%;
  margin: 20px 0px 0px 0px;
  padding: 10px;
`;
const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;
const Button = styled.button`
  margin-top:20px;
  width: 40%;
  border: none;
  padding: 15px 20px;
  cursor: pointer;
  background-color: teal;
  color: white;
`;
const Error = styled.span`
    margin: 5px 0px;
    color:red;
`;


const Register = () => {
  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <ThirdLogin>
          <a href="http://localhost:3001/auth/facebook">
            <FacebookButton>Signup with Facebook</FacebookButton>
          </a>
          {/* <FacebookLogin
                    appId="415876120207477"
                    autoLoad={true}
                    fields="name,email,picture"
                    //onClick={componentClicked}
                    callback={responseFacebook} /> */}
        </ThirdLogin>
        <Formik
          initialValues={{ email: "", password: "" ,username: "" , confirmPassword:""}}
          validationSchema={Yup.object({
            username: Yup.string().max(6,"Must be 6 characters or lower").required(),
            email: Yup.string().email("Invalid email address").required(),
            password: Yup.string()
              .min(8, "Must be 8 characters or higher")
              .required(),
            confirmPassword: Yup.string()
            .test('passwords-match', 'Passwords must match', function(value){
              return this.parent.password === value
            })
          })}
          onSubmit={(values, actions) => {
            
            const { confirmPassword , ...rest} = values
            const send_values = {...rest,isAdmin:false}
            axios
              .post("http://localhost:3001/signup", send_values, {
                withCredentials: true,
              })
              .then((response) => {
                console.log(response);
              })
              .catch((error) => {
                if (error.response) {
                  console.log(error.response.data.message);
                  if (
                    error.response.data.message.includes("email") ||
                    error.response.data.message.includes("facebook")
                  ) {
                    actions.setErrors({ email: error.response.data.message });
                  } else if (error.response.data.message.includes("password")) {
                    actions.setErrors({
                      password: error.response.data.message,
                    });
                  }
                }
              });
            // alert(JSON.stringify(values, null, 2));
            // actions.setSubmitting(false);
          }}
        >
          {({
            errors,
            values,
            handleChange,
            handleBlur,
            handleSubmit,
            validateField,
          }) => (
            <Form onSubmit={handleSubmit}>
                <Input
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.username}
                type="text"
                name="username"
                placeholder="Username"
                data-testid="usernameField"
                />
                {errors.username && (
                <Error data-testid="usernameError">{errors.username}</Error>
                )}
              <Input
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                type="text"
                name="email"
                placeholder="Email"
                data-testid="emailField"
              />
              {errors.email && (
                <Error data-testid="emailError">{errors.email}</Error>
              )}
              <Input
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                type="password"
                name="password"
                placeholder="Password"
                data-testid="passwordField"
              />
              {errors.password && (
                <Error data-testid="passwordError">{errors.password}</Error>
              )}
              <Input
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.confirmPassword}
                type="password"
                name="confirmPassword"
                placeholder="Confrim password"
                data-testid="confirmPasswordField"
                />
                {errors.confirmPassword && ( 
                <Error data-testid="confirmPasswordError">{errors.confirmPassword}</Error>
                )}
              <Button data-testid="submit" type="submit">
                Submit
              </Button>
            </Form>
          )}
        </Formik>
        {/* <Form>
          <Input placeholder="username" />
          <Input placeholder="email" />
          <Input placeholder="password" />
          <Input placeholder="confirm password" />
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>{" "}
          </Agreement>
          <Button>CREATE</Button>
        </Form> */}
      </Wrapper>
    </Container>
  );
};

export default Register;
