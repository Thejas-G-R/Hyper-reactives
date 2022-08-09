import axios from 'axios';
import { takeEvery, put } from 'redux-saga/effects'
import { userSigninAPI, userSignupAPI } from '../../services/apis/api_helper';
import { CALL_LOGIN_API, CALL_SIGN_UP_API, USER_SIGN_IN_SUCCESS, USER_SIGN_UP_SUCCESS } from '../types/actionTypes'
type Params = { data: { name: string, email: string, password: string }, type: string }
function* userSignUpSaga({ data }: Params) {
    console.log("saga code");
    var result: any;
    yield userSignupAPI(data).then((response) => {
        result = response
    }).catch((err) => console.log(err));
    if (result && result.message === "Success")
        yield put({ type: USER_SIGN_UP_SUCCESS, data: result.message })

}

type param = { data: { email: string, password: string }, type: string }
function* userLoginSaga({ data }: param) {
    var result: any;
    yield userSigninAPI(data).then((response) => {
        result = response
    }).catch((err) => console.log(err));
    if (result && result.token && result.token.length > 0)
        yield put({ type: USER_SIGN_IN_SUCCESS, data: result })
}
function* userSaga() {
    yield takeEvery(CALL_SIGN_UP_API, userSignUpSaga);
    yield takeEvery(CALL_LOGIN_API, userLoginSaga);
}

export default userSaga