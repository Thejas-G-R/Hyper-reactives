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
        window.scrollTo(0, 0)
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
                <Card className='yourvehicle' border="info" style={{ width: '100%' }}>
                    <Card.Header className='vh'>Your {vehicle.make} {vehicle.model}</Card.Header>
                    <Card.Body className='cardInfo'>
                        <div className="firstHalf">
                            <Card.Text >Car Color</Card.Text>
                            <Card.Text className='firstHalf-1'>
                                {vehicle.color}
                            </Card.Text>
                            <Card.Text >Year of make</Card.Text>
                            <Card.Text className='firstHalf-1'>
                                {vehicle.year}
                            </Card.Text>
                            <Card.Text >Registration Number</Card.Text>
                            <Card.Text className='firstHalf-1'>
                                {vehicle.registrationNumber}
                            </Card.Text>
                        </div>
                        <div className="secondHalf">
                            <Card.Text >Registration State</Card.Text>
                            <Card.Text className='firstHalf-1'>
                                {vehicle.registrationState}
                            </Card.Text>
                            <Card.Text >VIN</Card.Text>
                            <Card.Text className='firstHalf-1'>
                                {vehicle.VIN}
                            </Card.Text>
                            <Card.Text >Insurance Number</Card.Text>
                            <Card.Text className='firstHalf-1'>
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
                        <button type='button' className='but' onClick={() => navigate("../vehicle-servicing", { state: { vehicle } })}>Service now</button>
                    </div>
                </div>
                <div className="printServiceHistoryContainer">
                    <div className="printServiceHistoryText">
                        {constants.PRINT_SERVICING_HISTORY}
                    </div>
                    <div className="buttonContainer">
                        <button type='button' className='but' onClick={handlePrint}>Print PDF</button>
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