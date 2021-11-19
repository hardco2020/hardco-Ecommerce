import React from 'react'
import Home from '../../components/adminCom/Home'
import Sidebar from '../../components/adminCom/Sidebar'
import { PageContainer } from '../../components/adminCom/Theme'
import Topbar from '../../components/adminCom/Topbar'


const Dashboard = () => {
    return (
        <>
        <Topbar/>
        <PageContainer>
            <Sidebar/>
            <Home/>
        </PageContainer>
        </>
    )
}

export default Dashboard
