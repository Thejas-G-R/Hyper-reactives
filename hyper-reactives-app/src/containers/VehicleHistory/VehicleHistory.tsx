import PropTypes from 'prop-types'
import React, { useEffect, useRef, useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import { connect } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { TimeLineComponent } from '../../components/common/TimeLineComponent/TimeLineComponent'
import { getCarVehicleHistory } from '../../redux/actions/actions'
import { constants } from '../../utils/constants'
import "./VehicleHistory.scss"
import { useReactToPrint } from 'react-to-print';
export const VehicleHistory = (props: any) => {
    const location = useLocation();
    const state: any = location.state
    const vehicle = state.vehicle
    const navigate = useNavigate()
    const [hasServiceHistory, setHasServiceHistory] = useState(true)
    const [serviceHistory, setServiceHistory] = useState([])
    const componentRef = useRef(null);
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    useEffect(() => {
        if (!props.authToken) {
            navigate("/404")
        } else if (props.authToken) {
            props.callGetCarVehicleHistory({ authToken: props.authToken, vehicleId: vehicle.id })
        }
    }, [])

    useEffect(() => {
        setHasServiceHistory(props.hasServiceHistory)
        if (props.hasServiceHistory && props.serviceHistory.length > 0) {
            setServiceHistory(props.serviceHistory)
        }
    }, [props.serviceHistory, props.hasServiceHistory])


    return (
        <div className='vehicleHistoryContainer' ref={componentRef}>
            <div className='vehicleDetails'>
                <Card border="info" style={{ width: '100%' }}>
                    <Card.Header>Your Vechicle</Card.Header>
                    <Card.Body className='cardInfo'>
                        <div className="firstHalf">
                            <Card.Title>{vehicle.make} {vehicle.model}</Card.Title>
                            <Card.Subtitle >Color</Card.Subtitle>
                            <Card.Text className='text-muted'>
                                {vehicle.color}
                            </Card.Text>
                            <Card.Subtitle >Year</Card.Subtitle>
                            <Card.Text className='text-muted'>
                                {vehicle.year}
                            </Card.Text>
                            <Card.Subtitle >Registration Number</Card.Subtitle>
                            <Card.Text className='text-muted'>
                                {vehicle.registrationNumber}
                            </Card.Text>
                        </div>
                        <div className="secondHalf">
                            <Card.Subtitle >Registration State</Card.Subtitle>
                            <Card.Text className='text-muted'>
                                {vehicle.registrationState}
                            </Card.Text>
                            <Card.Subtitle >VIN</Card.Subtitle>
                            <Card.Text className='text-muted'>
                                {vehicle.VIN}
                            </Card.Text>
                            <Card.Subtitle >Insurance Number</Card.Subtitle>
                            <Card.Text className='text-muted'>
                                {vehicle.insuranceNumber}
                            </Card.Text>
                        </div>
                    </Card.Body>
                </Card>
            </div>
            <div className="vechileActionsContainer">
                <div className="serviceYourVehicle">
                    <div className="getServiceDoneText">
                        {constants.GET_SERVICING_DONE_TEXT}
                    </div>
                    <div className="buttonContainer">
                        <Button type='button' variant='warning' size='lg'>Service now</Button>
                    </div>
                </div>
                <div className="printServiceHistoryContainer">
                    <div className="printServiceHistoryText">
                        {constants.PRINT_SERVICING_HISTORY}
                    </div>
                    <div className="buttonContainer">
                        <Button type='button' variant='warning' size='lg' onClick={handlePrint}>Print PDF</Button>
                    </div>
                </div>
            </div>

            <div className="timeLineContainer">
                <div className="timeLineText">
                    <h3> Your {vehicle.make} {vehicle.model}'s service history</h3>
                </div>
                <div className="timeLine">
                    <TimeLineComponent serviceHistory={serviceHistory} />
                </div>
            </div>
        </div>
    )
}

VehicleHistory.propTypes = {

}

const mapStateToProps = (state: any) => {
    return {
        authToken: state.userReducer ? state.userReducer.authToken ? state.userReducer.authToken : null : null,
        serviceHistory: state.userReducer ? state.userReducer.serviceHistory ? state.userReducer.serviceHistory : null : null,
        hasServiceHistory: state.userReducer ? state.userReducer.hasServiceHistory ? state.userReducer.hasServiceHistory : false : false,
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        callGetCarVehicleHistory: (data: { authToken: string, vehicleId: string }) => dispatch(getCarVehicleHistory(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VehicleHistory)