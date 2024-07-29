import { GET_EMERGENCY_CONTACTS_DETAILS, GET_EMERGENCY_CONTACTS_DETAILS_LOADING } from "../action/type";


const initialState = {
    emergencyDetails: null,
    loading: false

}

export const emergencyContactsDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_EMERGENCY_CONTACTS_DETAILS: {
            return {
                ...state,
                emergencyDetails: action.payload,
                loading: false
            }
        }
        case GET_EMERGENCY_CONTACTS_DETAILS_LOADING: {
            return {
                ...state,
                loading: true,
            }
        }

        default:
            return state
    }
}