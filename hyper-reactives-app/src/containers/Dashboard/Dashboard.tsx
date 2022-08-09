import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CardGrid from '../../components/common/CardGrid/CardGrid'
import ImageCard from '../../components/common/ImageCard/ImageCard'
import { getUserCars } from '../../redux/actions/actions'
import './Dashboard.scss'
import Image from 'react-bootstrap/Image'

export const Dashboard = (props: any) => {
    const navigate = useNavigate()
    const [ownVehicles, setOwnVehicles] = useState(true)
    const [vehicles, setVehicles] = useState([])
    useEffect(() => {
        if (!props.authToken) {
            navigate("/404")
        } else if (props.authToken) {
            props.callGetUserCars({ authToken: props.authToken })
        }
    }, [])

    useEffect(() => {
        setOwnVehicles(props.ownVehicles)
        if (props.ownVehicles && props.vehicles.length > 0) {
            setVehicles(props.vehicles)
        }
    }, [props.vehicles, props.ownVehicles])

    return (
        <div className='content'>
            <ImageCard showAvatar={true} showAddButton={false} />
            <div className="dashboradImage">
                <Image fluid src='' alt='' />
            </div>
            <ImageCard showAvatar={false} showAddButton={true} />
            <CardGrid empty={ownVehicles} vehicles={vehicles} />
        </div>
    )
}

Dashboard.propTypes = {

}

const mapStateToProps = (state: any) => ({
    authToken: state.userReducer ? state.userReducer.authToken ? state.userReducer.authToken : null : null,
    vehicles: state.userReducer ? state.userReducer.vehicles ? state.userReducer.vehicles : null : null,
    ownVehicles: state.userReducer ? state.userReducer.ownVehicles ? state.userReducer.ownVehicles : false : false,
})

const mapDispatchToProps = (dispatch: any) => {
    return {
        callGetUserCars: (data: { authToken: string }) => dispatch(getUserCars(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)