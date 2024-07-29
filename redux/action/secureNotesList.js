import { getALLSecureNotesAPI } from "../APIS/API";
import { GET_SECURE_NOTES, GET_SECURE_NOTES_LOADING } from "./type";



export const getAllSecureNotes = (data) => {
    return async dispatch => {
        try {
            dispatch({ type: GET_SECURE_NOTES_LOADING })

            const res = await getALLSecureNotesAPI(data)
            dispatch(setGetAllSecureNotes(res?.data))

        } catch (error) {

        }
    }
}

const setGetAllSecureNotes = (data) => ({
    type: GET_SECURE_NOTES,
    payload: {
        data,
        clientName: 'GET_SECURE_NOTES',
    }
})