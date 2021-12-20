import React, { useRef, useState } from "react";
import styled from "styled-components";
import {
  Close,
  ExitToApp,
  Search,
  ShoppingCartOutlined,
  ShopTwo,
} from "@material-ui/icons";
import { Badge, Popover } from "@material-ui/core";
import { mobile } from "../../responsive";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { deleteProduct } from "../../redux/cartRedux";
import { PopoverCategory, ProductInterface } from "../../type/type";
import NavbarCategory from "../navbarCategory/NavbarCategory";
import { useSearchProductMutation } from "../../redux/api";
import CircularProgress from "@mui/material/CircularProgress";
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
  padding: 10px;
  position: relative;
`;
const SearchResultContainer = styled.div`
  position: absolute;
  top: 40px;
  left: 0px;
  padding: 15px;
  background-color: white;
  width: 260px;
  -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  border-radius: 10px;
  flex-direction: column;
`;

const SearchResultItemContainer = styled.div`
  display: flex;
  width: 260px;
  margin-bottom: 10px;
`;

const SearchResultWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 260px;
`;

const SearchResultTitleContainer = styled.div`
  display: flex;
  flex: 9;
  justify-content: flex-start;
`;
const SearchResultTitle = styled.span`
  margin-right: 10px;
`;
const SearchResultIcon = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
  &:focus {
    outline: none;
  }
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
  cursor: pointer;
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
  flex: 1;
  padding: 5px;
  display: flex;
  align-items: center;
`;
const CartProductColor = styled.div<ColorProps>`
  width: 30px;
  height: 30px;
  background-color: ${(props) => props.color};
  cursor: pointer;
  display: flex;
  align-items: center;
`;
const CartProductQuantity = styled.span``;

const CategoryData: PopoverCategory[] = [
  {
    Title: "Top",
    Category: [
      {
        name: "Suits",
      },
      {
        name: "Sweaters",
      },
      {
        name: "Hoodies",
      },
      {
        name: "T-shirt",
      },
      {
        name: "Polo Shirts",
      },
    ],
  },
  {
    Title: "Summer",
    Category: [
      {
        name: "Suits",
      },
      {
        name: "Pants",
      },
      {
        name: "T-shirt",
      },
      {
        name: "Polo Shirts",
      },
      {
        name: "Vests",
      },
    ],
  },
  {
    Title: "Winter",
    Category: [
      {
        name: "Sweaters",
      },
      {
        name: "Hoodies",
      },
      {
        name: "Vests",
      },
      {
        name: "Coats",
      },
    ],
  },
];

const Navbar = () => {
  const cart = useAppSelector((state) => state.cart);
  const user = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  // for shopping cart popover
  const [anchorEl, setAnchorEl] = useState<
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
  // for logout handling
  const handleLogout = () => {
    localStorage.removeItem("persist:root");
    window.location.reload();
  };

  const handleSearchOpen = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    e.preventDefault();
    setSearchOpen(true);
  };
  const handleSearchClose = (
    e: React.FocusEvent<HTMLInputElement, Element>
  ) => {
    e.preventDefault();
    setTimeout(() => {
      setSearchOpen(false);
    }, 500)
  };
  //for search popover
  const [searchOpen, setSearchOpen] = useState<boolean>();

  const [searchData, setSearchData] = useState<ProductInterface[]>([]);

  const [searchAPI, { isLoading: searchLoading, isError: searchError }] =
    useSearchProductMutation();
  const searchRef = useRef<HTMLInputElement | null>(null);
  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (searchRef !== undefined && searchRef !== null) {
      //should not be null
      const productName: string = searchRef.current?.value!;
      console.log(searchRef.current?.value);
      if (productName.trim() !== "") {
        const res = await searchAPI(productName).unwrap();
        console.log(res);
        setSearchData(res);
      } else {
        setSearchData([]);
      }
    }
    // const {data} = useSearchProductQuery()
  };
  console.log(searchData);
  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input
              placeholder="Search"
              onFocus={(e) => handleSearchOpen(e)}
              onChange={(e) => handleSearch(e)}
              onBlur= {(e)=>handleSearchClose(e)}
              ref={searchRef}
            />
            {searchLoading ? (
              <CircularProgress size="12px" />
            ) : (
              <Search style={{ color: "gray", fontSize: 16 }} />
            )}

            <SearchResultContainer
              style={searchOpen ? { display: "flex" } : { display: "none" }}
            >
              <SearchResultItemContainer>
                  <SearchResultWrapper>
                    <SearchResultTitleContainer>
                      <SearchResultTitle>See more on sale prodcuts!</SearchResultTitle>
                    </SearchResultTitleContainer>
                    <SearchResultIcon>
                      <ShopTwo />
                    </SearchResultIcon>
                  </SearchResultWrapper>
              </SearchResultItemContainer>
              {searchData.map((data) => (
                //TODO:
                //-[x]Add isLoading and Error for the result
                //-[x]Fix CSS error
                //-[x]Add extra info when not search
                <SearchResultItemContainer key={data._id}>
                  <Link to={"/product/"+data._id} style={{ textDecoration: "none", color: "inherit" }}>
                  <SearchResultWrapper>
                    <SearchResultTitleContainer>
                      <SearchResultTitle>{data.title}</SearchResultTitle>
                    </SearchResultTitleContainer>
                    <SearchResultIcon>
                      <Search />
                    </SearchResultIcon>
                  </SearchResultWrapper>
                  </Link>
                </SearchResultItemContainer>
              ))}
            </SearchResultContainer>
          </SearchContainer>

          <NavbarCategory CategoryData={CategoryData} CategoryName="Man" />
          <NavbarCategory CategoryData={CategoryData} CategoryName="Woman" />
        </Left>
        <Center>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <Logo>Hardco.</Logo>
          </Link>
        </Center>
        <Right>
          {user.user !== null ? (
            <>
              <MenuItem>Hello {user.user?.username} </MenuItem>{" "}
              <ExitToApp
                style={{ cursor: "pointer", marginLeft: "10px" }}
                onClick={() => handleLogout()}
              />
              <Link
                to="/order"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <MenuItem>Order</MenuItem>
              </Link>
            </>
          ) : (
            <>
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
            </>
          )}

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
                    <Link
                      to="/cart"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <CartPayButton>前往結賬</CartPayButton>
                    </Link>
                  </CartTitleRight>
                </CartTitleContainer>
                <CartLine />
                <CartProductContainer>
                  {cart &&
                    cart.products.map((c) => (
                      <CartSingleProductContainer
                        key={c.product._id + c.product.color + c.product.size}
                      >
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
                          <CartProductColor
                            color={c.product.color}
                          ></CartProductColor>
                        </CartProductQuantityContainer>
                        <CartProductQuantityContainer>
                          <CartProductQuantity>
                            {c.product.size}
                          </CartProductQuantity>
                        </CartProductQuantityContainer>
                        <Close
                          style={{ cursor: "pointer" }}
                          onClick={() => dispatch(deleteProduct(c))}
                        />
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
