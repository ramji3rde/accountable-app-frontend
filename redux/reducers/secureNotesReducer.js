import { GET_SECURE_NOTES, GET_SECURE_NOTES_LOADING } from "../action/type";

const initialState = {
    secureNotesList: [],
    loading: false,
    clientName: 'secureNotesList',
}

export const getAllSecureNotesReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_SECURE_NOTES: {
            return {
                ...state,
                secureNotesList: action.payload.data,

                clientName: action.payload.clientName,

                loading: false
            }
        }
        case GET_SECURE_NOTES_LOADING: {
            return {
                ...state,
                loading: true
            }
        }

        default:
            return state
    }
}