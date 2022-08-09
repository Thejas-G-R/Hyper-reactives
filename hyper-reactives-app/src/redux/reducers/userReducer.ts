import { USER_SIGN_UP_SUCCESS, USER_SIGN_IN_SUCCESS } from "../types/actionTypes";

var initialState = {
    signInSuccess: false,
    signUpSuccess: false,
}

export const userReducer = (state = initialState, action: { type: string, data: any }) => {

    switch (action.type) {
        case USER_SIGN_UP_SUCCESS:
            console.log(action.data, "reducer data");
            if (action.data === "Success")
                return { ...state, signUpSuccess: true };
            return state
        case USER_SIGN_IN_SUCCESS:
            const { token, user } = action.data;
            const { name, email } = user;
            if (action.data && action.data.token.length > 0) {
                return { ...state, authToken: token, name: name, emailId: email, signInSuccess: true }
            }
            return state
        default:
            return state
    }
}
