import React from 'react'
import ProductProfile from '../../components/adminCom/ProductProfile'
import Sidebar from '../../components/adminCom/Sidebar'
import { PageContainer } from '../../components/adminCom/Theme'
import Topbar from '../../components/adminCom/Topbar'

const AdminProduct = () => {
    return (
        <>
        <Topbar/>
        <PageContainer>
            <Sidebar/>
            <ProductProfile/>
        </PageContainer>
        </>
    )
}

export default AdminProduct
