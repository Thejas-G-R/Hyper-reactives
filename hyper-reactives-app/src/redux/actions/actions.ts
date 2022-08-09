import { CALL_SIGN_UP_API, CALL_LOGIN_API, CALL_USER_CARS_API, GET_CAR_SERVICE_HISTORY } from "../types/actionTypes";


export const userSignup = (data: { name: string, email: string, password: string }) => {
    console.log('user sign up called', data);

    return {
        type: CALL_SIGN_UP_API,
        data
    };
};
export const userLogin = (data: { email: string, password: string }) => {
    console.log('user sign in called', data);

    return {
        type: CALL_LOGIN_API,
        data
    };
};
export const getUserCars = (data: { authToken: string }) => {
    console.log('get Cars called', data);

    return {
        type: CALL_USER_CARS_API,
        data
    };
};
export const getCarVehicleHistory = (data: { authToken: string, vehicleId: string }) => {
    console.log('get Car vehice history called', data);

    return {
        type: GET_CAR_SERVICE_HISTORY,
        data
    };
};

