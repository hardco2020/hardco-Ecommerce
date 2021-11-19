import React from 'react'
import styled from 'styled-components'
import Chart from './Chart'
import FeaturedInfo from './FeaturedInfo'
import { userData } from '../../dummyData'
import WidgetLg from './WidgetLg'
import WidgetSm from './WidgetSm'
import { Container } from './Theme'

const HomeWidget = styled.div`
    display: flex;
    margin: 20px;
`
const Home = () => {
    return (
        <Container>
            <FeaturedInfo/>
            <Chart data={userData} title="User Analytics" dataKey="Active User"/>
            <HomeWidget>
                <WidgetSm/>
                <WidgetLg/>
            </HomeWidget>
        </Container>
    )
}

export default Home
