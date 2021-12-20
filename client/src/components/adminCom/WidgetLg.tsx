import React from "react";
import styled from "styled-components";
import { Title } from "./Theme";
import { useGetNewOrderQuery } from "../../redux/api";
import { format} from 'timeago.js'

interface ButtonProp {
  status: string;
}
const Container = styled.div`
  flex: 3;
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
  /* text-align: left; */
`;
const User = styled.td`
  display: flex;
  align-items: center;
  font-weight: 600;
`;
const Username = styled.span`
  /* margin-left: 10px; */
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
  const { data, isError, isLoading } = useGetNewOrderQuery();
  return (
    <Container>
      <Title>Latest transactions</Title>
      <Table>
        <tbody>
        <Tr>
          <Th>Customer</Th>
          <Th>Date</Th>
          <Th>Amount</Th>
          <Th>Status</Th>
        </Tr>
        {isError ? (
          <>Oh no, there was an error</>
        ) : isLoading ? (
          <>Loading...</>
        ) : data ? (
          data.data.map((order) => (
        <Tr key={order._id}>
          <User>
            {/* <Avatar src="https://images.pexels.com/photos/4172933/pexels-photo-4172933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" /> */}
            <Username>{order.userId}</Username>
          </User>
          <Date>{format(order.createdAt)}</Date>
          <Amount>{order.total}</Amount>
          <Status>
            <Button status={order.status}>{order.status}</Button>
          </Status>
        </Tr>
          ))
        ) : null}
        </tbody>
      </Table>
    </Container>
  );
};

export default WidgetLg;
