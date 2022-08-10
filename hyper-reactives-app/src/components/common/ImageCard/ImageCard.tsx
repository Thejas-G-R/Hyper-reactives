import PropTypes from 'prop-types'
import React from 'react'
import { Button, Image } from 'react-bootstrap'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import './ImageCard.scss'

export const ImageCard = (props: any) => {
    const navigate = useNavigate()
    return (
        props.showAvatar && !props.showAddButton ?
            (
                <Card className='imageCardContainer' style={{ flexDirection: 'row' }}>
                    <Card.Img className='avatarImage' src="/assets/lambo.jpeg" />
                    <Card.Body>
                        <Card.Title className='text3'>Welcome back Vikas</Card.Title>
                        <Card.Text className='text1'>
                            Let's AutoMate Your Car Maintainance
                        </Card.Text>
                        <Card.Text className='text2'>
                            Everything you need to maintain your car and preserve its value in one convenient place.
                        </Card.Text>
                    </Card.Body>
                </Card>
            ) : !props.showAvatar && props.showAddButton ?
                (
                    <Card className="bg-dark text-white imageCardContainer2">
                        <Card.ImgOverlay className="overlay">
                            <Card.Title className='text4'>Own a car?</Card.Title>
                            <Card.Text className='text5'>
                                Let us help you with your car maintenance and take care of your service records.
                            </Card.Text>
                            <Card.Text className='text6'>
                                Get one free car maintenance service at our trusted service centers for your newly registered vehicle.
                            </Card.Text>
                            <div className='d'>
                                <button className='b' type='button' onClick={() => navigate("register-vehicle")}>Let's Go</button>
                            </div>
                        </Card.ImgOverlay>
                    </Card>

                ) : null

    )
}

ImageCard.propTypes = {
    showAvatar: PropTypes.bool,
    showAddButton: PropTypes.bool,
}

const mapStateToProps = (state: any) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(ImageCard)