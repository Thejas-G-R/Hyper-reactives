import axios from "axios";
import { SIGNOUT_USER_URL, USER_APPROVE_RECEIPT_URL, USER_CARS_API_URL, USER_CAR_SERVICE_HISTORY_URL, USER_GET_ALL_SERVICE_PROVIDERS_URL, USER_GET_SERVICE_RECEIPT_URL, USER_SIGNIN_API_URL, USER_SIGNUP_API_URL, VEHICLE_REG_URL } from "./url_helper";

//apply base url for axios
const REACT_APP_APP_URL = "http://localhost:8000";

const userApi = axios.create({
    baseURL: REACT_APP_APP_URL + "/user",
});

const baseApi = axios.create({
    baseURL: REACT_APP_APP_URL,
})


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
export async function getallServiceProvidersAPICall(data: { authToken: string }) {
    const url = USER_GET_ALL_SERVICE_PROVIDERS_URL
    return await baseApi
        .get(url, {
            headers: {
                "Content-Type": "application/json",
                "authorization": "Bearer " + data.authToken
            }
        })
}
export async function getServiceReceiptAPICall(data: { authToken: string, vehicleId: string, serviceProviderId: string }) {
    const url = USER_GET_SERVICE_RECEIPT_URL
    return await userApi
        .post(url, { vehicleId: data.vehicleId, serviceProviderId: data.serviceProviderId }, {
            headers: {
                "Content-Type": "application/json",
                "authorization": "Bearer " + data.authToken
            }
        })
}
export async function approveReceiptAPICall(data: { authToken: string, vehicleId: string, serviceProviderId: string, date: string, mileage: string, description: string, price: string }) {
    const url = USER_APPROVE_RECEIPT_URL
    return await userApi
        .post(url, { vehicleId: data.vehicleId, serviceProviderId: data.serviceProviderId, date: data.date, mileage: data.mileage, description: data.description, price: data.price }, {
            headers: {
                "Content-Type": "application/json",
                "authorization": "Bearer " + data.authToken
            }
        })
}
export async function vehicleRegAPI(data: {
    authToken: string, make: string, model: string, year: string, color: string, registrationNumber: string,
    registrationState: string, VIN: string, insuranceNumber: string
}) {
    const url = VEHICLE_REG_URL
    return await userApi
        .post(url, data, {
            headers: {
                "Content-Type": "application/json",
                "authorization": "Bearer " + data.authToken
            }
        })
}

export async function signoutApi(data: { authToken: string }) {
    const url = SIGNOUT_USER_URL
    return await userApi
        .get(url, {
            headers: {
                "Content-Type": "application/json",
                "authorization": "Bearer " + data.authToken
            }
        })
}