import React, { useState } from 'react'
import styled from 'styled-components'
import { ArrowLeftOutlined,ArrowRightOutlined} from '@material-ui/icons'
import { sliderItems } from '../../data'
import { mobile } from '../../responsive'
import { Link } from 'react-router-dom'
// import Button from '@material-ui/core/Button'

interface arrowDirection {
    direction: string;
}
interface SlideProp{
    bg?:string;
}
interface WrapperProp{
    index:number;
}

const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    position: relative;
    overflow: hidden;
    ${mobile({display:"none"})};
`
const Arrow = styled.div<arrowDirection>`
    display:flex;
    justify-content:center;
    align-items: center;
    position: absolute;
    top:0;
    bottom:0;
    left: ${p => p.direction === "left" && "10px"};
    right: ${p => p.direction === "right" && "10px"};
    cursor: pointer;
    margin:auto;
    width: 50px;
    height: 50px;
    background-color: #fff7f7;
    border-radius: 50%;
    opacity: 0.5;
    z-index:2;
`

const Wrapper = styled.div<WrapperProp>`
    height:100%;
    display: flex;
    /* transform: translateX(100vw); */
    transition: all 1.5s ease;
    transform: translateX(${(p)=>p.index * -100}vw);
`

const Slide = styled.div<SlideProp>`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #${p=> p.bg};
`
const ImgContainer = styled.div`
    height: 100%;
    flex:1;
    display: flex;
    align-items: center;
    justify-content: center;
`
const Image = styled.img`
    height:80%;
`
const InfoContainer = styled.div`
    padding: 50px;
    flex:1;
`
const Title = styled.h1`
    font-size: 70px;
`
const Desc = styled.p`
    margin:50px 0px;
    font-size: 20px;
    font-weight: 500;
    letter-spacing: 3px;
`
const Button = styled.button`
    padding:10px;
    font-size: 20px;
    background-color: transparent;
    cursor: pointer;
`
// const ImgContainer = styled.div`
//     width: 800px;
//     height: 500px;
//     background-color: white;
//     border-radius: 50%;
//     position: relative;
// `
// const ButtonArea = styled.div`
//     display:flex;
//     flex-direction: column;
//     position:absolute;
//     top:55px;
//     left:50px;
// `

const Slider = () => {
    const [slideIndex,setSlideIndex] = useState<number>(-1) // -1 0 1
    // console.table(sliderItems)
    const switchPic = (direction:string)=>{
        
        if(direction==="left"){
            setSlideIndex(slideIndex > -1 ? slideIndex -1 : 1)
        }
        if(direction==="right"){
            setSlideIndex(slideIndex < 1 ? slideIndex +1 : -1)
        }
    }
    return (
        <Container>
            {/* <ImgContainer>
                <img src="assets/line.png" alt=""  style={{width:"100%"}}/>
                <ButtonArea>
                    <Button style={{backgroundColor: "purple",}}>IBMBA</Button>
                    <p>地點:舊管4051</p>
                    <p>分機:4506</p>
                </ButtonArea>
            </ImgContainer> */}
            <Arrow data-testid="arrowLeft" direction="left" onClick={()=>switchPic("left")}>
                <ArrowLeftOutlined></ArrowLeftOutlined>
            </Arrow>
            <Wrapper   data-testid="wrapper"  index={slideIndex}>
                {sliderItems.map(item=>{
                    return(
                        <Slide bg={item.bg} key={item.id}>
                            <ImgContainer>
                                <Image src={item.img}/>
                            </ImgContainer>
                            <InfoContainer>
                                <Title>{item.title}</Title>
                                <Desc>{item.desc}</Desc>
                                <Link to="/product">
                                    <Button>SHOW NOW</Button>
                                </Link>
                            </InfoContainer>
                        </Slide>
                    )
                })}

            </Wrapper>
            <Arrow data-testid="arrowRight" direction="right" onClick={()=>switchPic("right")} >
                <ArrowRightOutlined></ArrowRightOutlined>
            </Arrow>
        </Container>
    )
}

export default Slider
