import { Facebook, Instagram, MailOutline, Phone, Pinterest, Room, Twitter } from '@material-ui/icons'
import React from 'react'
import styled from 'styled-components'
import { mobile } from '../../responsive'

interface SoicalIconColor{
    color:string;
}

const Container = styled.div`
    display: flex;
    ${mobile({flexDirection:"column"})};
    
`
const Left = styled.div`
    flex:1;
    display:flex;
    flex-direction: column;
    padding: 20px;
`
const Logo = styled.h1`
`
const Desc = styled.p`
    margin:20px 0px;
`
const SocialContainer = styled.div`
    display: flex;
`
const SocialIcon = styled.div<SoicalIconColor>`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: #${props=>props.color};
    display:flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
`
const Center = styled.div`
    flex:1;
    padding:20px;
    ${mobile({display:"none"})};
`
const Title = styled.h3`
    margin-bottom: 20px;
    font-size:30px;
    font-family: 'Urbanist', sans-serif;
`
const List = styled.ul`
    margin:0;
    padding: 0;
    list-style:none;
    display: flex;
    flex-wrap:wrap;
    font-size:20px;
    font-family: 'Urbanist', sans-serif !important;
`
const ListItem = styled.li`
    width: 50%;
    margin-bottom: 10px;
    font-family: 'Urbanist', sans-serif !important;
    cursor:pointer;
`
const Right = styled.div`
    flex:1;
    padding:20px;
    ${mobile({backgroundColor:"#fff8f8"})};
`

const ContactItem = styled.div`
    font-family: 'Urbanist', sans-serif !important;
    margin-bottom: 20px;
    display:flex;
    align-items:center;
`
const Payment = styled.img`
    width:50%;
`

const Footer = () => {
    return (
        <Container>
            <Left>
                <Logo>HardCo.</Logo>
                <Desc>
                There are many variations of products available, if you 
                want to have the best buying experience , you must buy at hardco-ecommerce
                Their are a lot of products on sale now. Let's see it !                    
                </Desc>
                <SocialContainer>
                    <SocialIcon color="3B5999">
                        <Facebook style={{fontSize:"2.5em"}}/>
                    </SocialIcon >
                    <SocialIcon color="E4405F">
                        <Instagram style={{fontSize:"2.5em"}}/>
                    </SocialIcon>
                    <SocialIcon color="55ACEE">
                        <Twitter style={{fontSize:"2.5em"}}/>
                    </SocialIcon >
                    <SocialIcon color="E60023">
                        <Pinterest style={{fontSize:"2.5em"}}/>
                    </SocialIcon>
                </SocialContainer>

            </Left>

            <Center>
                <Title>Useful Links</Title>
                <List>
                    <ListItem>Home</ListItem>
                    <ListItem>Cart</ListItem>
                    <ListItem>Man Fashion</ListItem>
                    <ListItem>Woman Fashion</ListItem>
                    <ListItem>Accessories</ListItem>
                    <ListItem>My Account</ListItem>
                    <ListItem>Order Tracking</ListItem>
                    <ListItem>Wishlist</ListItem>
                    <ListItem>Wishlist</ListItem>
                    <ListItem>Terms</ListItem>
                </List>
            </Center>
            <Right>
                <Title>Contact</Title>
                <ContactItem>
                <Room style={{marginRight:"10px"}}/> 622 Dixie Path , South Tobinchester 98336
                </ContactItem>
                <ContactItem>
                <Phone style={{marginRight:"10px"}}/> +1 234 56 78
                </ContactItem>
                <ContactItem>
                <MailOutline style={{marginRight:"10px"}} /> contact@lama.dev
                </ContactItem>
                <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
            </Right>
        </Container>
    )
}

export default Footer
