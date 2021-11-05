import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import StripeCheckout from "react-stripe-checkout";
import styled from "styled-components";
import logo from "../../assets/Eden.png"
import { publicRequest } from "../../axiosURL";

interface StripeProps{
  total:number;
  disabled:boolean;
}
// const Container = styled.div`
//   height: 100vh;
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;
const Button = styled.button`
  border: none;
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  cursor: pointer;
  border-radius: 5;
  font-size:20px;
  font-weight: 600;
`;
const KEY = process.env.REACT_APP_STRIPE_KEY!
const Stripe = ({total,disabled} : StripeProps) => {
    const history = useHistory();
    const [stripeToken,setStripeToken] = useState<any | null>(null);
    const onToken = (token:object) =>{
        setStripeToken(token);
    }
    useEffect(()=>{

        const makeRequest = async()=>{
            try{
                if(stripeToken){
                const res = await publicRequest.post(`/stripe/payment`,{
                    tokenId: stripeToken.id,
                    amount: {total},
                })
                console.log(res.data)
                history.push('/success');
            }
            }catch(err){
                console.log(err);
            }
        }
        makeRequest();
    },[stripeToken, history])
  return (
    // <Container>
    <>
        {stripeToken ? (<span>Processing. Please wait...</span>):
        (
      <StripeCheckout
        name="Hardco Shop"
        image={logo}
        billingAddress
        shippingAddress
        description = {`Your total is ${total}`}
        amount={total*100}
        token={onToken}
        stripeKey={KEY}
      >
        <Button disabled={disabled}>Pay now</Button>
      </StripeCheckout>)}
    </>
    // </Container>

  );
};

export default Stripe;
