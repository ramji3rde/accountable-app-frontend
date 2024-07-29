import { GET_SECURE_NOTES_DETAILS, GET_SECURE_NOTES_DETAILS_LOADING } from "../action/type";


const initialState = {
    secureNotesDetails: null,
    loading: false

}

export const secureNotesDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_SECURE_NOTES_DETAILS: {
            return {
                ...state,
                secureNotesDetails: action.payload,
                loading: false
            }
        }
        case GET_SECURE_NOTES_DETAILS_LOADING: {
            return {
                ...state,
                loading: true,
            }
        }

        default:
            return state
    }
}