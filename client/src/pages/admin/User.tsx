import React from 'react'
import Sidebar from '../../components/adminCom/Sidebar'
import { PageContainer } from '../../components/adminCom/Theme'
import Topbar from '../../components/adminCom/Topbar'
import UserProfile from '../../components/adminCom/UserProfile'

const User = () => {
    return (
        <>
        <Topbar/>
        <PageContainer>
            <Sidebar/>
            <UserProfile/>
        </PageContainer>
        </>
    )
}

export default User
