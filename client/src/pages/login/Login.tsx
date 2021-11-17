import styled from "styled-components";
import { mobile } from "../../responsive";
import { Formik} from "formik";
import { loginForm } from "../../type/type";
import * as Yup from 'yup';
import { useState } from "react";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { useLoginMutation } from "../../redux/api";
import { useAppDispatch } from "../../redux/hook";
import { setCredentials } from "../../redux/authRedux"; 

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
const InputContainer = styled.div`
  border: 1px solid gray;
  padding: 10px;
  align-items: center;
  display:flex;
  height:20px;
`
const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0px;
  border :none;
  &:focus {
      outline: none;
    }
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

interface RequestError{
  status:string;
  data: RequestErrorMessage;
}
interface RequestErrorMessage{
  message:string;
}

const Login = () => {
  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();
  const [showPassword,setShowPassword] = useState<boolean>(false);
  //const {data ,isLoading,isFetching }= useGetCartByIDQuery(user.user?._id!)
  // useEffect(() => {
  //   if(user!==null){
  //     console.log(user)
  //     const action = async()=>{
  //       const res = await getCart(user.user?._id!)
  //       console.log(res)
  //     }
  //     action()
  //   }
  // }, [dispatch])
  return (
    <Container>
      <Wrapper>
        {/* <button onClick={()=>testCookie()}>測試一下cookie</button> */}
        <Title>SIGN IN</Title>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={Yup.object({
            password: Yup.string()
              .min(8, 'Must be 8 characters or higher')
              .required(),
            email: Yup.string().email('Invalid email address').required(),
          })}
          onSubmit = {  async (values, actions) => {
                try{
                  const result = await login(values);
                  if("data" in result){
                    //console.log(result.data.data)
                    dispatch(setCredentials({user:result.data.data.findUser,token:result.data.data.cookie}))
                  }else{
                    const err = (result.error as RequestError).data.message
                    if(err.includes("password")){
                      actions.setErrors({password:err})
                    }else if(err.includes("Facebook")){
                      actions.setErrors({email:err})
                    }
                  }
                }catch(err){
                  console.log(err)
                } 
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
                <InputContainer>
                <Input
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  type="text"
                  name="email"
                  placeholder="Email"
                  data-testid="email"
                />
                </InputContainer>
                {errors.email && <Error data-testid="emailError">{errors.email}</Error>}

                <InputContainer>
                <Input
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  data-testid="password"
                />
                {showPassword ? <VisibilityOff onClick={()=>setShowPassword(false) }/> : <Visibility onClick={()=>setShowPassword(true) }/> }
                </InputContainer>
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
