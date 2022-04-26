import React from "react";
import styled from "styled-components";
import errorPage from "../../assets/error2.png";
const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;
const Img = styled.img`
  outline: none;
`;
const Error = () => {
  return (
    <Center role="container">
      <Img src={errorPage} alt="" />
    </Center>
  );
};

export default Error;
