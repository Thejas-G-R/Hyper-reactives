import axios from 'axios';
import { takeEvery, put } from 'redux-saga/effects'
import { userSignupAPI } from '../../services/apis/api_helper';
import { CALL_SIGN_UP_API, USER_SIGN_UP_SUCCESS } from '../types/actionTypes'
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

function* userSaga() {
    yield takeEvery(CALL_SIGN_UP_API, userSignUpSaga)
}

export default userSaga