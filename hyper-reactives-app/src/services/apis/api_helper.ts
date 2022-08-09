import axios from "axios";
import { USER_CARS_API_URL, USER_SIGNIN_API_URL, USER_SIGNUP_API_URL } from "./url_helper";

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
        .then((response) => response.data);
}

export async function userSigninAPI(data: { email: string, password: string }) {
    const url = USER_SIGNIN_API_URL
    return await userApi
        .post(url, data, {
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then((response) => response.data);
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
        .then((response) => response.data);
}