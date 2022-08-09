import PropTypes from 'prop-types'
import React from 'react'
import { Button, Image } from 'react-bootstrap'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import './ImageCard.scss'
export const ImageCard = (props: any) => {
    const navigate = useNavigate()
    return (
        props.showAvatar && !props.showAddButton ?
            (<div className='imageCardContainer'>
                <div className="avatarImage">
                    <Image src='https://picsum.photos/55/55' fluid rounded alt='' />
                </div>
                <div className="cardText">akjsndkjnasdjnaakjsndkjnasdjnaakjsndkjnasdjnaakjsndkjnasdjnaakjsndkjnasdjnaakjsndkjnasdjnaakjsndkjnasdjnaakjsndkjnasdjnaakjsndkjnasdjnaakjsndkjnasdjnaakjsndkjnasdjnaakjsndkjnasdjnaakjsndkjnasdjnaakjsndkjnasdjna</div>
            </div>) : !props.showAvatar && props.showAddButton ?
                (<div className='imageCardContainer'>
                    <div className="onlyText">akjsndkjnasdjnaakjsndkjnasdjnaakjsndkjnasdjnaakjsndkjnasdjnaakjsndkjnasdjnaakjsndkjnasdjnaakjsndkjnasdjnaakjsndkjnasdjnaakjsndkjnasdjnaakjsndkjnasdjnaakjsndkjnasdjnaakjsndkjnasdjnaakjsndkjnasdjnaakjsndkjnasdjna</div>
                    <Button variant='primary' type='button' onClick={() => navigate("register-vehicle")}>Manage cars</Button>
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