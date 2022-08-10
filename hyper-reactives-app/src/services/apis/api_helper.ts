import axios from "axios";
import { USER_CARS_API_URL, USER_CAR_SERVICE_HISTORY_URL, USER_SIGNIN_API_URL, USER_SIGNUP_API_URL, VEHICLE_REG_URL } from "./url_helper";

//apply base url for axios
const REACT_APP_APP_URL = "http://localhost:8000/user";

const userApi = axios.create({
    baseURL: REACT_APP_APP_URL,
});


export async function userSignupAPI(data: { name: string, email: string, password: string }) {
    const url = USER_SIGNUP_API_URL
    return await userApi
        .post(url, data, {
            headers: {
                "Content-Type": "application/json",
            }
        })
}

export async function userSigninAPI(data: { email: string, password: string }) {
    const url = USER_SIGNIN_API_URL
    return await userApi
        .post(url, data, {
            headers: {
                "Content-Type": "application/json",
            }
        })
}


export async function getUserCarsAPICall(data: { authToken: string }) {
    const url = USER_CARS_API_URL
    return await userApi
        .get(url, {
            headers: {
                "Content-Type": "application/json",
                "authorization": "Bearer " + data.authToken
            }
        })
}

export async function getUserCarServiceHistoryAPICall(data: { authToken: string, vehicleId: String }) {
    const url = USER_CAR_SERVICE_HISTORY_URL
    return await userApi
        .post(url, { vehicleId: data.vehicleId }, {
            headers: {
                "Content-Type": "application/json",
                "authorization": "Bearer " + data.authToken
            }
        })
}



export async function vehicleRegAPI(data: { authToken: string, make:string, model:string , year: string,color: string,registrationNumber: string,
    registrationState: string, VIN: string, insuranceNumber: string }) {
    const url = VEHICLE_REG_URL
    return await userApi
        .post(url, data, {
            headers: {
                "Content-Type": "application/json",
                "authorization": "Bearer " + data.authToken
            }
        })
}