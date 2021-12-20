import { Visibility } from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
import { Avatar, Title } from "./Theme";
import { useGetNewUserQuery } from "../../redux/api";
const Container = styled.div`
  flex: 2;
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
  text-align:center;
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
  const { data, isError, isLoading } = useGetNewUserQuery();
  console.log(data);
  return (
    <Container>
      <Title>New Join Members</Title>
      <List>
        {isError ? (
          <>Oh no, there was an error</>
        ) : isLoading ? (
          <>Loading...</>
        ) : data ? (
          data.data.map((user) => (
            <ListItem key={user._id}>
              <Avatar src={user.img ||"https://i.imgur.com/HeIi0wU.png" }/>
              <User>
                <Username>{user.username}</Username>
                <UserTitle>{user.email}</UserTitle>
              </User>
              <Button>
                <MyVisibility />
                Display
              </Button>
            </ListItem>
          ))
        ) : null}
      </List>
    </Container>
  );
};

export default WidgetSm;
