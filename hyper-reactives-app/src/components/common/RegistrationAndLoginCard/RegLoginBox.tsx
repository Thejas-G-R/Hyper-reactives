import React, { ChangeEvent, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useState } from 'react';
import { constants } from '../../../utils/constants';
import './RegLoginBox.scss'
import { Button, Card, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { userSignup } from '../../../redux/actions/actions';
const mapStateToProps = (state: any) => {
    return {
        signInSuccess: state.userReducer.signInSuccess
    };
};
const mapDispatchToProps = (dispatch: any) => {
    return {
        callUserSignUp: (data: { name: string, email: string, password: string }) => dispatch(userSignup(data))
    };
};
function RegLoginBox(props: any) {

    const [formValue, setFormValue] = useState({ name: "", emailid: "", password: "" })
    const [nameError, setNameError] = useState(" ")
    const [passwordError, setPasswordError] = useState(" ")
    const [emailError, setEmailError] = useState(" ")
    const [signUpSuccess, setSignUpSuccess] = useState(props.signInSuccess)
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        const name = e.currentTarget.name;
        setFormValue({
            ...formValue,
            [name]: value,
        });
    }

    useEffect(() => {
        console.log(props.signInSuccess, "After api")
    }, [props.signInSuccess]);


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
                    <Card.Title className='registrationHeader'>{constants.USER_REGISTRATION_HEADING}</Card.Title>
                    <Form
                        onSubmit={(e) => {
                            e.preventDefault();
                            props.callUserSignUp({ name: 'Thejas', email: "thejas@examplemail.com", password: "password" })
                            let isFormValid = validateForm(props.type);
                            if (isFormValid) console.log(formValue + " is valid");
                        }}
                        noValidate
                    >
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter Name" onChange={handleInputChange} name="name" />
                            <Form.Text className="text-danger">
                                {nameError}
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="emailid">
                            <Form.Label>Email Id</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" name="emailid" onChange={handleInputChange} />
                            <Form.Text className="text-danger">
                                {emailError}
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Enter Password" name="password" onChange={handleInputChange} />
                            <Form.Text className="text-danger">
                                {passwordError}
                            </Form.Text>
                        </Form.Group>
                        <Button variant='primary' type='submit'>Submit</Button>
                    </Form>
                </Card.Body>
            </Card >) : props.type == "login" ?
                (<Card className='col-sm-5 col-lg-3 loginCard' >
                    <Card.Body >
                        <Card.Title className='loginHeader'>{constants.USER_LOGIN_HEADING}</Card.Title>
                        <Form
                            onSubmit={(e) => {
                                e.preventDefault();
                                let isFormValid = validateForm(props.type);
                                if (isFormValid) console.log(formValue + " is valid");
                            }}
                            noValidate
                        >
                            <Form.Group className="mb-3" controlId="emailid">
                                <Form.Label>Email Id</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" name="emailid" onChange={handleInputChange} />
                                <Form.Text className="text-danger">
                                    {emailError}
                                </Form.Text>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Enter Password" name="password" onChange={handleInputChange} />
                                <Form.Text className="text-danger">
                                    {passwordError}
                                </Form.Text>
                            </Form.Group>
                            <Button variant='primary' type='submit'>Submit</Button>
                        </Form>
                    </Card.Body>
                </Card >) : null)

}

RegLoginBox.propTypes = {
    type: PropTypes.string
}

export default connect(mapStateToProps, mapDispatchToProps)(RegLoginBox)
