import React from "react";
import styled from "styled-components";
import { Close, Search, ShoppingCartOutlined } from "@material-ui/icons";
import { Badge, Popover } from "@material-ui/core";
import { mobile } from "../../responsive";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { useAppSelector } from "../../redux/hook";

interface ColorProps {
    color: string;
  }
const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}
  display:flex;
  align-items: center;
  position: fixed;
  top: 0;
  z-index: 999;
  width: 100vw;
  background-color: white;
  box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
`;
const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;
const Language = styled.div`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;
const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;
const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`;
const Center = styled.div`
  flex: 1;
  text-align: center;
`;
const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 20px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const CartContainer = styled.div`
  display: flex;
  padding: 20px;
  width: 400px;
`;

const CartWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const CartTitleContainer = styled.div`
  display: flex;
  align-items: center;
`;
const CartTitleLeft = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-start;
`;
const CartTitle = styled.span`
  font-weight: bold;
  font-size: 20px;
`;
const CartTitleRight = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
`;
const CartPayButton = styled.button`
  background-color: black;
  color: white;
  padding: 5px;
  cursor:pointer;
`;
const CartLine = styled.hr`
  border: 1px solid black;
  margin: 10px 0px;
`;
const CartProductContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;
const CartSingleProductContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  justify-content: space-between;
`;
const CartProductImg = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  margin-right: 10px;
`;
const CartProductNameContainer = styled.div`
  display: flex;
  padding: 5px;
  width: 150px;
`;
const CartProductName = styled.span``;
const CartProductQuantityContainer = styled.div`
  flex:1;
  padding: 5px;
  display: flex;
  align-items: center;
`;
const CartProductColor = styled.div<ColorProps>`
  width: 30px;
  height: 30px; 
  background-color: ${(props) => props.color};
  cursor: pointer;
  display :flex;
  align-items: center;
`;
const CartProductQuantity = styled.span``;

const Navbar = () => {
  const cart = useAppSelector((state) => state.cart);
  const token = Cookies.get("Authorization");
  if (token !== undefined) {
    console.log(jwt_decode(token));
  }
  const [anchorEl, setAnchorEl] = React.useState<
    (EventTarget & HTMLDivElement) | null
  >(null);

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input placeholder="Search" />
            <Search style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer>
        </Left>
        <Center>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <Logo>Hardco.</Logo>
          </Link>
        </Center>
        <Right>
          {}
          <Link
            to="/register"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <MenuItem>REGISTER</MenuItem>
          </Link>
          <Link
            to="/login"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <MenuItem>SIGN IN</MenuItem>
          </Link>
          {/* <Link to="/cart" style={{ textDecoration: "none", color: "inherit" }}> */}
          <MenuItem aria-describedby={id} onClick={(e) => handleClick(e)}>
            <Badge badgeContent={cart.quantity} color="primary">
              <ShoppingCartOutlined />
            </Badge>
          </MenuItem>
          {/* </Link> */}
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
          >
            <CartContainer>
              <CartWrapper>
                <CartTitleContainer>
                  <CartTitleLeft>
                    <CartTitle>購物清單</CartTitle>
                  </CartTitleLeft>
                  <CartTitleRight>
                    <Link to="/cart" style={{ textDecoration: "none", color: "inherit" }}>
                        <CartPayButton >前往結賬</CartPayButton>
                    </Link>
                  </CartTitleRight>
                </CartTitleContainer>
                <CartLine />
                <CartProductContainer>
                  {cart &&
                    cart.products.map((c) => (
                      <CartSingleProductContainer key={c.product._id+c.product.color+c.product.size}>
                        <CartProductImg src={c.product.img} />
                        <CartProductNameContainer>
                          <CartProductName>{c.product.title}</CartProductName>
                        </CartProductNameContainer>
                        <CartProductQuantityContainer>
                          <CartProductQuantity>
                            +{c.quantity}
                          </CartProductQuantity>
                        </CartProductQuantityContainer>
                        <CartProductQuantityContainer>
                          <CartProductColor color={c.product.color} >
                          </CartProductColor>
                        </CartProductQuantityContainer>
                        <CartProductQuantityContainer>
                          <CartProductQuantity>
                            {c.product.size}
                          </CartProductQuantity>
                        </CartProductQuantityContainer>
                        <Close style={{ cursor: "pointer" }} />
                      </CartSingleProductContainer>
                    ))}
                </CartProductContainer>
              </CartWrapper>
            </CartContainer>
          </Popover>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
