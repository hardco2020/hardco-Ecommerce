import React from 'react'
import Sidebar from '../../components/adminCom/Sidebar'
import { PageContainer } from '../../components/adminCom/Theme'
import Topbar from '../../components/adminCom/Topbar'
import Userlist from '../../components/adminCom/Userlist'



const Users = () => {
    return (
        <>
        <Topbar/>
        <PageContainer>
            <Sidebar/>
            <Userlist/>
        </PageContainer>
        </>
    )
}

export default Users
