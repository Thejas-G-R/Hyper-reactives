import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'

export const RegisterVehicle = (props: any) => {
    return (
        <div>RegisterVehicle</div>
    )
}

RegisterVehicle.propTypes = {

}

const mapStateToProps = (state: any) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterVehicle)