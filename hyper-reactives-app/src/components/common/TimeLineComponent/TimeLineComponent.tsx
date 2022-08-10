import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'

import { Timeline, TimelineItem } from 'vertical-timeline-component-for-react';



export const TimeLineComponent = (props: any) => {
    const renderTimeLineItems = (serviceHistoryItem: any, index: number) => {
        const address = serviceHistoryItem.serviceProviderAddress.street + ", " + serviceHistoryItem.serviceProviderAddress.city + ", " + serviceHistoryItem.serviceProviderAddress.state + ", " + serviceHistoryItem.serviceProviderAddress.zipcode
        return (
            <TimelineItem
                key={index}
                dateText={serviceHistoryItem.date}
                style={{ color: '#7a6d72' }}
                dateInnerStyle={{ background: 'rgba(130, 78, 98, 1)' }}
            >
                <h3>{serviceHistoryItem.serviceProviderName}</h3>
                <h4>{address}</h4>
                <p style={{ marginTop: "10px" }}>
                    Description:{"\n"} {serviceHistoryItem.description}
                </p>
                <p>
                    Mileage:{"\n"} {serviceHistoryItem.mileage}
                </p>
                <p>
                    Cost:{"\n"} {serviceHistoryItem.price}
                </p>
            </TimelineItem>
        )
    }
    return (
        <div >
            <Timeline lineColor={'#ddd'} >
                {props.serviceHistory.map(renderTimeLineItems)}
            </Timeline>
        </div>
    )
}

TimeLineComponent.propTypes = {
    serviceHistory: PropTypes.any,
}

const mapStateToProps = (state: any) => {

}

const mapDispatchToProps = (dispatch: any) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TimeLineComponent)