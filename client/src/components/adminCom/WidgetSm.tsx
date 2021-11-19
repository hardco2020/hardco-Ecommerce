import { Visibility } from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
import { Avatar, Title } from "./Theme";

const Container = styled.div`
  flex: 1;
  -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  padding: 20px;
  margin-right: 20px;
`;
const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const ListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 20px 0px;
`;

const User = styled.div`
  display: flex;
  flex-direction: column;
`;
const Username = styled.span`
  font-weight: 600;
`;
const UserTitle = styled.span`
  font-weight: 300;
`;
const Button = styled.button`
  display: flex;
  align-items: center;
  border-radius: 10px;
  border: none;
  padding: 7px 10px;
  background-color: #eeeef7;
  color: #555;
  cursor: pointer;
`;
const MyVisibility = styled(Visibility)`
  font-size: 16px;
  margin-right: 5px;
`;

const WidgetSm = () => {
  return (
    <Container>
      <Title>New Join Members</Title>
      <List>
        <ListItem>
          <Avatar src="https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&dpr=2&w=500" />
          <User>
            <Username>Anaa Keller</Username>
            <UserTitle>Software Engineer</UserTitle>
          </User>
          <Button>
            <MyVisibility />
            Display
          </Button>
        </ListItem>
        <ListItem>
          <Avatar src="https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&dpr=2&w=500" />
          <User>
            <Username>Anaa Keller</Username>
            <UserTitle>Software Engineer</UserTitle>
          </User>
          <Button>
            <MyVisibility />
            Display
          </Button>
        </ListItem>
        <ListItem>
          <Avatar src="https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&dpr=2&w=500" />
          <User>
            <Username>Anaa Keller</Username>
            <UserTitle>Software Engineer</UserTitle>
          </User>
          <Button>
            <MyVisibility />
            Display
          </Button>
        </ListItem>
        <ListItem>
          <Avatar src="https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&dpr=2&w=500" />
          <User>
            <Username>Anaa Keller</Username>
            <UserTitle>Software Engineer</UserTitle>
          </User>
          <Button>
            <MyVisibility />
            Display
          </Button>
        </ListItem>
        <ListItem>
          <Avatar src="https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&dpr=2&w=500" />
          <User>
            <Username>Anaa Keller</Username>
            <UserTitle>Software Engineer</UserTitle>
          </User>
          <Button>
            <MyVisibility />
            Display
          </Button>
        </ListItem>
      </List>
    </Container>
  );
};

export default WidgetSm;
