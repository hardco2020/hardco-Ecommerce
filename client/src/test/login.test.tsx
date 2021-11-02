import React from 'react';
import { Matcher, MatcherOptions, render, waitFor } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect"
import Login from '../pages/login/Login'
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

//login 
//wrong format should be stopped 
let getByTestId: (text: Matcher, options?: MatcherOptions | undefined, waitForElementOptions?: unknown) => HTMLElement
let queryByTestId: (text: Matcher, options?: MatcherOptions | undefined, waitForElementOptions?: unknown) => HTMLElement | null

beforeEach(()=>{
    ({ getByTestId,queryByTestId } = render(
        <BrowserRouter>
            <Login/>
        </BrowserRouter>,
    ));
})


test('should render all form field with blank', async ()=>{
    const emailField = getByTestId("email")
    const passwordField = getByTestId("password")
    expect(emailField.getAttribute('value')).toBe('')
    expect(passwordField.getAttribute('value')).toBe('')
})

test('should show error when input invalid info',async () =>{
    // const { getByTestId } = render(
    //     <BrowserRouter>
    //         <Login/>
    //     </BrowserRouter>,
    // )
    const emailField = getByTestId("email")
    const passwordField = getByTestId("password")
    userEvent.type(emailField, 'john.deesemail.com')
    userEvent.type(passwordField,'123456')
    
    await waitFor(() =>{
        const emailError = getByTestId("emailError")
        const passwordError = getByTestId('passwordError')
        expect(emailError).toHaveTextContent('Invalid email address')
        expect(passwordError).toHaveTextContent('Must be 8 characters or higher')
    });
})

test('should hide error when input right info', async () =>{
    // const { getByTestId, queryByTestId } = render(
    //     <BrowserRouter>
    //         <Login/>
    //     </BrowserRouter>,
    // )
    userEvent.click(getByTestId("submit"))
    const emailField = getByTestId("email")
    const passwordField = getByTestId("password")
    userEvent.type(emailField, 'john3343@gmail.com')
    userEvent.type(passwordField,'123456789')

    await waitFor(() =>{
        expect(queryByTestId("emailError")).toBe(null)
        expect(queryByTestId('passwordError')).toBe(null)
    });
})


const url = process.env.REACT_APP_API_URL || 'http://localhost:3001'


interface LoginRequestBody {
    email : string;
    password: string;
}

const rightEmail = "school15947@gmail.com"
const rightPassword = "wearelose"
const facebookEmail = "facebook@gmail.com"

const server = setupServer(
    rest.post<LoginRequestBody>(url+'/login',(req,res,ctx)=>{
        const { email,password } = req.body
        console.log(email);
        if(email === facebookEmail){
            return res(
                ctx.status(409),
                ctx.json({
                    message: "Your email already registered a Facebook account, please sign in with Facebook"
                })
            )
        }
        else if(email !== rightEmail){
            return res(
                ctx.status(409),
                ctx.json({
                    message: "You're email not found"
                })
            )
        }
        else if(password !== rightPassword){
            return res(
                ctx.status(409),
                ctx.json({
                    message: "wrong password"
                })
            )
        }
    })
)


describe('should return database-related message when click on submit button with info',()=>{  
    beforeAll(()=>{
        server.listen();
    });
    beforeEach(()=>{
        server.resetHandlers();
    })
    afterAll(()=>{
        server.close();
    });

    it('when input none existing email',async()=>{
        const emailField = getByTestId("email")
        const passwordField = getByTestId("password")
        userEvent.type(emailField, 'john3343@gmail.com')
        userEvent.type(passwordField,'123456789')
        userEvent.click(getByTestId("submit"))
        await waitFor(() =>{
            expect(queryByTestId('emailError')).toHaveTextContent("You're email")
        });

    })
    it('when input wrong password',async()=>{
        const emailField = getByTestId("email")
        const passwordField = getByTestId("password")
        userEvent.type(emailField, 'school15947@gmail.com')
        userEvent.type(passwordField,'123456789')
        userEvent.click(getByTestId("submit"))
        await waitFor(() =>{
            expect(queryByTestId('passwordError')).toHaveTextContent("wrong password")
        });
    })
    it('when input exist facebook account',async()=>{
        const emailField = getByTestId("email")
        const passwordField = getByTestId("password")
        userEvent.type(emailField, 'facebook@gmail.com')
        userEvent.type(passwordField,'wearelose')
        userEvent.click(getByTestId("submit"))
        await waitFor(() =>{
            expect(queryByTestId('emailError')).toHaveTextContent("Facebook")
        });
    })
    // it('when input right info',async()=>{
      
    // })
})

// test('should submit form when clicking on the submit button', async () => {
//     const { getByTestId } = render(
//         <BrowserRouter>
//             <Login/>
//         </BrowserRouter>,
//     )
//     const submitLogin = jest.fn()
  
//     userEvent.type(getByTestId("email"), 'john.dee@someemail.com')
//     userEvent.type(getByTestId("password"), 'test12345')  
//     userEvent.click(getByTestId("submit"))
  
//     await waitFor(() =>
//       expect(submitLogin).toHaveBeenCalledWith({
//         email: 'john.dee@someemail.com',
//         password: 'test12345'
//       }),
//     )
// })
