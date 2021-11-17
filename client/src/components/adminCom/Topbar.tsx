import { Language, NotificationsNone, Settings } from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
const TopbarContainer = styled.div`
  width: 100%;
  height: 50px;
  background-color: white;
  position: sticky;
  top: 0;
`;
const TopbarWrapper = styled.div`
  height: 100%;
  padding: 0px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const TopbarLeft = styled.div``;

const TopbarRight = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.span`
  cursor: pointer;
  font-size: 30px;
  font-weight: bold;
  color: darkblue;
`;
const IconContainer = styled.div`
  position: relative;
  cursor: pointer;
  margin-right: 10px;
  color: #555;
`;
const IconBadge = styled.span`
  width: 15px;
  position: absolute;
  top: -5px;
  right: 0px;
  background-color: red;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
`;
const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
`;
const Topbar = () => {
  return (
    <TopbarContainer>
      <TopbarWrapper>
        <TopbarLeft>
          <Logo>HardCo.Admin</Logo>
        </TopbarLeft>
        <TopbarRight>
          <IconContainer>
            <NotificationsNone />
            <IconBadge>2</IconBadge>
          </IconContainer>
          <IconContainer>
            <Language />
          </IconContainer>
          <IconContainer>
            <Settings />
          </IconContainer>
          <Avatar src="https://i.imgur.com/HeIi0wU.png" />
        </TopbarRight>
      </TopbarWrapper>
    </TopbarContainer>
  );
};

export default Topbar;
