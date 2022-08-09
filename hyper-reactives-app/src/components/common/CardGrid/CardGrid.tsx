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
                <Card.Img variant="top" src="https://picsum.photos/100/100" />
                <Card.Body>
                    <Card.Title>{vehicle.make} {vehicle.model}</Card.Title>
                    <Card.Text>
                        Some quick example text to build on the card title and make up the
                        bulk of the card's content.
                    </Card.Text>
                    <Button variant="primary" disabled={vehicle.status !== "Approved"} onClick={() => navigate("vehicle-history", { state: { vehicle } })}>Manage Car</Button>
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