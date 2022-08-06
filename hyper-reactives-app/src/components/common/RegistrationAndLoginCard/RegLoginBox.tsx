import React from 'react'
import PropTypes from 'prop-types'
import { CardHeader, Card, CardFooter, CardBody, Text, FormField, TextInput, Box, Button, Form } from 'grommet';
import { useState } from 'react';
import { constants } from '../../../utils/constants';
import './RegLoginBox.scss'
function RegLoginBox(props: any) {
    const [formValue, setFormValue] = useState({ name: "", emailid: "", password: "" })
    const [nameError, setNameError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [emailError, setEmailError] = useState("")

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
            <Card width="medium" background="light-1">
                <CardHeader pad="medium" justify='center'><Text> {constants.USER_REGISTRATION_HEADING}</Text></CardHeader>
                <CardBody pad="medium">
                    <Form
                        value={formValue}
                        onChange={nextValue => setFormValue(nextValue)}
                        onSubmit={({ value }) => {
                            let isFormValid = validateForm(props.type);
                            if (isFormValid) console.log(value);
                        }}
                    >
                        <FormField name="name" htmlFor="name" label={constants.USER_REGISTRATION_NAME_FIELD} required={{ indicator: true }}>
                            <TextInput id="name" name="name" />
                        </FormField>
                        <div>
                            <Text className='nameError'>{nameError}</Text>
                        </div>
                        <FormField name="emailid" htmlFor="emailid" label={constants.USER_REGISTRATION_EMAIL_FIELD} required={{ indicator: true }}>
                            <TextInput id="emailid" name="emailid" />
                        </FormField>
                        <div>
                            <Text className='emailIdError'>{emailError}</Text>
                        </div>
                        <FormField name="password" htmlFor="password" label={constants.USER_REGISTRATION_PASSWORD_FIELD} required={{ indicator: true }}>
                            <TextInput type={"password"} name="password" />
                        </FormField>
                        <div>
                            <Text className='passwordError'>{passwordError}</Text>
                        </div>
                        <Box direction="row" gap="medium">
                            <Button type="submit" primary label="Submit" />
                        </Box>
                    </Form>
                </CardBody>
            </Card > : props.type === "login" ? <Card width="medium" background="light-1">
                <CardHeader pad="medium" justify='center'><Text> {constants.USER_LOGIN_HEADING}</Text></CardHeader>
                <CardBody pad="medium">
                    <Form
                        value={formValue}
                        onChange={nextValue => setFormValue(nextValue)}
                        onSubmit={({ value }) => {
                            let isFormValid = validateForm(props.type);
                            if (isFormValid) console.log(value);
                        }}
                    >
                        <FormField name="emailid" htmlFor="emailid" label={constants.USER_LOGIN_EMAIL_FIELD} required={{ indicator: true }}>
                            <TextInput id="emailid" name="emailid" />
                        </FormField>
                        <div>
                            <Text className='emailIdError'>{emailError}</Text>
                        </div>
                        <FormField name="password" htmlFor="password" label={constants.USER_LOGIN_PASSWORD_FIELD} required={{ indicator: true }}>
                            <TextInput type={"password"} name="password" />
                        </FormField>
                        <div>
                            <Text className='passwordError'>{passwordError}</Text>
                        </div>
                        <Box direction="row" gap="medium">
                            <Button type="submit" primary label="Submit" />
                        </Box>
                    </Form>
                </CardBody>
            </Card > : null
    )
}

RegLoginBox.propTypes = {
    type: PropTypes.string
}

export default RegLoginBox
