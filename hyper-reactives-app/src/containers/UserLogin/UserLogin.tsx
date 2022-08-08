import React from 'react';
import { Container } from 'react-bootstrap';
import RegLoginBox from '../../components/common/RegistrationAndLoginCard/RegLoginBox';

import './UserLogin.scss';
function UserLogin() {
    return (
        <Container fluid className='cardContainer'>
            <RegLoginBox type="login"></RegLoginBox>
        </Container >
    )
}

export default UserLogin