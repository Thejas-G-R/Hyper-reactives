import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { resetApprovedFlag } from '../../../redux/actions/actions'
import { constants } from '../../../utils/constants'
import "./NavBar.scss"

export const NavBar = (props: any) => {
    const navigate = useNavigate()
    var pageName = "Home";
    pageName = window.location.href ? window.location.href.includes("layout") ? "Dashboard" : pageName : pageName;
    pageName = window.location.href ? window.location.href.includes("vehicle-history") ? "Vehicle Service History" : pageName : pageName;
    pageName = window.location.href ? window.location.href.includes("vehicle-servicing") ? "Service Center" : pageName : pageName;
    pageName = window.location.href ? window.location.href.includes("admin") ? "Admin Controls" : pageName : pageName;
    pageName = window.location.href ? window.location.href.includes("register-vehicle") ? "Register Vehicle" : pageName : pageName;
    pageName = window.location.href ? window.location.href.includes("vehicle-approval") ? "Admin Controls" : pageName : pageName;

    return (
        <>
            <Navbar collapseOnSelect expand="lg" variant="light" className='navbar'>
                <Container fluid>
                    <Navbar.Brand className='name' onClick={() => {
                        props.resetFlags()
                        if (props.isAdmin)
                            navigate("/layout/admin")
                        else if (!props.isAdmin)
                            navigate("/layout")
                    }}>{constants.COMPANY_NAME}</Navbar.Brand>
                    <Nav className="justify-content-center flex-grow-1 pe-3">
                        <div className='navHeading'>{pageName}</div>
                    </Nav>
                    <Nav>
                        <Nav.Link className='signout'>Sign out</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    )
}

const mapStateToProps = (state: any) => ({
    isAdmin: state.userReducer.isAdmin
})

const mapDispatchToProps = (dispatch) => {
    return {
        resetFlags: () => { dispatch(resetApprovedFlag()) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)