import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { constants } from '../../../utils/constants'
import "./NavBar.scss"

export const NavBar = (props: any) => {
    const navigate = useNavigate()
    const pageName = window.location.href ? window.location.href.includes("layout") ? "Dashboard" : null : null
    return (
        <>
            <Navbar collapseOnSelect expand="lg" variant="light" className='navbar'>
                <Container fluid>
                    <Navbar.Brand className='name' onClick={() => navigate("/home")}>{constants.COMPANY_NAME}</Navbar.Brand>
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

const mapStateToProps = (state: any) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)