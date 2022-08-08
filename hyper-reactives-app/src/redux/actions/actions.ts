import { CALL_SIGN_UP_API } from "../types/actionTypes";


export const userSignup = (data: { name: string, email: string, password: string }) => {
    console.log('user sign up called', data);

    return {
        type: CALL_SIGN_UP_API,
        data
    };
};