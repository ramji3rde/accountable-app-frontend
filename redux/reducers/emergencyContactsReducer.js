import { GET_EMERGENCY_CONTACTS, GET_EMERGENCY_CONTACTS_LOADING } from "../action/type";

const initialState = {
    emergencyContactsList: [],
    loading: false,
    clientName: 'EmergencyContactsList',
}

export const emergencyContactsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_EMERGENCY_CONTACTS: {
            return {
                ...state,
                emergencyContactsList: action.payload.data,

                clientName: action.payload.clientName,

                loading: false
            }
        }
        case GET_EMERGENCY_CONTACTS_LOADING: {
            return {
                ...state,
                loading: true
            }
        }

        default:
            return state
    }
}