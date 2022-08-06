import React from 'react';
import { Box } from 'grommet';
import RegLoginBox from '../../components/common/RegistrationAndLoginCard/RegLoginBox';

function UserRegistration() {
    return (
        <Box direction='row' justify='center' align='center' fill >
            <RegLoginBox type="registration"></RegLoginBox>
        </Box >
    )
}

export default UserRegistration