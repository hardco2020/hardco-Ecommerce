import React from 'react'
import Productlist from '../../components/adminCom/Productlist'
import Sidebar from '../../components/adminCom/Sidebar'
import { PageContainer } from '../../components/adminCom/Theme'
import Topbar from '../../components/adminCom/Topbar'

const Products = () => {
    return (
        <>
        <Topbar/>
        <PageContainer>
            <Sidebar/>
            <Productlist/>
        </PageContainer>
        </>
    )
}

export default Products
