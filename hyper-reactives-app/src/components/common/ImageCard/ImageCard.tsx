import PropTypes from 'prop-types'
import React from 'react'
import { Button, Image } from 'react-bootstrap'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export const ImageCard = (props: any) => {
    const navigate = useNavigate()
    return (
        props.showAvatar && !props.showAddButton ?
            (<div>
                <div className="avatarImage">
                    <Image src='' fluid rounded alt='' />
                </div>
                <div className="cardText">akjsndkjnasdjna</div>
            </div>) : !props.showAvatar && props.showAddButton ? (<div>
                <div className="onlyText">akjsndkjnasdjna</div>
                <Button variant='primary' type='button' onClick={() => navigate("/RegisterVehicle")}>Manage cars</Button>
            </div>) : null

    )
}

ImageCard.propTypes = {
    showAvatar: PropTypes.bool,
    showAddButton: PropTypes.bool,
}

const mapStateToProps = (state: any) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(ImageCard)