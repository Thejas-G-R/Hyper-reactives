import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'

export const CardGrid = (props: any) => {
    const renderCards = () => {

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