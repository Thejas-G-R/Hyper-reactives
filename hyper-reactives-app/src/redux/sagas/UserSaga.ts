import axios from 'axios';
import { takeEvery, put } from 'redux-saga/effects'
import { vehicleRegAPI, approveReceiptAPICall, getallServiceProvidersAPICall, getServiceReceiptAPICall, getUserCarsAPICall, getUserCarServiceHistoryAPICall, userSigninAPI, userSignupAPI } from '../../services/apis/api_helper';
import { CALL_LOGIN_API, CALL_SIGN_UP_API, CALL_USER_CARS_API, CAR_SERVICE_HISTORY_SUCCESS, GET_ALL_SERVICE_PROVIDERS, GET_ALL_SERVICE_PROVIDERS_SUCCESS, GET_CAR_SERVICE_HISTORY, VEHICLE_REG_SUCCESS, CALL_VEL_REG_API_SUCCESS, GET_RECEIPT_DETAILS, USER_GET_CARS_SUCCESS, USER_SIGN_IN_SUCCESS, USER_SIGN_UP_SUCCESS, GET_RECEIPT_DETAILS_SUCCESS, APPROVE_RECEIPT, APPROVE_RECEIPT_SUCCESS, RESET_APPROVED_STATE_FLAG } from '../types/actionTypes'
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

type serviceProvidersParam = { data: { authToken: string }, type: string }
function* getAllServiceProviders({ data }: serviceProvidersParam) {
    var result: any
    yield getallServiceProvidersAPICall(data).then((response) => {
        result = response.data
    }).catch((err) => console.log(err));
    if (result && result.serviceProviders && result.serviceProviders.ServiceProviders && result.serviceProviders.ServiceProviders.length > 0) {
        yield put({ type: GET_ALL_SERVICE_PROVIDERS_SUCCESS, data: result.serviceProviders })
    }
}

type getReceiptParams = { data: { authToken: string, vehicleId: string, serviceProviderId: string }, type: string }
function* getServiceReceipt({ data }: getReceiptParams) {
    var result: any
    yield getServiceReceiptAPICall(data).then((response) => {
        result = response.data
    }).catch((err) => console.log(err));
    if (result && result.code === 0 && result.message === "Success") {
        yield put({ type: GET_RECEIPT_DETAILS_SUCCESS, data: result.result })
    }
}

type vehicleParams = { data: { authToken: string, make: string, model: string, year: string, color: string, registrationNumber: string, registrationState: string, VIN: string, insuranceNumber: string }, type: string }
function* vehicleRegSaga({ data }: vehicleParams) {
    console.log("saga code");
    var result: any;
    yield vehicleRegAPI(data).then((response) => {
        result = response.data
    }).catch((err) => console.log(err));
    if (result && result.message === "Success")
        yield put({ type: VEHICLE_REG_SUCCESS, data: result.message })

}
type approveServiceParams = { data: { authToken: string, vehicleId: string, serviceProviderId: string, date: string, mileage: string, description: string, price: string }, type: string }
function* approveServiceReceipt({ data }: approveServiceParams) {
    var result: any
    yield approveReceiptAPICall(data).then((response) => {
        result = response.data
    }).catch((err) => console.log(err));
    if (result && result.code === 0 && result.message === "Success") {
        yield put({ type: APPROVE_RECEIPT_SUCCESS, data: result.result })
    }
}
type resetParam = { type: string }
function* resetFlag({ type }: resetParam) {
    yield put({ type: RESET_APPROVED_STATE_FLAG })
}

function* userSaga() {
    yield takeEvery(CALL_SIGN_UP_API, userSignUpSaga);
    yield takeEvery(CALL_LOGIN_API, userLoginSaga);
    yield takeEvery(CALL_USER_CARS_API, getUserCars);
    yield takeEvery(GET_CAR_SERVICE_HISTORY, getCarServiceHistory);
    yield takeEvery(CALL_VEL_REG_API_SUCCESS, vehicleRegSaga);
    yield takeEvery(GET_ALL_SERVICE_PROVIDERS, getAllServiceProviders);
    yield takeEvery(GET_RECEIPT_DETAILS, getServiceReceipt);
    yield takeEvery(APPROVE_RECEIPT, approveServiceReceipt);
    yield takeEvery(APPROVE_RECEIPT, resetFlag);

}

export default userSaga