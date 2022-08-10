import axios from 'axios';
import { takeEvery, put } from 'redux-saga/effects'
import { getUserCarsAPICall, getUserCarServiceHistoryAPICall, userSigninAPI, userSignupAPI, vehicleRegAPI } from '../../services/apis/api_helper';
import { CALL_CAR_SERVICE_HISTORY_API, CALL_LOGIN_API, CALL_SIGN_UP_API, CALL_USER_CARS_API, CAR_SERVICE_HISTORY_SUCCESS, GET_CAR_SERVICE_HISTORY, USER_GET_CARS_SUCCESS, USER_SIGN_IN_SUCCESS, USER_SIGN_UP_SUCCESS, VEHICLE_REG_SUCCESS, CALL_VEL_REG_API_SUCCESS } from '../types/actionTypes'
type Params = { data: { name: string, email: string, password: string }, type: string }
function* userSignUpSaga({ data }: Params) {
    console.log("saga code");
    var result: any;
    yield userSignupAPI(data).then((response) => {
        result = response.data
    }).catch((err) => console.log(err));
    if (result && result.message === "Success")
        yield put({ type: USER_SIGN_UP_SUCCESS, data: result.message })

}

type param = { data: { email: string, password: string }, type: string }
function* userLoginSaga({ data }: param) {
    var result: any;
    yield userSigninAPI(data).then((response) => {
        result = response.data
    }).catch((err) => console.log(err));
    if (result && result.token && result.token.length > 0)
        yield put({ type: USER_SIGN_IN_SUCCESS, data: result })
}

type carsParam = { data: { authToken: string }, type: string }
function* getUserCars({ data }: carsParam) {
    var result: any;
    yield getUserCarsAPICall(data).then((response) => {
        result = response.data
    }).catch((err) => console.log(err));
    if (result && result.result.vehicles && result.result.vehicles.length >= 0)
        yield put({ type: USER_GET_CARS_SUCCESS, data: result })
}

type serviceParam = { data: { authToken: string, vehicleId: string }, type: string }
function* getCarServiceHistory({ data }: serviceParam) {
    var result: any;
    yield getUserCarServiceHistoryAPICall(data).then((response) => {
        result = response.data
    }).catch((err) => console.log(err));
    if (result && result.result.serviceHistory && result.result.serviceHistory.length >= 0)
        yield put({ type: CAR_SERVICE_HISTORY_SUCCESS, data: result })
}


type vehicleParams = { data: { authToken: string,  make:string, model:string , year: string,color: string,registrationNumber: string,registrationState: string, VIN: string, insuranceNumber: string }, type: string  }
function* vehicleRegSaga({ data }: vehicleParams) {
    console.log("saga code");
    var result: any;
    yield vehicleRegAPI(data).then((response) => {
        result = response.data
    }).catch((err) => console.log(err));
    if (result && result.message === "Success")
        yield put({ type: VEHICLE_REG_SUCCESS, data: result.message })

}

function* userSaga() {
    yield takeEvery(CALL_SIGN_UP_API, userSignUpSaga);
    yield takeEvery(CALL_LOGIN_API, userLoginSaga);
    yield takeEvery(CALL_USER_CARS_API, getUserCars);
    yield takeEvery(GET_CAR_SERVICE_HISTORY, getCarServiceHistory);
    yield takeEvery(CALL_VEL_REG_API_SUCCESS, vehicleRegSaga);

}

export default userSaga