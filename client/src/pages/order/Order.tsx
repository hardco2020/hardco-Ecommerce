import React from "react";
import styled from "styled-components";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import Newsletter from "../../components/newsletter/Newsletter";
import OrderDetail from "../../components/orderDetail/OrderDetail";
import { useGetOrderByIdQuery } from "../../redux/api";
import { useAppSelector } from "../../redux/hook";
import Chatbot from '../../components/chatbot/Chatbot'

const Container = styled.div`
  flex: 1;
  margin: 5px;
  padding-top: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
`;

const Order = () => {
  const userId = useAppSelector((state) => state.auth.user?._id)!;
  const { data, isLoading, isError } = useGetOrderByIdQuery(userId, {
    skip: !userId,
  });
  return (
    <>
      <Navbar />
      <Container>
        {isError ? (
          <>There's something wrong</>
        ) : isLoading ? (
          <>Loading</>
        ) : data &&
          data.length > 1  ? (
          data.map((item) => <OrderDetail order={item} key={item._id} />)
        ) : (
          <> There's no order</>
        )}
      </Container>
      <Newsletter />
      <Chatbot/>
      <Footer />
    </>
  );
};

export default Order;
