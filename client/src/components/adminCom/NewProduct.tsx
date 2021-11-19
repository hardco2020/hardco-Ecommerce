import React from 'react'
import styled from 'styled-components'
import { Button, Container } from './Theme'

const Title = styled.h1`
`

const ProductForm = styled.form`
    display:flex;
    flex-direction:column;
`

const ProductItem = styled.div`
    width: 500px;
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    margin-right: 20px;
`

const Productlabel = styled.label`
    margin-bottom: 15px;
    font-size: 14px;
    font-weight: 600;
    color: rgb(151,150,150);
`

const ProductInput = styled.input`
    height: 20px;
    padding:10px;
    border:1px solid gray;
    border-radius:5px;
`
const ProductSelect = styled.select`
    height: 40px;
    border-radius: 5px;
    padding:0px 10px;
`

const ProductOption = styled.option``


const NewProduct = () => {
    return (
        <Container>
             <Title>New Product</Title>
            <ProductForm>
                <ProductItem>
                    <Productlabel>Image</Productlabel>
                    <ProductInput type="file" id="file"/>
                </ProductItem>
                <ProductItem>
                    <Productlabel>Name</Productlabel>
                    <ProductInput type="text" placeholder="Apple Airpods"/>
                </ProductItem>
                <ProductItem>
                    <Productlabel>Stock</Productlabel>
                    <ProductInput type="text" placeholder="123"/>
                </ProductItem>
                <ProductItem>
                    <Productlabel>Active</Productlabel>
                    <ProductSelect name="active" id="active">
                        <ProductOption value="yes">Yes</ProductOption>
                        <ProductOption value="no">No</ProductOption>
                    </ProductSelect>
                </ProductItem>
                <Button>Create</Button>
            </ProductForm>
        </Container>
    )
}

export default NewProduct
