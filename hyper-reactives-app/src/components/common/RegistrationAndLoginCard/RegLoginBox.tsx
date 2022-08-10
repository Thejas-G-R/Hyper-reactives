import React, { ChangeEvent, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useState } from 'react';
import { constants } from '../../../utils/constants';
import './RegLoginBox.scss'
import { Button, Card, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { userLogin, userSignup } from '../../../redux/actions/actions';
import { useNavigate } from 'react-router-dom';
const mapStateToProps = (state: any) => {
    return {
        signInSuccess: state.userReducer.signInSuccess,
        signUpSuccess: state.userReducer.signUpSuccess,
        isAdmin: state.userReducer.isAdmin
    };
};
const mapDispatchToProps = (dispatch: any) => {
    return {
        callUserSignUp: (data: { name: string, email: string, password: string }) => dispatch(userSignup(data)),
        callLoginAPI: (data: { email: string, password: string }) => dispatch(userLogin(data))
    };
};
function RegLoginBox(props: any) {

    const [formValue, setFormValue] = useState({ name: "", emailid: "", password: "" })
    const [nameError, setNameError] = useState(" ")
    const [passwordError, setPasswordError] = useState(" ")
    const [emailError, setEmailError] = useState(" ")
    const navigate = useNavigate()
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        const name = e.currentTarget.name;
        setFormValue({
            ...formValue,
            [name]: value,
        });
    }

    useEffect(() => {
        if (props.signUpSuccess === true)
            navigate("/login")
    }, [navigate, props.signUpSuccess]);
    useEffect(() => {
        if (props.signInSuccess === true && props.isAdmin === true)
            navigate("/layout/admin")
        else if (props.signInSuccess === true)
            navigate("/layout")
    }, [navigate, props.signInSuccess]);


    function validateForm(type: string) {

        if (formValue) {
            if (type === "registration") {
                if (!formValue.name) {
                    setNameError("Name can't be blank")
                    setPasswordError("")
                    setEmailError("")
                    return false
                }
                else if (formValue.name && !new RegExp(constants.USER_REGISTRATION_NAME_REGEX, "u").test(formValue.name)) {
                    setNameError("Name has to be valid")
                    setPasswordError("")
                    setEmailError("")
                    return false
                }
                else if (!formValue.emailid) {
                    setNameError("")
                    setPasswordError("")
                    setEmailError("Email id can't be empty")
                    return false
                }
                else if (formValue.emailid && !new RegExp(constants.USER_REGISTRATION_EMAIL_REGEX).test(formValue.emailid)) {
                    setNameError("")
                    setPasswordError("")
                    setEmailError("Enter a valid Email id")
                    return false
                } else if (!formValue.password) {
                    setPasswordError("Password can't be empty")
                    setNameError("")
                    setEmailError("")
                    return false
                }
                else if (formValue.password && !new RegExp(constants.USER_REGISTRATION_PASSWORD_REGEX).test(formValue.password)) {
                    setPasswordError("Password must of length greater than 8 and must have atleast 1 number, 1 uppercase, 1 lower case and 1 symbol")
                    setEmailError("")
                    setNameError("")
                    return false
                }
                setNameError("")
                setEmailError("")
                setPasswordError("")
                return true
            } else if (type === 'login') {
                if (!formValue.emailid) {

                    setPasswordError("")
                    setEmailError("Email id can't be empty")
                    return false
                }
                else if (formValue.emailid && !new RegExp(constants.USER_REGISTRATION_EMAIL_REGEX).test(formValue.emailid)) {

                    setPasswordError("")
                    setEmailError("Enter a valid Email id")
                    return false
                } else if (!formValue.password) {
                    setPasswordError("Password can't be empty")

                    setEmailError("")
                    return false
                }
                else if (formValue.password && !new RegExp(constants.USER_REGISTRATION_PASSWORD_REGEX).test(formValue.password)) {
                    setPasswordError("Password must of length greater than 8 and must have atleast 1 number, 1 uppercase, 1 lower case and 1 symbol")
                    setEmailError("")

                    return false
                }
                setPasswordError("")
                setEmailError("")
                return true
            }

        }
    }
    return (
        props.type === "registration" ?
            (<Card className='col-md-4 registrationCard' >
                <Card.Body >
                    <Card.Title className='name'>{constants.COMPANY_NAME}</Card.Title>
                    <Card.Title className='registrationHeader'>{constants.USER_REGISTRATION_HEADING}</Card.Title>
                    <Form
                        onSubmit={(e) => {
                            e.preventDefault();

                            let isFormValid = validateForm(props.type);
                            if (isFormValid)
                                props.callUserSignUp({ name: formValue.name, email: formValue.emailid, password: formValue.password })
                        }}
                        noValidate className='form d-flex flex-column'
                    >
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Your Name" onChange={handleInputChange} name="name" />
                            <Form.Text className="text-danger">
                                {nameError}
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="emailid">
                            <Form.Label>Email Id</Form.Label>
                            <Form.Control type="email" placeholder="Your email" name="emailid" onChange={handleInputChange} />
                            <Form.Text className="text-danger">
                                {emailError}
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Choose Password" name="password" onChange={handleInputChange} />
                            <Form.Text className="text-danger">
                                {passwordError}
                            </Form.Text>
                        </Form.Group>
                        <div className='buttons mt-auto'>
                            <Button type='submit' className='col-md-5 btnA'>Submit</Button>
                            <Button type='button' className='col-md-5 btnB' onClick={() => navigate("/login")}>Sign In</Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card >) : props.type == "login" ?
                (<Card className='col-sm-5 col-md-4 loginCard' >
                    <Card.Body className='h-100'>
                        <Card.Title className='name'>{constants.COMPANY_NAME}</Card.Title>
                        <Card.Title className='loginHeader'>{constants.USER_LOGIN_HEADING}</Card.Title>
                        <Form
                            onSubmit={(e) => {
                                e.preventDefault();
                                let isFormValid = validateForm(props.type);
                                if (isFormValid) props.callLoginAPI({ email: formValue.emailid, password: formValue.password })
                            }}
                            noValidate className='form d-flex flex-column'
                        >
                            <Form.Group className="mb-3" controlId="emailid">
                                <Form.Label>Email Id</Form.Label>
                                <Form.Control type="email" placeholder="Your email" name="emailid" onChange={handleInputChange} />
                                <Form.Text className="text-danger">
                                    {emailError}
                                </Form.Text>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Your Password" name="password" onChange={handleInputChange} />
                                <Form.Text className="text-danger">
                                    {passwordError}
                                </Form.Text>
                            </Form.Group>
                            <label className='text'>Don't have an account with us?<br></br>Smash that Sign up button!</label>
                            <div className='buttons mt-auto'>
                                <Button type='submit' className='col-md-5 btnA'>Login</Button>
                                <Button type='button' className='col-md-5 btnB' onClick={() => navigate("/signup")}>Sign Up</Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card >

                ) : null)

}

