import { Matcher, MatcherOptions, render, waitFor } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect"
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import Register from '../pages/register/Register';

let getByTestId: (text: Matcher, options?: MatcherOptions | undefined, waitForElementOptions?: unknown) => HTMLElement
let queryByTestId: (text: Matcher, options?: MatcherOptions | undefined, waitForElementOptions?: unknown) => HTMLElement | null

beforeEach(()=>{
    ({ getByTestId,queryByTestId } = render(
        <BrowserRouter>
            <Register/>
        </BrowserRouter>,
    ));
})
//要render所有的項目
//內部
//使用者username長度限制
//使用者password長度限制
//使用者account email處理
//使用者confirm password的部分要做確認
//外部
//使用者輸入已被註冊的帳號時要回傳錯誤
test('Should Render all the field',async ()=>{
    expect(getByTestId('usernameField').getAttribute('value')).toBe('')
    expect(getByTestId('emailField').getAttribute('value')).toBe('')
    expect(getByTestId('passwordField').getAttribute('value')).toBe('')
    expect(getByTestId('confirmPasswordField').getAttribute('value')).toBe('')
});

test('Should return error validation when input wrong info', async () =>{
    //username can't pass more than 6 word
    userEvent.type(getByTestId('usernameField'),"六五四三二一七");
    await waitFor(()=>{
        expect(queryByTestId('usernameError')).toHaveTextContent('Must be 6 characters or lower');
    });
    //email should be email 
    userEvent.type(getByTestId('emailField'),"dfdjfkdf");
    await waitFor(()=>{
        expect(queryByTestId('emailError')).toHaveTextContent('Invalid email address');
    });
    //password length should be more than eight
    userEvent.type(getByTestId('passwordField'),"1234567");
    await waitFor(()=>{
        expect(queryByTestId('passwordError')).toHaveTextContent("Must be 8 characters or highe");
    });
    //confirm password should be same as the password
    userEvent.type(getByTestId('confirmPasswordField'),"123456");
    await waitFor(()=>{
        expect(queryByTestId('confirmPasswordError')).toHaveTextContent("Passwords must match");
    });
});

const url = process.env.REACT_APP_API_URL || 'http://localhost:3001'


interface SignupRequestBody {
    email : string;
    password: string;
    username: string;
}

const repeatEmail = "school15947@gmail.com"
const facebookEmail = "facebook@gmail.com"
const server = setupServer(
    rest.post<SignupRequestBody>(url+'/signup',(req,res,ctx)=>{
        const { email } = req.body
        if(email === facebookEmail){
            return res(
                ctx.status(409),
                ctx.json({
                    message: "Your email already registered a Facebook account, please sign in with Facebook"
                })
            )
        }
        else if(email === repeatEmail){
            return res(
                ctx.status(409),
                ctx.json({
                    message: "Your email has already been registered"
                })
            )
        }
    })
)

describe('Should return database-related message when click on submit button with info',()=>{  
    beforeAll(()=>{
        server.listen();
    });
    beforeEach(()=>{
        server.resetHandlers();
    })
    afterAll(()=>{
        server.close();
    });

    test('when input existing email',async()=>{
        // const emailField = getByTestId("emailField");
        // const usernameField = getByTestId("usernameField");
        // const passwordField = getByTestId("passwordField");
        // const confirmPasswordField = getByTestId("confirmPasswordField");
        userEvent.type(getByTestId("emailField"), 'school15947@gmail.com')
        userEvent.type(getByTestId("usernameField"),'測試帳號')
        userEvent.type(getByTestId("passwordField"),'123456789')
        userEvent.type(getByTestId("confirmPasswordField"),'123456789')
        userEvent.click(getByTestId("submit"))
        await waitFor(() =>{
            expect(queryByTestId('emailError')).toHaveTextContent("Your email has already been registered");
        });

    })
    test('when input Facebook existing email',async()=>{
        userEvent.type(getByTestId("emailField"), 'facebook@gmail.com')
        userEvent.type(getByTestId("usernameField"),'測試帳號')
        userEvent.type(getByTestId("passwordField"),'123456789')
        userEvent.type(getByTestId("confirmPasswordField"),'123456789')
        userEvent.click(getByTestId("submit"))
        await waitFor(() =>{
            expect(queryByTestId('emailError')).toHaveTextContent("Your email already registered a Facebook account, please sign in with Facebook");
        });

    })
    
});