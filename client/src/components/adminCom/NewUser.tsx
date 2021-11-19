import React from 'react'
import styled from 'styled-components'
import { Container } from './Theme'

const Title = styled.h1`
`

const UserForm = styled.form`
    display:flex;
    flex-wrap:wrap;
`

const UserItem = styled.div`
    width: 500px;
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    margin-right: 20px;
`

const Userlabel = styled.label`
    margin-bottom: 10px;
    font-size: 14px;
    font-weight: 600;
    color: rgb(151,150,150);
`



const UserInput = styled.input`
    height: 20px;
    padding:10px;
    border:1px solid gray;
    border-radius:5px;
`

const UserGender = styled.div`

`
const UserGenderInput = styled.input`
    margin-top: 15px;
    
`
const InputLabel = styled.label`
    margin: 10px;
    font-size: 18px;
    color:#555;
`

const UserSelect = styled.select`
    height: 40px;
    border-radius: 5px;
    padding:0px 10px;
`

const UserOption = styled.option``

const UserCreateButton = styled.button`
    width: 200px;
    border:none;
    background-color: darkblue;
    color:white;
    padding:7px 10px;
    font-weight: 600;
    border-radius: 10px;
    margin-top: 30px;
    cursor: pointer;
`

const NewUser = () => {
    return (
        <Container>
            <Title>New User</Title>
            <UserForm>
                <UserItem>
                    <Userlabel>Username</Userlabel>
                    <UserInput type="text" placeholder="john"/>
                </UserItem>
                <UserItem>
                    <Userlabel>Full Name</Userlabel>
                    <UserInput type="text" placeholder="John Smith"/>
                </UserItem>
                <UserItem>
                    <Userlabel>Email</Userlabel>
                    <UserInput type="email" placeholder="john@gmail.com"/>
                </UserItem>
                <UserItem>
                    <Userlabel>Password</Userlabel>
                    <UserInput type="password" placeholder="password"/>
                </UserItem>
                <UserItem>
                    <Userlabel>Phone</Userlabel>
                    <UserInput type="text" placeholder="+1 123 456 78"/>
                </UserItem>
                <UserItem>
                    <Userlabel>Address</Userlabel>
                    <UserInput type="text" placeholder="New York | USA"/>
                </UserItem>
                <UserItem>
                    <Userlabel>Gender</Userlabel>
                    <UserGender>
                    <UserGenderInput type="radio" name="gender" id="male" value="male"/>
                    <InputLabel htmlFor="male">Male</InputLabel>
                    <UserGenderInput type="radio" name="gender" id="female" value="female"/>
                    <InputLabel htmlFor="female">Female</InputLabel>
                    <UserGenderInput type="radio" name="gender" id="other" value="other"/>
                    <InputLabel htmlFor="other">Other</InputLabel>
                    </UserGender>
                </UserItem>
                <UserItem>
                    <Userlabel>Active</Userlabel>
                    <UserSelect name="active" id="active">
                        <UserOption value="yes">Yes</UserOption>
                        <UserOption value="no">No</UserOption>
                    </UserSelect>

                </UserItem>
                <UserCreateButton>Create</UserCreateButton>
            </UserForm>
        </Container>
    )
}

export default NewUser
