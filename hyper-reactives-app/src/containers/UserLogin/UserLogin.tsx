import React from 'react';
import { Box } from 'grommet';
import RegLoginBox from '../../components/common/RegistrationAndLoginCard/RegLoginBox';

function UserLogin() {
    return (
        <Box direction='row' justify='center' align='center' fill >
            <RegLoginBox type="login"></RegLoginBox>
        </Box >
    )
}

export default UserLogin