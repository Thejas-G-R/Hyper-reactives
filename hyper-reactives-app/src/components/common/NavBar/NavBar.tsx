import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export const NavBar = (props: any) => {
    const navigate = useNavigate()
    const pageName = window.location.href ? window.location.href.includes("Layout") ? "Home" : null : null
    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
                <Container fluid>
                    <Navbar.Brand onClick={() => navigate("/Home")}>Navbar</Navbar.Brand>
                    <Nav className="justify-content-center flex-grow-1 pe-3">
                        <div className='navHeading'>{pageName}</div>
                    </Nav>
                    <Nav>
                        <Nav.Link >Sign out</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    )
}

const mapStateToProps = (state: any) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)