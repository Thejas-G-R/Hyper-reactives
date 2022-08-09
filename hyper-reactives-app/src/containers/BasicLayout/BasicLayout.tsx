import React from 'react'
import { Container } from 'react-bootstrap'
import { connect } from 'react-redux'
import { Outlet } from 'react-router-dom'
import Footer from '../../components/common/Footer/Footer'
import NavBar from '../../components/common/NavBar/NavBar'

export const BasicLayout = (props: any) => {
    return (
        <Container fluid style={{ margin: 0, padding: 0 }} >
            <NavBar />
            <Outlet />
            <Footer />
        </Container>
    )
}

const mapStateToProps = (state: any) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(BasicLayout)