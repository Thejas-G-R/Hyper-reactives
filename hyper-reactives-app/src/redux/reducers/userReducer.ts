import { USER_SIGN_UP_SUCCESS } from "../types/actionTypes";

var initialState = {
    signInSuccess: false
}

export const userReducer = (state = initialState, action: { type: string, data: {} }) => {

    switch (action.type) {
        case USER_SIGN_UP_SUCCESS:
            console.log(action.data, "reducer data");
            if (action.data === "Success")
                return { ...state, signInSuccess: true };
            return state

        default:
            return state
    }
}