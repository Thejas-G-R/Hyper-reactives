import React, { ChangeEvent, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useState } from 'react';
import { constants } from '../../utils/constants';
import './RegisterVehicle.scss';
import { Button, Card, Container, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
 import { vehicleRegistration} from '../../redux/actions/actions';
import { useNavigate } from 'react-router-dom';


const mapStateToProps = (state: any) => {
    return {
        authToken: state.userReducer ? state.userReducer.authToken ? state.userReducer.authToken : null : null,
        vehicleRegistrationSuccess: state.userReducer.vehicleRegistrationSuccess
    };
};
const mapDispatchToProps = (dispatch: any) => {
    return {
        callVehicleRegistration: ( data: { authToken: string, make:string, model:string , year: string,color: string,registrationNumber: string,
        registrationState: string, VIN: string, insuranceNumber: string }) => dispatch(vehicleRegistration(data)),
        
    };
};
function VehicleRegistrationBox(props: any) {

    const [formValue, setFormValue] = useState({  make: "", model: "", year: "",color: "",registrationNumber: "",
    registrationState: "", VIN: "", insuranceNumber: ""})
    const [makeError, setMakeError] = useState(" ")
    const [yearError, setYearError] = useState(" ")
    const [modeError, setModelError] = useState(" ")
    const [colorError, setColorError] = useState(" ")
    const [registnumError, setRegistnumError] = useState(" ")
    const [registstateError, setRegiststateError] = useState(" ")
    const [vinError, setVinError] = useState(" ")
    const [insuranceNumError, setInsuracneNumError] = useState(" ")
    const navigate = useNavigate()
    const[ registrationsuccess, setDataType] = useState({vehicleRegistrationSuccess: false });



    
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        const name = e.currentTarget.name;
        setFormValue({
            ...formValue,
            [name]: value,
        });
    }

    useEffect(() => {
        if  (props.vehicleRegistrationSuccess === true){
            setDataType({vehicleRegistrationSuccess : false});
            
            }
    }, [navigate, props.vehicleRegistrationSuccess]);
 
    function handelSubmit(e:any){
                
        e.preventDefault();
        let isFormValid = validateForm(props.type);
        console.log('outside isformvalid')
        if(isFormValid){
            console.log('validform in isform')
            props.callVehicleRegistration({ authToken: props.authToken, make: formValue.make, model:formValue.model, year: formValue.year ,color: formValue.color,registrationNumber: formValue.registrationNumber,
            registrationState: formValue.registrationState, VIN: formValue.VIN, insuranceNumber: formValue.insuranceNumber})
            alert('Vehicle Registered');
            // this.setState({name:"", email: ""});   
            e.target.reset(); 
        }

    }


    function validateForm(type: string) {

        console.log('inside validateform',formValue);

        if (formValue) {

            if (!formValue.make){
                setMakeError("Make can't be blank")
                setModelError("")
                setYearError("")
                setColorError("")
                setRegistnumError("")
                setRegiststateError("")
                setVinError("")
                setInsuracneNumError("")
                return false
            }
            else if(!formValue.model){
                setMakeError("")
                setModelError("model can't be blank")
                setYearError("")
                setColorError("")
                setRegistnumError("")
                setRegiststateError("")
                setVinError("")
                setInsuracneNumError("")
                return false
            }
            else if(!formValue.year){
                setMakeError("")
                setModelError("")
                setYearError("year can't be blank")
                setColorError("")
                setRegistnumError("")
                setRegiststateError("")
                setVinError("")
                setInsuracneNumError("")
                return false
            }
            else if(!formValue.color){
                setMakeError("")
                setModelError("")
                setYearError("")
                setColorError("color can't be blank")
                setRegistnumError("")
                setRegiststateError("")
                setVinError("")
                setInsuracneNumError("")
                return false
            }
    
            else if(!formValue.registrationNumber){
                setMakeError("")
                setModelError("")
                setYearError("")
                setColorError("")
                setRegistnumError("Registration number can't be blank")
                setRegiststateError("")
                setVinError("")
                setInsuracneNumError("")
                return false
            }
         
            else if(!formValue.registrationState){
                setMakeError("")
                setModelError("")
                setYearError("")
                setColorError("")
                setRegistnumError("")
                setRegiststateError("Registration State can't be blank")
                setVinError("")
                setInsuracneNumError("")
                return false
            }
            else if(!formValue.VIN){
                setMakeError("")
                setModelError("")
                setYearError("")
                setColorError("")
                setRegistnumError("")
                setRegiststateError("")
                setVinError(" VIN can't be blank")
                setInsuracneNumError("")
                return false
            }
            
            else if(!formValue.insuranceNumber){
                setMakeError("")
                setModelError("")
                setYearError("")
                setColorError("")
                setRegistnumError("")
                setRegiststateError("")
                setVinError(" ")
                setInsuracneNumError("Insurance Number can't be blank")
                return false
            }
                setMakeError("")
                setModelError("")
                setYearError("")
                setColorError("")
                setRegistnumError("")
                setRegiststateError("")
                setVinError(" ")
                setInsuracneNumError("")
            return true 
           
    }
}
    return (

        <div ><div>RegisterVehicle</div>
            <Container className='cardContainer'>
            <Form onSubmit={ handelSubmit }>
                <Form.Group className="mb-3" controlId="make">
                    <Form.Label>Make</Form.Label>
                    <Form.Control type="text" placeholder="Enter make" onChange={handleInputChange} name="make" />
                    <Form.Text className="text-danger">

                    </Form.Text>
                </Form.Group>

              

                <Form.Group className="mb-3" controlId="model">
                    <Form.Label>Model</Form.Label>
                    <Form.Control type="text" placeholder="Enter model of the vehicle" onChange={handleInputChange} name="model" />
                    <Form.Text className="text-danger">
                    </Form.Text>

                </Form.Group>
                <Form.Group className="mb-3" controlId="year">
                    <Form.Label>Year</Form.Label>
                    <Form.Control type="text" placeholder="Enter the year of manufacture " onChange={handleInputChange} name="year" />
                    <Form.Text className="text-danger">

                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="color">
                    <Form.Label>Color</Form.Label>
                    <Form.Control type="text" placeholder="Enter the year of manufacture " onChange={handleInputChange} name="color" />
                    <Form.Text className="text-danger">

                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="registrationNumber">
                    <Form.Label>Registration Number</Form.Label>
                    <Form.Control type="text" placeholder="Enter the Registration Number " onChange={handleInputChange} name="registrationNumber" />
                    <Form.Text className="text-danger">

                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="registrationState">
                    <Form.Label>Registration State</Form.Label>
                    <Form.Control type="text" placeholder="Enter the Registration State " onChange={handleInputChange} name="registrationState" />
                    <Form.Text className="text-danger">

                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="VIN">
                    <Form.Label>VIN</Form.Label>
                    <Form.Control type="text" placeholder="Enter the VIN " onChange={handleInputChange} name="VIN" />
                    <Form.Text className="text-danger">

                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="insuranceNumber">
                    <Form.Label>Insurance Number</Form.Label>
                    <Form.Control type="text" placeholder="Enter the Insurance Number " onChange={handleInputChange} name="insuranceNumber" />
                    <Form.Text className="text-danger">

                    </Form.Text>
                </Form.Group>


                <div className='buttons'>
                    <Button variant='primary' type='submit' className='col-md-5'>Submit</Button>

                </div>
            </Form>
            </Container>
            </div>


        
    )       
}

VehicleRegistrationBox.propTypes = {
    type: PropTypes.string
}

export default connect(mapStateToProps, mapDispatchToProps)(VehicleRegistrationBox)