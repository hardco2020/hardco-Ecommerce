import React from 'react'
import NewProduct from '../../components/adminCom/NewProduct'
import Sidebar from '../../components/adminCom/Sidebar'
import { PageContainer } from '../../components/adminCom/Theme'
import Topbar from '../../components/adminCom/Topbar'

const CreateProduct = () => {
    return (
        <>
        <Topbar/>
        <PageContainer>
            <Sidebar/>
            <NewProduct/>
        </PageContainer>
        </>
    )
}

export default CreateProduct
