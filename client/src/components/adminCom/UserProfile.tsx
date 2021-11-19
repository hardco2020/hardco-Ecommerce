import { CalendarToday, LocationSearching, MailOutline, PermIdentity, PhoneAndroid, Publish } from '@material-ui/icons'
import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Avatar } from './Theme'


const UserProfileContainer = styled.div`
    flex:4;
    padding:20px;
`
const TitleContainer = styled.div`
    display:flex;
    align-items: center;
    justify-content: space-between;
`
const Title = styled.h1``

const AddUserButton = styled.button`
    border:none;
    width:80px;
    padding:5px;
    border-radius: 5px;
    background-color: teal;
    cursor:pointer;
    color:white;
    font-size:16px;
`
const UserContainer = styled.div`
    display: flex;
    margin-top:20px;
`

const UserShow = styled.div`
    flex:1;
    padding:20px;
    -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
`
const UserShowTop = styled.div`
    display:flex;
    align-items: center;
`

const UserShowTopTitle = styled.div`
    display: flex;
    flex-direction: column;
    margin-left:20px;
`
const UserShowUsername = styled.span`
    font-weight: 600;
`

const UserShowUserTitle = styled.span`
    font-weight: 300;
`

const UserShowBottom = styled.div`
    margin-top:20px;
`

const UserShowBottomTitle = styled.span`
    font-size: 14px;
    font-weight: 600;
    color: rgb(175, 170, 170);
`
const UserShowInfoContainer = styled.div`
    display:flex;
    align-items: center;
    margin: 20px 0px;
    color: #444;
`
const Identity = styled(PermIdentity)`
    font-size:16px;
`

const Calendar = styled(CalendarToday)`
    font-size:16px;
`
const Phone = styled(PhoneAndroid)`
    font-size:16px;
`
const Mail = styled(MailOutline)`
    font-size:16px;
`
const Location = styled(LocationSearching)`
    font-size:16px;
`
const UserShowInfoTitle = styled.span`
    margin-left:10px;
`

const UserUpdate = styled.div`
    flex:2;
    padding:20px;
    -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    margin-left:20px;
`

const UserUpdateLeft = styled.div``

const UserUpdateImg = styled.img`
    width: 100px;
    height: 100px;
    border-radius: 10px;
    object-fit: cover;
    margin-right:20px;
`
const UserUpdateTitle = styled.span`
    font-size: 24px;
    font-weight: 600;
`

const UserUpdateForm = styled.form`
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
`
const UserUpdateItem = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 10px;
`
const UserUpdateLabel = styled.label`
    margin-bottom: 5px;
    font-size: 14px;
`
const UserUpdateInput = styled.input`
    border:none;
    width: 250px;
    height: 30px;
    border-bottom: 1px solid gray;
`
const UserUpdateRight = styled.div`
    display:flex;
    flex-direction: column;
    justify-content: space-between;
`
const UserUpdateUpload =styled.div`
    display:flex;
    align-items: center;
`
const UploadIcon = styled(Publish)`
    cursor:pointer;
`
const UserUpdateButton = styled.button`

    border:none;
    border-radius:5px;
    padding: 5px;
    cursor:pointer;
    background-color: darkblue;
    color:white;
    font-weight: 600;
`
const UserUpdateInputFile = styled.input``

const UserProfile = () => {
    return (
        <UserProfileContainer>
            <TitleContainer>
                <Title>Edit User</Title>
                <Link to="/admin/createuser">
                <AddUserButton>Create</AddUserButton>
                </Link>
            </TitleContainer>
            <UserContainer>
                <UserShow>
                    <UserShowTop>
                        <Avatar src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"/>
                        <UserShowTopTitle>
                            <UserShowUsername>Anna Becker</UserShowUsername>
                            <UserShowUserTitle>Software Engineer</UserShowUserTitle>
                        </UserShowTopTitle>
                    </UserShowTop>
                    <UserShowBottom>
                        <UserShowBottomTitle>Account Details</UserShowBottomTitle>
                        <UserShowInfoContainer>
                            <Identity/>
                            <UserShowInfoTitle>annebeck99</UserShowInfoTitle>
                        </UserShowInfoContainer>
                        <UserShowInfoContainer>
                            <Calendar/>
                            <UserShowInfoTitle>10.12.1999</UserShowInfoTitle>
                        </UserShowInfoContainer>
                        <UserShowBottomTitle>Contact Details</UserShowBottomTitle>
                        <UserShowInfoContainer>
                            <Phone/>
                            <UserShowInfoTitle>+1 123 456 67</UserShowInfoTitle>
                        </UserShowInfoContainer>
                        <UserShowInfoContainer>
                            <Mail/>
                            <UserShowInfoTitle>annabeck99@gmail.com</UserShowInfoTitle>
                        </UserShowInfoContainer>
                        <UserShowInfoContainer>
                            <Location/>
                            <UserShowInfoTitle>New York | USA</UserShowInfoTitle>
                        </UserShowInfoContainer>
                    </UserShowBottom>
                </UserShow>
                <UserUpdate>
                    <UserUpdateTitle>Edit</UserUpdateTitle>
                    <UserUpdateForm>
                        <UserUpdateLeft>
                            <UserUpdateItem>
                                <UserUpdateLabel>Username</UserUpdateLabel>
                                <UserUpdateInput type="text" placeholder="annebeck99" ></UserUpdateInput>
                            </UserUpdateItem>
                            <UserUpdateItem>
                                <UserUpdateLabel>Fullname</UserUpdateLabel>
                                <UserUpdateInput type="text" placeholder="Anna Becker" ></UserUpdateInput>
                            </UserUpdateItem>
                            <UserUpdateItem>
                                <UserUpdateLabel>Email</UserUpdateLabel>
                                <UserUpdateInput type="text" placeholder="annabeck99@gmail.com" ></UserUpdateInput>
                            </UserUpdateItem>
                            <UserUpdateItem>
                                <UserUpdateLabel>Phone</UserUpdateLabel>
                                <UserUpdateInput type="text" placeholder="+1 123 456 67" ></UserUpdateInput>
                            </UserUpdateItem>
                            <UserUpdateItem>
                                <UserUpdateLabel>Address</UserUpdateLabel>
                                <UserUpdateInput type="text" placeholder="New York | USA" ></UserUpdateInput>
                            </UserUpdateItem>
                        </UserUpdateLeft>
                        <UserUpdateRight>
                            <UserUpdateUpload>
                                <UserUpdateImg src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"/>
                                <UserUpdateLabel htmlFor="file"><UploadIcon/></UserUpdateLabel>
                                <UserUpdateInputFile type="file" id="file" style={{display:"none"}}/>
                            </UserUpdateUpload>
                            <UserUpdateButton>Update</UserUpdateButton>
                        </UserUpdateRight>
                    </UserUpdateForm>
                </UserUpdate>
            </UserContainer>
        </UserProfileContainer>
    )
}

export default UserProfile
