import React from "react";
import styled from "styled-components";
import { categories } from "../../data";
import { mobile } from "../../responsive";
import CategoryItem from "../categoryItem/CategoryItem";
const Container = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
  ${mobile({ padding: "0px", flexDirection: "column" })};
`;
export default function Categories() {
  return (
    <Container role="CategoriesContainer">
      {categories.map((item) => (
        <CategoryItem item={item} key={item.id} />
      ))}
    </Container>
  );
}
