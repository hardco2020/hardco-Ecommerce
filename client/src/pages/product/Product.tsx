import { Add, Remove } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { publicRequest } from "../../axiosURL";
import Announcement from "../../components/announcement/Announcement";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import Newsletter from "../../components/newsletter/Newsletter";
import { addProduct, CartSingleProdudctInterface } from "../../redux/cartRedux";
import { usePutCartByIDMutation } from "../../redux/api"
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { mobile } from "../../responsive";
import { ProductInterface, ProductResponse } from "../../type/type";
import Chatbot from '../../components/chatbot/Chatbot'
interface FilterColorProps {
  color: string;
}
const Container = styled.div``;
const Wrapper = styled.div`
  display: flex;
  padding: 50px;
  ${mobile({ flexDirection: "column", padding: "10px" })};
`;
const ImgContainer = styled.div`
  flex: 1;
`;
const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
  ${mobile({ height: "40vh" })};
`;
const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })};
`;
const Title = styled.h1`
  font-weight: 500;
`;
const Desc = styled.div`
  margin: 20px 0px;
`;
const Price = styled.div`
  font-weight: 100;
  font-size: 40px;
`;

const Line = styled.hr`
    margin: 20px 0px;
    border-top: 2px solid black;
`
const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  flex-direction: column;
  align-items: space-between;
  justify-content: space-between;
  ${mobile({ width: "100%" })};
`;
const Filter = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;
const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 500;
  margin-right:10px;
`;
const FilterColor = styled.div<FilterColorProps>`
  width: 30px;
  height: 30px; 
  background-color: ${(props) => props.color};
  margin: 0px 10px;
  cursor: pointer;
  display :flex;
  align-items: center;
`;
const FilterColorSelected = styled.div<FilterColorProps>`
  width: 30px;
  height: 30px; 
  background-color: ${(props) => props.color};
  margin: 0px 10px;
  cursor: pointer;
  display :flex;
  align-items: center;
  border: 3px solid black;
`;
const FilterSizeDiv = styled.div`
  width: 20px;
  height: 20px;
  margin: 0px 10px;
  cursor: pointer;
  display:flex;
  align-items: center;
  border : 2px solid lightgray;
  justify-content: center;
  border-radius : 5px;
  padding:5px 10px;
`;
const FilterSizeDivSelected = styled.div`
  width: 20px;
  height: 20px;
  margin: 0px 10px;
  cursor: pointer;
  display:flex;
  align-items: center;
  border : 3px solid black;
  justify-content: center;
  border-radius : 5px;
  padding:5px 10px;
`;
// const FilterSize = styled.select`
//   margin-left: 10px;
//   padding: 5px;
// `;
// const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  display: flex;
  align-items: center;
  width: 50%;
  justify-content: space-between;
  ${mobile({ width: "100%" })};
`;
const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;
const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;
const Button = styled.button`
  padding: 15px;
  border: 1px solid teal;
  background-color: black;
  color:white;
  cursor: pointer;
  font-weight: 500;
`;
const Product = () => {
  const location = useLocation();
  const cart = useAppSelector(state=>state.cart);
  const user = useAppSelector(state=>state.auth);
  const [putCartAction] = usePutCartByIDMutation();
  const productId = location.pathname.split("/")[2];
  const [product, setProduct] = useState<ProductInterface>();
  const [quantity, setQuantity] = useState<number>(1);
  const [color, setColor] = useState<string>();
  const [size, setSize] = useState<string>();
  //Redux----------------
  const dispatch = useAppDispatch();
  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get<ProductResponse>(
          `/products/${productId}`
        );
        setProduct(res.data.data);
      } catch (err) {}
    };
    getProduct();
  }, [productId]);

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

  const handleQuantity = (type: string) => {
    if(type === "dec"){
        quantity > 1 && setQuantity(quantity-1)
    }
    if(type === "inc"){
        setQuantity(quantity+1)
    }
  }
  const handleClick = async ()=>{
    let singleProduct:CartSingleProdudctInterface;
    if(product && color && size){
        singleProduct= { ...product,color,size}
        await dispatch(addProduct({product:singleProduct,quantity}))
    }
    //   product&& color && size  && dispatch(addProduct({singleProduct,quantity}))
  }


  return (
    <Container>
      <Navbar />
      <Announcement />
      {product && (
        <Wrapper key={product._id}>
          <ImgContainer>
            <Image src={product.img} />
          </ImgContainer>
          <InfoContainer>
            <Title>{product.title}</Title>
            <Desc>{product.desc}</Desc>
            <Price>$ {product.price}</Price>
            <Line></Line>
            <FilterContainer>
              <Filter>
                <FilterTitle>Color</FilterTitle>
                {product.color?.map((c) => (
                  color ===c  ? <FilterColorSelected color={c} key={c} onClick={()=>setColor(c)} />
                             :<FilterColor color={c} key={c} onClick={()=>setColor(c)} />
                ))}
              </Filter>
              <Filter>
                <FilterTitle>Size </FilterTitle>
                {product.size?.map((s) => (
                    size === s ? <FilterSizeDivSelected onClick={()=>setSize(s) } key={s} >{s}</FilterSizeDivSelected>
                                : <FilterSizeDiv onClick={()=>setSize(s)} key={s} >{s}</FilterSizeDiv>
                ))}
              </Filter>
              {/* <Filter>
                <FilterTitle>Size</FilterTitle>
                <FilterSize onChange={(e)=>setSize(e.target.value)}>
                  {product.size?.map((s) => (
                    <FilterSizeOption>{s}</FilterSizeOption>
                  ))}
                </FilterSize>
              </Filter> */}
            </FilterContainer>
            <AddContainer>
              <FilterTitle>數量</FilterTitle>
              <AmountContainer>
                <Remove onClick={()=>handleQuantity("dec")} style={{cursor:"pointer"}}/>
                <Amount>{quantity}</Amount>
                <Add onClick={()=>handleQuantity("inc")} style={{cursor:"pointer"}} />
              </AmountContainer>
              <Button 
                disabled={!color || !size}
                onClick={()=>handleClick()}>ADD TO CART</Button>
            </AddContainer>
          </InfoContainer>
        </Wrapper>
      )}
      <Newsletter />
      <Chatbot/>
      <Footer />
    </Container>
  );
};

export default Product;
