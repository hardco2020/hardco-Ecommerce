import React from 'react'
import NewUser from '../../components/adminCom/NewUser'
import Sidebar from '../../components/adminCom/Sidebar'
import { PageContainer } from '../../components/adminCom/Theme'
import Topbar from '../../components/adminCom/Topbar'

const CreateUser = () => {
    return (
        <>
        <Topbar/>
        <PageContainer>
            <Sidebar/>
            <NewUser/>
        </PageContainer>
        </>
    )
}

export default CreateUser
