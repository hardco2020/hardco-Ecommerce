import {
  FavoriteBorderOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@material-ui/icons";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ProductInterface } from "../../type/type";

const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;
type ProductProp = {
  imgUrl: string;
};
const Container = styled.div<ProductProp>`
  flex: 1;
  margin: 5px;
  min-width: 280px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url(${(props) => props.imgUrl});
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
  border: solid 1px;

  &:hover ${Info} {
    opacity: 1;
  }
`;
const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
`;

const Image = styled.img`
  height: 75%;
  z-index: 2;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;

export interface ProductItemProp {
  item: ProductInterface;
}
const ProductItem = ({ item }: ProductItemProp) => {
  return (
    <Container data-testid="productContainer" imgUrl={item.img}>
      {/* <Circle/> */}
      {/* <Image src={item.img} /> */}
      <Info data-testid="productInfo">
        <Icon data-testid="productIcon">
          <ShoppingCartOutlined />
        </Icon>
        <Link
          to={`/product/${item._id}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Icon>
            <SearchOutlined />
          </Icon>
        </Link>
        <Icon>
          <FavoriteBorderOutlined />
        </Icon>
      </Info>
    </Container>
  );
};

export default ProductItem;
