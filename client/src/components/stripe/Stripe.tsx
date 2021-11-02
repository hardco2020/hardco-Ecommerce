import axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import StripeCheckout from "react-stripe-checkout";
import styled from "styled-components";
import logo from "../../assets/Eden.png"

const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Button = styled.button`
  border: none;
  width: 120;
  background-color: black;
  color: white;
  cursor: pointer;
  padding: 20px;
  border-radius: 5;
  font-weight: 600;
`;
const KEY = "pk_test_51JqHpMEeQ1fnGwzAspOcdA5bo0nFxJ1SCKtCLAUmFFdjd86vMcja6sMwzT18zd8sdk5B1datGQUboVXPSwyq0DOq00Lz1qkays"
const Stripe = () => {
    const history = useHistory();
    const [stripeToken,setStripeToken] = useState<any | null>(null);
    const onToken = (token:object) =>{
        setStripeToken(token);
    }
    useEffect(()=>{

        const makeRequest = async()=>{
            try{
                if(stripeToken){
                const url:string = process.env.REACT_APP_API_URL!;
                const res = await axios.post(`${url}/stripe/payment`,{
                    tokenId: stripeToken.id,
                    amount: 2000,
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
    <Container>
        {stripeToken ? (<span>Processing. Please wait...</span>):
        (
      <StripeCheckout
        name="Hardco Shop"
        image={logo}
        billingAddress
        shippingAddress
        description = "Your total is $20"
        amount={2000}
        token={onToken}
        stripeKey={KEY}
      >
        <Button>Pay now</Button>
      </StripeCheckout>)}
    </Container>
  );
};

export default Stripe;
