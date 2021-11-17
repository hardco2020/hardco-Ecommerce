import { Add, Close, Remove } from "@material-ui/icons";
import React, { useEffect } from "react";
import styled from "styled-components";
import Announcement from "../../components/announcement/Announcement";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import Stripe from "../../components/stripe/Stripe";
import { usePutCartByIDMutation } from "../../redux/api";
import { addProductQuantity, deleteProduct, subProductQuantity } from "../../redux/cartRedux";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { mobile } from "../../responsive";


interface ButtonFilledProp {
  types?: string;
}
interface ProductColorProp {
  color: string;
}
interface TotalItemProp{
    types?:string;
}

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({padding:"10px"})};
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;

`;

const TopButton = styled.button<ButtonFilledProp>`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.types === "filled" && "none"};
  background-color: ${(props) =>
    props.types === "filled" ? "black" : "transparent"};
  color: ${(props) => props.types === "filled" && "white"};
`;
const TopTexts = styled.div`
  ${mobile({display:"none"})};
`;

const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;
const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({flexDirection:"column"})};
`;

const Info = styled.div`
  flex: 3;
`;
const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({flexDirection:"column"})};
`;
const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;
const ProductImgContainer = styled.div`
  width: 200px;
  height: 200px;
  display:flex;
  align-items: center;
  justify-content: center;
`
const Image = styled.img`
  width: 70%;
  height: 70%;
`;
const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;
const ProductName = styled.span``;
const ProductId = styled.span``;
const ProductColor = styled.div<ProductColorProp>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;
const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;
const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({margin:"5px 15px"})};
`;
const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({marginBottom:"20px"})};
`;

const DeleteDetail = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`
const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;
const Summary = styled.div`
  flex: 1;
  border:0.5px solid lightgray;
  border-radius : 10px;
  padding:20px;
  height:50vh;
`;

const SummaryTitle = styled.h1`
    font-weight: 200;

`
const SummaryItem = styled.div<TotalItemProp>`
    margin:30px 0px;
    display: flex;
    justify-content: space-between;
    font-weight: ${props=>props.types ==="total" && "500"};
    font-size: ${props=>props.types ==="total" && "24px" }
`
const SummaryItemText = styled.span``
const SummaryItemPrice = styled.span``


const Cart = () => {
  const user = useAppSelector(state=>state.auth);
  const cart = useAppSelector(state=>state.cart);
  const [putCartAction] = usePutCartByIDMutation();
  const dispatch = useAppDispatch();
  useEffect(() => {
    //只要動到dispatch就確認是否是登入 登入的話就使用rtk query 
    if (user.user!==null){
      const putCart = async() =>{
        //console.log(cart)
        const res = await putCartAction({id: user.user!._id!,cart:cart})
        console.log(res)
      }
      putCart()
    }
  }, [dispatch,cart])
  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <TopButton>CONTINUE SHOPPING</TopButton>
          <TopTexts>
            <TopText>Shopping Bag(2)</TopText>
            <TopText>Your Wishlist(0)</TopText>
          </TopTexts>
          <TopButton types="filled">CHECKOUT NOW</TopButton>
        </Top>
        <Bottom>
          <Info>
          {cart.products.map(product=>(
            <>
            <Product>
              <ProductDetail>
                <ProductImgContainer>
                <Image src={product.product.img}/>
                </ProductImgContainer>
                <Details>
                  <ProductName>
                    <b>Product:</b>{product.product.title}
                  </ProductName>
                  <ProductId>
                    <b>ID:</b>{product.product._id}
                  </ProductId>
                  <ProductColor color={product.product.color} />
                  <ProductSize>
                    <b>Size:</b>{product.product.size}
                  </ProductSize>
                </Details>
              </ProductDetail>
              <PriceDetail>
                <ProductAmountContainer>
                  <Add style={{cursor:"pointer"}} onClick={()=> dispatch(addProductQuantity(product))} />
                  <ProductAmount>{product.quantity}</ProductAmount>
                  <Remove  style={{cursor:"pointer"}} onClick={()=> dispatch(subProductQuantity(product))}  />
                </ProductAmountContainer>
                <ProductPrice>$ {product.product.price*product.quantity}</ProductPrice>
              </PriceDetail>
              <DeleteDetail>
                <Close style={{cursor:"pointer"}} onClick={()=> dispatch(deleteProduct(product))}/>
              </DeleteDetail>
            </Product>
            <Hr/> 
            </> 
          ))}

          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
                <SummaryItemText>Subtotal</SummaryItemText>
                <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
                <SummaryItemText>Estimated Shipping</SummaryItemText>
                <SummaryItemPrice>$ 5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
                <SummaryItemText>Shipping Discount</SummaryItemText>
                <SummaryItemPrice>$ -5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem types="total">
                <SummaryItemText>Total</SummaryItemText>
                <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <Stripe total={cart.total} disabled={cart.total===0}/>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
function putCartAction(arg0: { id: any; cart: import("../../redux/cartRedux").CartState; }) {
  throw new Error("Function not implemented.");
}

