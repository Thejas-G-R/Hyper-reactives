import { USER_SIGN_UP_SUCCESS, USER_SIGN_IN_SUCCESS, USER_GET_CARS_SUCCESS, CAR_SERVICE_HISTORY_SUCCESS, VEHICLE_REG_SUCCESS, GET_ALL_SERVICE_PROVIDERS_SUCCESS, GET_RECEIPT_DETAILS_SUCCESS, APPROVE_RECEIPT_SUCCESS, RESET_APPROVED_RECEIPT_FLAG, RESET_APPROVED_STATE_FLAG, SIGN_OUT_CURRENT_USER } from "../types/actionTypes";

var initialState = {
    signInSuccess: false,
    signUpSuccess: false,
    vehicleRegistrationSuccess: false,
    isServiceReceiptApproved: false,
    isAdmin: false
}

export const userReducer = (state = initialState, action: { type: string, data: any }) => {

    switch (action.type) {
        case USER_SIGN_UP_SUCCESS:
            console.log(action.data, "reducer data");
            if (action.data === "Success")
                return { ...state, signUpSuccess: true };
            return state
        case USER_SIGN_IN_SUCCESS:
            const { token, user, admin } = action.data;
            const { name, email } = user;
            if (action.data && action.data.token.length > 0) {
                return { ...state, authToken: token, name: name, emailId: email, signInSuccess: true, isAdmin: admin }
            }
            return state

        case USER_GET_CARS_SUCCESS:
            const vehicles = action.data.result.vehicles
            if (vehicles.length > 0)
                return { ...state, vehicles: [...vehicles], ownVehicles: true }
            else if (vehicles.length === 0)
                return { ...state, vehicles: [...vehicles], ownVehicles: false }
            return state

        case CAR_SERVICE_HISTORY_SUCCESS:
            const serviceHistory = action.data.result.serviceHistory
            if (serviceHistory.length > 0)
                return { ...state, serviceHistory: [...serviceHistory], hasServiceHistory: true }
            else if (serviceHistory.length === 0)
                return { ...state, serviceHistory: [...serviceHistory], hasServiceHistory: false }
            return state

        case VEHICLE_REG_SUCCESS:
            console.log(action.data, "reducer data");
            if (action.data === "Success")
                return { ...state, vehicleRegistrationSuccess: true };
            return state

        case GET_ALL_SERVICE_PROVIDERS_SUCCESS:
            const serviceProviders = action.data.ServiceProviders
            return { ...state, serviceProviders: [...serviceProviders] }

        case GET_RECEIPT_DETAILS_SUCCESS:
            let receiptData = action.data
            return { ...state, receiptData: { ...receiptData } }
        case APPROVE_RECEIPT_SUCCESS:
            return { ...state, isServiceReceiptApproved: true }

        case RESET_APPROVED_STATE_FLAG:
            return { ...state, isServiceReceiptApproved: false, receiptData: {} }

        case SIGN_OUT_CURRENT_USER:
            return { ...initialState }
        default:
            return state
    }
}
