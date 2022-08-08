import React from 'react';
import { Container } from 'react-bootstrap';
import RegLoginBox from '../../components/common/RegistrationAndLoginCard/RegLoginBox';
import './UserRegistration.scss';
function UserRegistration() {
    return (
        <Container fluid className='cardContainer'>
            <RegLoginBox type="registration"></RegLoginBox>
        </Container>
    )
}

export default UserRegistration