RegLoginBox.propTypes = {
    type: PropTypes.string
}

export default connect(mapStateToProps, mapDispatchToProps)(RegLoginBox)









//for later
{/* <section className="vh-100" style={{backgroundColor: "#6B9CD6"}}>
                    <div className="container py-5 h-100">
                        <div
                            className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col col-xl-10">
                                <div className="card" style={{borderRadius: "1rem;"}}>
                                    <div className="row g-0">
                                        <div className="col-md-6 col-lg-5 d-none d-md-block">
                                            <img
                                                // src="https://mdbootstrap.com/img/new/ecommerce/vertical/004.jpg"
                                                alt="login form" className="img-fluid"
                                                style={{borderRadius: "1rem 0 0 1rem;", objectFit: "fill"}} />
                                        </div>
                                        <div className="col-md-6 col-lg-7 d-flex align-items-center">
                                            <div className="card-body p-4 p-lg-5 text-black">
            
                                                <form action="login" method="POST">
            
                                                    <div className="d-flex align-items-center mb-3 pb-1">
                                                        <i className="fas fa-cubes fa-2x me-3" style={{color: "#ff6219;"}}></i>
                                                        <span className="h1 fw-bold mb-0">Dunes</span>
                                                    </div>
            
                                                    <h5 className="fw-normal mb-3 pb-3" style={{letterSpacing: "1px;"}}>Sign
                                                        into your account</h5>
            
                                                    <div className="form-outline mb-4">
                                                        <input type="text" id="username" name="username"
                                                            className="form-control form-control-lg" required minLength={5}/> <label
                                                            className="form-label" htmlFor="form2Example17">Username</label>
                                                    </div>
            
                                                    <div className="form-outline mb-4">
                                                        <input type="password" id="password" name="password"
                                                            className="form-control form-control-lg" required minLength={3}/> <label
                                                            className="form-label" htmlFor="form2Example27">Password</label>
                                                    </div>
            
                                                    <div className="pt-1 mb-4">
                                                     <input type="submit" value="Submit"/> 
             											<button className="btn btn-dark btn-lg btn-block" type="button">Login</button>
             										
                                                     </div>
                                                                                    
                                                    <p className="mb-5 pb-lg-2" style={{color: "#393f81;"}}>
                                                        Don't have an account? <a href="register" style={{color: "#393f81;"}}>Register
                                                            here</a>
                                                    </p>
                                                    
                                                </form>
            
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section> */}
