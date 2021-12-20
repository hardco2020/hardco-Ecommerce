import React from 'react'
import styled from 'styled-components'
import { OrderDataInterface } from '../../type/type'

interface ColorProp{
    color:string;
}
interface PendingProp{
    status:string;
}
const OrderContainer = styled.div`
    display: flex;
    width:600px;
    height: 100%;
    background-color: white;
    margin-bottom:20px;
    padding:15px; 
    flex-direction: column;
    -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
`
const OrderStatusContainer = styled.div`

    display: flex;
    flex:1;
    justify-content: space-between;
    align-items: center;
`
const OrderIdContainer = styled.div`
    display: flex;
    flex:1;
    justify-content: flex-start;
    align-items: center;
`
const OrderIdTitle = styled.div`
    display: flex;
    background-color: lightsalmon;
    padding:5px;
    border-radius: 10px;
    margin-right:5px;
`
const OrderId = styled.span``
const OrderPaymentContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
`
const OrderPendingTitle = styled.span`
    margin-right:5px;
`
const OrderPendingStatus = styled.button<PendingProp>`
padding: 5px 7px;
border: none;
border-radius: 10px;
background-color: ${(p) =>
  (p.status === "Approved" && "#e5faf2") ||
  (p.status === "Declined" && "#fff0f1") ||
  (p.status === "Pending" && "#ebf1fe")};
color: ${(p) =>
  (p.status === "Approved" && "#3bb077") ||
  (p.status === "Declined" && "#d95087") ||
  (p.status === "Pending" && "#2a7ade")};
`;
const OrderProductContainer = styled.div`
    display: flex;
    margin: 15px 0px; 
    border: 1px solid lightgray;
    border-left:none;border-right:none;
    padding:5px;
`

const OrderImgContainer = styled.div`
    display: flex;
    width: 80px;
    height: 80px;
    margin-right:10px;
`
const OrderImg = styled.img`
    width:100%;
    height: 100%;
    object-fit: cover;
`

const OrderInfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`
const OrderProductName = styled.span`
    display: flex;
    margin-bottom: 7px;
`
const OrderSize = styled.div`
    display: flex;
    margin-bottom: 7px;
    align-items: center;
`
const OrderSizeDetail = styled.span`
    margin-right:10px;
`

const OrderColorDetail = styled.div<ColorProp>`
    width:20px;
    height:20px;
    background-color: ${(props) => props.color};
    cursor: pointer;
    display :flex;
    align-items: center;
`
const OrderAmount = styled.span``
const OrderProductAmountContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    flex:1;
    align-items: center;
`
const OrderProductAmount = styled.span``
const OrderAmountContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex:1;   
`
const OrderAmountTitle = styled.span`
    margin-right: 10px;
`
const OrderTotalAmount = styled.span`
    font-size:20px;
    color:lightsalmon;
`
const OrderDateTitle = styled.span`
    margin-right: 5px;
`

const OrderDate = styled.span`
    margin-right:30px;
`
// order detailed will be passed into this section

export interface OrderDetailProp{
    order:OrderDataInterface
}
const OrderDetail = ({order}:OrderDetailProp) => {
    console.log(order);
    return (
        <>
          <OrderContainer>
              <OrderStatusContainer>
                <OrderIdContainer>
                    <OrderIdTitle>
                    訂單編號
                    </OrderIdTitle>
                    <OrderId>

                    {order._id}
                    </OrderId>
                    </OrderIdContainer>
                    <OrderPaymentContainer>
                        <OrderPendingTitle>
                            付款狀態 | 
                        </OrderPendingTitle>
                        <OrderPendingStatus status={order.status}>
                            {order.status}
                        </OrderPendingStatus>
                        
                    </OrderPaymentContainer>
              </OrderStatusContainer>
              {order.products.map((product)=>(
                  <OrderProductContainer>
                    <OrderImgContainer>
                        <OrderImg src={product.product.img}/>
                    </OrderImgContainer>
                    <OrderInfoContainer>
                        <OrderProductName>
                            {product.product.title}
                        </OrderProductName>
                        <OrderSize>
                            <OrderSizeDetail>
                            規格 : {product.product.size} | 
                            </OrderSizeDetail>
                            <OrderColorDetail color ={product.product.color}>
                            </OrderColorDetail>
                        </OrderSize>
                        <OrderAmount>
                            x {product.quantity}
                        </OrderAmount>
                    </OrderInfoContainer>
                    <OrderProductAmountContainer>
                        <OrderProductAmount>
                            $ {product.product.price* product.quantity}
                        </OrderProductAmount>
                    </OrderProductAmountContainer>
                  </OrderProductContainer>
                ))}
              <OrderAmountContainer>
                   <OrderDateTitle>
                        訂單日期:
                    </OrderDateTitle>
                    <OrderDate>
                        {new Date(order.createdAt).toISOString().slice(0, 10)}
                    </OrderDate>
                    <OrderAmountTitle>
                        訂單金額:
                    </OrderAmountTitle>
                    <OrderTotalAmount>
                    ${order.total}
                    </OrderTotalAmount>
              </OrderAmountContainer>
          </OrderContainer>
        </>
    )
}

export default OrderDetail
