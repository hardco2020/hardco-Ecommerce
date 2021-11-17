import React from 'react'
import styled from 'styled-components'
import Chart from '../Chart'
import FeaturedInfo from '../FeaturedInfo'
import { userData } from '../../../dummyData'

const HomeContainer = styled.div`
    flex:4;
`
const Home = () => {
    return (
        <HomeContainer>
            <FeaturedInfo/>
            <Chart data={userData} title="User Analytics" dataKey="Active User"/>
        </HomeContainer>
    )
}

export default Home
