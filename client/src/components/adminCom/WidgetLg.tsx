import React from "react";
import styled from "styled-components";
import { Avatar, Title } from "./Theme";

interface ButtonProp {
  status: "Approved" | "Declined" | "Pending";
}
const Container = styled.div`
  flex: 2;
  -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  padding: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-spacing: 20px;
`;

const Tr = styled.tr``;
const Th = styled.th`
  text-align: left;
`;
const User = styled.td`
  display: flex;
  align-items: center;
  font-weight: 600;
`;
const Username = styled.span`
  margin-left: 10px;
`;
const Date = styled.td`
  font-weight: 300;
`;
const Amount = styled.td`
  font-weight: 300;
`;
const Status = styled.td``;

const Button = styled.button<ButtonProp>`
  padding: 5px 7px;
  border: none;
  border-radius: 10px;
  background-color: ${(p) =>
    (p.status === "Approved" && "#e5faf2") ||
    (p.status === "Declined" && "#fff0f1") ||
    (p.status === "Pending" && "#ebf1fe")};
  color: ${(p) =>
    (p.status === "Approved" && "#3bb077") ||
    (p.status === "Declined" && "#d95087") ||
    (p.status === "Pending" && "#2a7ade")};
`;
const WidgetLg = () => {
  return (
    <Container>
      <Title>Latest transactions</Title>
      <Table>
        <Tr>
          <Th>Customer</Th>
          <Th>Date</Th>
          <Th>Amount</Th>
          <Th>Status</Th>
        </Tr>
        <Tr>
          <User>
            <Avatar src="https://images.pexels.com/photos/4172933/pexels-photo-4172933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" />
            <Username>Susan Carol</Username>
          </User>
          <Date>2 Jun 2021</Date>
          <Amount>$122.00</Amount>
          <Status>
            <Button status="Approved">Approved</Button>
          </Status>
        </Tr>
        <Tr>
          <User>
            <Avatar src="https://images.pexels.com/photos/4172933/pexels-photo-4172933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" />
            <Username>Susan Carol</Username>
          </User>
          <Date>2 Jun 2021</Date>
          <Amount>$122.00</Amount>
          <Status>
            <Button status="Declined">Declined</Button>
          </Status>
        </Tr>
        <Tr>
          <User>
            <Avatar src="https://images.pexels.com/photos/4172933/pexels-photo-4172933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" />
            <Username>Susan Carol</Username>
          </User>
          <Date>2 Jun 2021</Date>
          <Amount>$122.00</Amount>
          <Status>
            <Button status="Pending">Pending</Button>
          </Status>
        </Tr>
      </Table>
    </Container>
  );
};

export default WidgetLg;
