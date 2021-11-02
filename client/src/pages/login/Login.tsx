import styled from "styled-components";
import { mobile } from "../../responsive";
import { Formik} from "formik";
import { loginForm } from "../../type/type";
import * as Yup from 'yup';
import axios from 'axios';
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })};
`;
const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0px;
  padding: 10px;
`;
const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  cursor: pointer;
  background-color: teal;
  color: white;
  margin-top: 10px;
`;
// const Link = styled.a`
//   margin: 5px 0px;
//   font-size: 12px;
//   text-decoration: underline;
//   cursor: pointer;
// `;
const Error = styled.span`
    margin: 5px 0px;
    color:red;
`;

export const submitLogin = (values : loginForm)=>{
    console.log(values.email)
    console.log(values.password)
}

const testCookie = async()=>{
  const response = await axios.get('http://localhost:3001/users',{withCredentials:true})
  console.log(response)
}

const Login = () => {
  return (
    <Container>
      <Wrapper>
        <button onClick={()=>testCookie()}>測試一下cookie</button>
        <Title>SIGN IN</Title>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={Yup.object({
            password: Yup.string()
              .min(8, 'Must be 8 characters or higher')
              .required(),
            email: Yup.string().email('Invalid email address').required(),
          })}
          onSubmit = {  (values, actions) => {

                axios.post('http://localhost:3001/login',values,{withCredentials:true}).then((response)=>{
                    console.log(response)
                }).catch(error=>{
                    if(error.response){
                        console.log(error.response.data.message)
                        if(error.response.data.message.includes("email") || error.response.data.message.includes("facebook")){
                            actions.setErrors({email:error.response.data.message})
                        }
                        else if(error.response.data.message.includes("password")){
                            actions.setErrors({password:error.response.data.message})
                        }
                    }
                });
            // alert(JSON.stringify(values, null, 2));
            // actions.setSubmitting(false);
          }}>
            {({
            errors,
            values,
            handleChange,
            handleBlur,
            handleSubmit,
            validateField
          }) => (
            <Form onSubmit={handleSubmit}>
                
                <Input
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  type="text"
                  name="email"
                  placeholder="Email"
                  data-testid="email"
                />
                {errors.email && <Error data-testid="emailError">{errors.email}</Error>}
                <Input
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  type="password"
                  name="password"
                  placeholder="Password"
                  data-testid="password"
                />
                {errors.password && <Error data-testid="passwordError">{errors.password}</Error>}
              <Button 
              data-testid="submit"
              type="submit">Submit</Button>
            </Form>
          )}
        </Formik>
      </Wrapper>
    </Container>
  );
};

export default Login;
