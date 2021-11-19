import { Publish } from '@material-ui/icons'
import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { ProductData } from '../../dummyData'
import Chart from './Chart'


const ProductContainer = styled.div`
    flex:4;
    padding:20px;
`
const ProductTitleContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`
const ProductTitle = styled.h1``
const ProductAddButton = styled.button`
    border:none;
    width:80px;
    padding:5px;
    border-radius: 5px;
    background-color: teal;
    cursor:pointer;
    color:white;
    font-size:16px;
`
const ProductTop = styled.div`
    display: flex;

`
const ProductTopLeft = styled.div`
    flex:1;
`
const ProductTopRight = styled.div`
    flex:1;
    padding:20px;
    margin:20px;
    -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
`


const ProductInfoTop = styled.div`
    display: flex;
    align-items: center;
    
`

const ProductInfoBottom = styled.div`
    margin-top: 10px;
`

const ProductInfoImg = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit:cover;
    margin-right: 20px;

`

const ProductName = styled.span`
    font-weight: 600;
`

const ProductInfoItem = styled.div`
    width: 150px;
    display: flex;
    justify-content: space-between;
`
const ProductInfoKey = styled.span``
const ProductInfoValue = styled.span`
    font-weight: 300;
`
const ProductBottom = styled.div`
    padding: 20px;
    margin: 20px;
    -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
`
const ProductForm = styled.form`
    display: flex;
    justify-content: space-between;
`
const ProductFormLeft = styled.div`
    display: flex;
    flex-direction: column;
`

const ProductFormLeftLabel = styled.label`
    margin-bottom: 10px;
    color:gray;
`
const ProductFormLeftInput = styled.input`
    margin-bottom: 10px;
    border:none;
    padding:5px;
    border-bottom: 1px solid gray;

`
const ProductFormRight = styled.div`
    display: flex;
    flex-direction:column;
    justify-content: space-between;
`

const ProductFormSelect = styled.select`
    margin-bottom: 10px;

`

const ProductFormOption = styled.option``

const ProductUpload = styled.div`
    display: flex;
    align-items: center;
`

const ProductUploadImg = styled.img`
    width: 100px;
    height: 100px;
    border-radius: 10px;
    object-fit: cover;
    margin-right: 20px;
`

const ProductUploadLabel = styled.label``

const ProductUpdateButton = styled.button`
    border:none;
    padding:5px;
    border-radius: 5px;
    background-color: darkblue;
    color:white;
    font-weight: 600;
    cursor: pointer;
`



const ProductProfile = () => {
    return (
        <ProductContainer>
            <ProductTitleContainer>
                <ProductTitle>Product</ProductTitle>
                <Link to="/admin/createproduct">
                <ProductAddButton>Create</ProductAddButton>
                </Link>
            </ProductTitleContainer>
            <ProductTop>
                <ProductTopLeft>
                    <Chart data={ProductData} dataKey="Sales" title="Sales Performance"/>
                </ProductTopLeft>
                <ProductTopRight>
                    <ProductInfoTop>
                        <ProductInfoImg src="https://images.pexels.com/photos/7156886/pexels-photo-7156886.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"/>
                        <ProductName>Apple Airpod</ProductName>
                    </ProductInfoTop>
                    <ProductInfoBottom>
                        <ProductInfoItem>
                            <ProductInfoKey>id:</ProductInfoKey>
                            <ProductInfoValue>123</ProductInfoValue>
                        </ProductInfoItem>
                        <ProductInfoItem>
                            <ProductInfoKey>sales:</ProductInfoKey>
                            <ProductInfoValue>5123</ProductInfoValue>
                        </ProductInfoItem>
                        <ProductInfoItem>
                            <ProductInfoKey>active</ProductInfoKey>
                            <ProductInfoValue>yes</ProductInfoValue>
                        </ProductInfoItem>
                        <ProductInfoItem>
                            <ProductInfoKey>in stock</ProductInfoKey>
                            <ProductInfoValue>no</ProductInfoValue>
                        </ProductInfoItem>
                    </ProductInfoBottom>
                </ProductTopRight>
            </ProductTop>
            <ProductBottom>
                <ProductForm>
                    <ProductFormLeft>
                        <ProductFormLeftLabel>Product Name</ProductFormLeftLabel>
                        <ProductFormLeftInput type="text" placeholder="Apple AirPod"/>
                        <ProductFormLeftLabel>In Stock </ProductFormLeftLabel>
                        <ProductFormSelect name="inStock" id="idStock">
                            <ProductFormOption value="yes">Yes</ProductFormOption>
                            <ProductFormOption value="no">No</ProductFormOption>
                        </ProductFormSelect>
                        <ProductFormLeftLabel>Active</ProductFormLeftLabel>
                        <ProductFormSelect name="active" id="idActive">
                            <ProductFormOption value="yes">Yes</ProductFormOption>
                            <ProductFormOption value="no">No</ProductFormOption>
                        </ProductFormSelect>
                    </ProductFormLeft>
                    <ProductFormRight>
                        <ProductUpload>
                            <ProductUploadImg src="https://images.pexels.com/photos/7156886/pexels-photo-7156886.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"/>
                            <ProductUploadLabel htmlFor="file">
                                <Publish/>
                            </ProductUploadLabel>
                            <input type="file" id="file"  style={{display:"none"}}/>
                        </ProductUpload>
                        <ProductUpdateButton>Update</ProductUpdateButton>
                    </ProductFormRight>
                </ProductForm>
            </ProductBottom>
        </ProductContainer>
    )
}

export default ProductProfile
