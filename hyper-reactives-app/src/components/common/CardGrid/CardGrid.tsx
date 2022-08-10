import PropTypes from 'prop-types'
import React from 'react'
import { Button, Card } from 'react-bootstrap'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import "./CardGrid.scss"
export const CardGrid = (props: any) => {
    const navigate = useNavigate();
    const renderCards = (vehicle: any, index: number) => {
        return (
            <Card style={{ width: '18rem' }} key={index} className={`vehicleCard ${vehicle.status !== "Approved" ? "disabled" : ""}`}>
                <Card.Img className='ima' variant="top" src="https://picsum.photos/100/100" />
                <Card.Body>
                    <Card.Title className='tit'>{vehicle.make} {vehicle.model}</Card.Title>
                    <Card.Text>
                        Registered Licence No: {vehicle.registrationNumber} <br></br>
                        VIN: {vehicle.VIN} <br></br>
                        Status: {vehicle.status}
                    </Card.Text>
                    <div className='d'>
                        <button className={`${vehicle.status !== "Approved" ? 'carButton2' : 'carButton1'}`} disabled={vehicle.status !== "Approved"} onClick={() => navigate("vehicle-history", { state: { vehicle } })}>Open</button>
                    </div>
                </Card.Body>
            </Card>)
    }
    return (
        <div className='grid'>
            {props.vehicles.map(renderCards)}
        </div>
    )
}

CardGrid.propTypes = {
    empty: PropTypes.bool,
    vehicles: PropTypes.array
}

const mapStateToProps = (state: any) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(CardGrid)