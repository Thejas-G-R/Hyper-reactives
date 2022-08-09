import React from 'react'
import { connect } from 'react-redux'
import { Outlet } from 'react-router-dom'
import Footer from '../../components/common/Footer/Footer'
import NavBar from '../../components/common/NavBar/NavBar'

export const BasicLayout = (props: any) => {
    return (
        <div>
            <NavBar />
            <Outlet />
            <Footer />
        </div>
    )
}

const mapStateToProps = (state: any) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(BasicLayout)