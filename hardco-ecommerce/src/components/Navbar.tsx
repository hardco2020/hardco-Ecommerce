import React from 'react'
import styled from 'styled-components'
const Container = styled.div`
    height:60px;
`
const Wrapper = styled.div`
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
`
const Left = styled.div`
    flex: 1;
`
const Language = styled.div`
    font-size: 14px;
`
const Center = styled.div`
    flex: 1;
`
const Right = styled.div`
    flex: 1;
`

const Navbar = () => {
    return (
        <Container>
            <Wrapper>
                <Left>left</Left>
                <Center>center</Center>
                <Right>right</Right>
            </Wrapper>
        </Container>
    ) 
}

export default Navbar
