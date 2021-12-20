import React from 'react'
import styled from 'styled-components'



const Container = styled.div`
    display: flex;

`
const Img = styled.img`
    width:100px;
    object-fit: cover;
`

type props = {
    src1:string;
    src2:string;
}

const test = ({src1,src2}:props) => {
    console.log(src2);
    return (
        <Container>
            <Img src={src1} alt=""/>
            <Img src={src2} alt=""/>
        </Container>
    )
}

export default test
