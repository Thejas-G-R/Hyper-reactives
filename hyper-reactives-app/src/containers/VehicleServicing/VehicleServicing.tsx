import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import SearchIcon from '@mui/icons-material/Search';
import "./VehicleServicing.scss"
import { approveServiceReceipt, getServiceProviders, getServiceReceipt, resetApprovedFlag } from '../../redux/actions/actions';
import { Button, Card, ListGroup, ListGroupItem, Modal, Toast, ToastContainer } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { constants } from '../../utils/constants';
import CloseIcon from '@mui/icons-material/Close';

export const VehicleServicing = (props: any) => {
    const [serviceProviders, setServiceProviders] = useState([])
    const location = useLocation();
    const state: any = location.state
    const vehicle = state.vehicle
    const [show, setShow] = useState(false)
    const [serviceDetails, setServiceDetails] = useState({})
    const [isServiceReceiptApproved, setIsServiceReceiptApproved] = useState(false)
    const [receiptData, setReceiptData] = useState<any>({})
    const handleClose = () => setShow(false);
    const [serviceProviderSelected, setServiceProviderSelected] = useState<any>();
    const navigate = useNavigate();
    const handleShow = (serviceProvider) => {
        setServiceProviderSelected(serviceProvider)
        props.callGetReceipt({ authToken: props.authToken, vehicleId: vehicle.id, serviceProviderId: serviceProvider.id })
    };
    useEffect(() => {
        if (props.authToken)
            props.callServiceProviders({ authToken: props.authToken })
    }, [])

    useEffect(() => {
        if (props.serviceProviders)
            setServiceProviders(props.serviceProviders)
    }, [props.serviceProviders])


    useEffect(() => {
        setReceiptData(props.receiptData)
        setShow(true)
    }, [props.receiptData])

    useEffect(() => {
        setIsServiceReceiptApproved(props.isServiceReceiptApproved)
        setTimeout(() => { }, 500)
        if (isServiceReceiptApproved === true) {
            setTimeout(() => { setIsServiceReceiptApproved(false) }, 500)
        }
    }, [props.isServiceReceiptApproved])

    const callApproveReceiptApi = () => {
        let data: { authToken: string, vehicleId: string, serviceProviderId: string, date: string, mileage: string, description: string, price: string } = {
            authToken: props.authToken,
            vehicleId: vehicle.id,
            serviceProviderId: serviceProviderSelected.id,
            date: receiptData.date,
            mileage: receiptData.mileage,
            description: receiptData.description,
            price: receiptData.price
        };
        setShow(false)
        props.resetFlags()
        props.callApproveReceipt(data)
    }
    const renderListItems = (serviceProvider, index) => {
        return (< ListGroupItem as={"div"} key={index} className="listGroupItem">
            <div className="serviceProvidersList">
                <div className="serviceProviderDetails">
                    <div className='serviceProviderName'>
                        {serviceProvider.name}
                    </div>
                    <div className='serviceProviderAddress'>
                        {serviceProvider.street + ", " + serviceProvider.city + ", " + serviceProvider.state + ", " + serviceProvider.zipcode}
                    </div>
                    <div className='serviceProviderRating'>
                        Rating: {serviceProvider.rating}
                    </div>
                </div>
                <div className="requestServiceButton">
                    <button className='press' onClick={() => handleShow(serviceProvider)}>Service here</button>
                </div>
            </div>
        </ListGroupItem >)
    }
    return (
        <div className='outer'>
        <Card className='vehicleServicingContainer'>
            <div className="searchBar">
                <div className="input-group mb-3 inputBar" >
                    <input type="text" className="form-control" placeholder="Enter Location" aria-label="Enter Location" aria-describedby="basic-addon2" style={{ borderRadius: "40px 0 0 40px" }} />
                    <div className="input-group-append">
                        <button className="btn btn-outline-secondary" type="button" style={{ borderRadius: "0px 40px 40px 0px" }}>
                            <SearchIcon sx={{ fontSize: 20 }} />
                        </button>
                    </div>
                </div>
            </div>
            <div className="serviceProviderList">
                <ListGroup as="ul" className='listGroup'>
                    {serviceProviders.map(renderListItems)}
                </ListGroup>
            </div>
            {(typeof receiptData === 'object' && receiptData != null && Object.keys(receiptData).length !== 0) ? <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header>
                    <Modal.Title>{constants.RECEIPT_HEADING}</Modal.Title>
                    <Button type='button' variant='light' onClick={handleClose} className=""><CloseIcon /></Button>
                </Modal.Header>
                <Modal.Body>
                    <Card className='ala'>
                        <p>Date: {receiptData.date}</p>
                        <p>Service Provider: {receiptData.serviceProvider.name}</p>
                        <p>Address: {receiptData.serviceProvider.address.street}, {receiptData.serviceProvider.address.city}, {receiptData.serviceProvider.address.state}, {receiptData.serviceProvider.address.zipcode}</p>
                        <p>Car: {receiptData.vehicle.make} {receiptData.vehicle.model}</p>
                        <p>Registration Number: {receiptData.vehicle.registrationNumber}</p>
                        <p>Mileage: {receiptData.mileage}</p>
                        <p>Description: {receiptData.description}</p>
                        <p>Price: {receiptData.price}</p>
                    </Card>
                </Modal.Body>
                <Modal.Footer>
                    <button className='press1' onClick={callApproveReceiptApi}>Approve</button>
                </Modal.Footer>
            </Modal> : null}
            {/* <ToastContainer position='middle-center'>
                <Toast onClose={() => {
                    setIsServiceReceiptApproved(false)
                }} show={isServiceReceiptApproved} delay={3000} autohide bg='success'>
                    <Toast.Header>
                        Service Request Approved!
                    </Toast.Header>
                    <Toast.Body>Your service history has now been updated! </Toast.Body>
                </Toast>
            </ToastContainer> */}
        </Card>
        </div>

    )
}

VehicleServicing.propTypes = {
}

const mapStateToProps = (state: any) => ({
    authToken: state.userReducer ? state.userReducer.authToken ? state.userReducer.authToken : null : null,
    serviceProviders: state.userReducer ? state.userReducer.serviceProviders ? state.userReducer.serviceProviders : null : null,
    receiptData: state.userReducer ? state.userReducer.receiptData ? state.userReducer.receiptData : null : null,
    isServiceReceiptApproved: state.userReducer ? state.userReducer.isServiceReceiptApproved ? state.userReducer.isServiceReceiptApproved : null : null,
})

const mapDispatchToProps = (dispatch) => {
    return {
        callServiceProviders: (data: { authToken: string }) => dispatch(getServiceProviders(data)),
        callGetReceipt: (data: { authToken: string, vehicleId: string, serviceProviderId: string }) => dispatch(getServiceReceipt(data)),
        callApproveReceipt: (data: { authToken: string, vehicleId: string, serviceProviderId: string, date: string, mileage: string, description: string, price: string }) => dispatch(approveServiceReceipt(data)),
        resetFlags: () => { dispatch(resetApprovedFlag()) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VehicleServicing)