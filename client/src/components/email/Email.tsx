import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Close } from "@material-ui/icons";

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const Info = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Title = styled.h1`
  color: white;
  margin-bottom: 20px;
`;
const Button = styled.button`
  border: none;
  padding: 10px;
  background-color: white;
  color: gray;
  cursor: pointer;
`;
const ImgContainer = styled.div`
  display: flex;
  position: relative;
`;
const Container = styled.div`
  width: 600px;
  display: flex;
  align-items: center;
  flex-direction: column;
`;
const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;
const Logo = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  margin-right: 10px;
`;
const LogoTitle = styled.h1``;
const LineContainer = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 10px;
`;
const Line = styled.hr`
  flex-grow: 1;
  border-top: 1px solid lightgray;
`;
const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
`;
const ContactContainer = styled.div`
  display: flex;
  padding: 10px;
  align-items: center;
`;

interface EmailProp {
  handleClose: () => void;
}
const Email = ({ handleClose }: EmailProp) => {
  return (
    <Container>
      <TitleContainer>
        <Logo src="https://i.imgur.com/IkMtJPR.png" />
        <LogoTitle role="logoTitle">HardoCo-Ecommerce</LogoTitle>
        <Close
          data-testid="close"
          onClick={handleClose}
          style={{ cursor: "pointer" }}
        />
      </TitleContainer>
      <LineContainer>
        <Line />
      </LineContainer>
      <ContentContainer>
        <span>
          Hey <b>User</b>
        </span>
        <br></br>
        <br></br>
        <span>
          Thank you for subscribing to <b>HardCo-Ecommerce</b>
        </span>
        <br></br>
        <br></br>
        Here are our newtest products for you to follow!
        <br></br>
        <br></br>
        <ImgContainer>
          <Link to={`products/shirts`}>
            <Image src="https://images.pexels.com/photos/5886041/pexels-photo-5886041.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" />
            <Info>
              <Title>SHIRT STYLE!</Title>

              <Button>SHOP NOW</Button>
            </Info>
          </Link>
        </ImgContainer>
      </ContentContainer>
      <LineContainer>
        <Line />
      </LineContainer>
      <ContactContainer>
        <Logo src="https://i.imgur.com/IkMtJPR.png" />
        <span>
          If There's any problem,please contact <b>HardcoEcommerce</b>
        </span>
      </ContactContainer>
    </Container>
  );
};

export default Email;
