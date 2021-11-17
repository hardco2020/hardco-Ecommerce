import React from 'react'
import styled from 'styled-components'
import Home from '../../components/adminCom/pages/Home'
import Sidebar from '../../components/adminCom/Sidebar'
import Topbar from '../../components/adminCom/Topbar'

const Container = styled.div`
    display: flex;
    margin-top:10px;
`
const Admin = () => {
    return (
        <>
        <Topbar/>
        <Container>
            <Sidebar/>
            <Home/>
        </Container>
        </>
    )
}

export default Admin
