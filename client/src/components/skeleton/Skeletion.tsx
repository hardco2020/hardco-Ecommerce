import React from 'react'
import styled,{keyframes} from 'styled-components'


const skeletion = keyframes`
    to {
    opacity: 0.5;
  }

`
const ProductSk = styled.div`
    width: 320px;
    animation: ${skeletion} 1s ease infinite alternate;
    background-color: gray;
    display:flex;
    justify-content: center;
    align-items: center;
    padding:5px;
    margin-bottom:10px;
    height:320px;
`
const ProductSkImg = styled.div`
    background-color: #313131;
    width: 240px;
    height: 240px;
`

const ProductSkInfo = styled.div`
    display: flex;
    margin-top: 15px;
`

const Skeletion = () => {
    // return Array(COUNTER).fill(<FeedSkeleton />)
    return(
    <ProductSk>
    <ProductSkImg></ProductSkImg>
    <ProductSkInfo>
        {/* <div className="postSkAvatar"></div>
        <div className="postSkDetail">
        <div className="postSkText"></div>
        <div className="postSkText sm"></div>
        </div> */}
    </ProductSkInfo>
    </ProductSk>
    )
}

export default Skeletion
