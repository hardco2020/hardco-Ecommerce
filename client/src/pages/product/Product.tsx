import { Add, Remove } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { publicRequest } from "../../axiosURL";
import Announcement from "../../components/announcement/Announcement";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import Newsletter from "../../components/newsletter/Newsletter";
import { mobile } from "../../responsive";
import { Product as ProductInterface, ProductResponse } from "../../type/type";
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
  font-weight: 200;
`;
const Desc = styled.div`
  margin: 20px 0px;
`;
const Price = styled.div`
  font-weight: 100;
  font-size: 40px;
`;
const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: "100%" })};
`;
const Filter = styled.div`
  display: flex;
  align-items: center;
`;
const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;
const FilterColor = styled.div<FilterColorProps>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
`;
const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;
const FilterSizeOption = styled.option``;

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
  background-color: white;
  cursor: pointer;
  font-weight: 500;
`;
const Product = () => {
  const location = useLocation();
  const productId = location.pathname.split("/")[2];
  const [product, setProduct] = useState<ProductInterface>();
  const [quantity, setQuantity] = useState<number>(1);
  const [color, setColor] = useState<string>();
  const [size, setSize] = useState<string>();
  console.log(color,size);
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

  const handleQuantity = (type: string) => {
    if(type === "dec"){
        quantity > 1 && setQuantity(quantity-1)
    }
    if(type === "inc"){
        setQuantity(quantity+1)
    }
  }
  const handleClick = ()=>{
      //update cart
  }

  return (
    <Container>
      <Navbar />
      <Announcement />
      {product && (
        <Wrapper>
          <ImgContainer>
            <Image src={product.img} />
          </ImgContainer>
          <InfoContainer>
            <Title>{product.title}</Title>
            <Desc>{product.desc}</Desc>
            <Price>$ {product.price}</Price>
            <FilterContainer>
              <Filter>
                <FilterTitle>Color</FilterTitle>
                {product.color?.map((c) => (
                  <FilterColor color={c} key={c} onClick={()=>setColor(c)} />
                ))}
              </Filter>
              <Filter>
                <FilterTitle>Size</FilterTitle>
                <FilterSize onChange={(e)=>setSize(e.target.value)}>
                  {product.size?.map((s) => (
                    <FilterSizeOption>{s}</FilterSizeOption>
                  ))}
                </FilterSize>
              </Filter>
            </FilterContainer>
            <AddContainer>
              <AmountContainer>
                <Remove onClick={()=>handleQuantity("dec")} style={{cursor:"pointer"}}/>
                <Amount>{quantity}</Amount>
                <Add onClick={()=>handleQuantity("inc")} style={{cursor:"pointer"}} />
              </AmountContainer>
              <Button onClick={()=>handleClick()}>ADD TO CART</Button>
            </AddContainer>
          </InfoContainer>
        </Wrapper>
      )}
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Product;
