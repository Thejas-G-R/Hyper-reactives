import React, { useEffect } from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { resetApprovedFlag, signout } from '../../../redux/actions/actions'
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
    function getCookie(cname) {
        let name = cname + "=";
        let ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    useEffect(() => {
        let cookieValue = getCookie("authToken")
        if (cookieValue === "") {
            navigate("/", { replace: true });
        }
    }, [])
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
                        <Nav.Link className='signout' onClick={() => {
                            props.signout({ authToken: props.authToken })
                            window.location.replace("/")
                        }
                        }>Sign out</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    )
}




const mapStateToProps = (state: any) => ({
    isAdmin: state.userReducer.isAdmin,
    authToken: state.userReducer.authToken
})

const mapDispatchToProps = (dispatch) => {
    return {
        resetFlags: () => { dispatch(resetApprovedFlag()) },
        signout: (data) => { dispatch(signout(data)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)