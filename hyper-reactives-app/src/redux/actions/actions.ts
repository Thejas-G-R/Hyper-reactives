import { CALL_SIGN_UP_API, CALL_LOGIN_API, CALL_USER_CARS_API, GET_CAR_SERVICE_HISTORY, CALL_VEL_REG_API_SUCCESS, GET_ALL_SERVICE_PROVIDERS, GET_RECEIPT_DETAILS, APPROVE_RECEIPT, RESET_APPROVED_RECEIPT_FLAG, USER_SIGN_OUT } from "../types/actionTypes";


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
export const getServiceProviders = (data: { authToken: string }) => {
    console.log('get All service providers called', data);
    return {
        type: GET_ALL_SERVICE_PROVIDERS,
        data
    };
};

export const vehicleRegistration = (data: {
    authToken: string, make: string, model: string, year: string, color: string, registrationNumber: string,
    registrationState: string, VIN: string, insuranceNumber: string
}) => {
    console.log('Vehicle  called', data);

    return {
        type: CALL_VEL_REG_API_SUCCESS,
        data
    };
};

export const getServiceReceipt = (data: { authToken: string, vehicleId: string, serviceProviderId: string }) => {
    console.log('get service receipt called', data);

    return {
        type: GET_RECEIPT_DETAILS,
        data
    };
};
export const approveServiceReceipt = (data: { authToken: string, vehicleId: string, serviceProviderId: string, date: string, mileage: string, description: string, price: string }) => {
    console.log('approve service receipt called', data);

    return {
        type: APPROVE_RECEIPT,
        data
    };
};
export const resetApprovedFlag = () => {
    console.log('reset approved flag called');

    return {
        type: RESET_APPROVED_RECEIPT_FLAG,
        data: {}
    };
};
export const signout = (data: { authToken: string }) => {
    console.log('signout  called');

    return {
        type: USER_SIGN_OUT,
        data
    };
};
