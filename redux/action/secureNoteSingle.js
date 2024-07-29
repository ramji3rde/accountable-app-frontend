import { reactLocalStorage } from "reactjs-localstorage"
import { getSingleSecureNotesAPI } from "../APIS/API"
import { GET_SECURE_NOTES_DETAILS, GET_SECURE_NOTES_DETAILS_LOADING } from "./type"



export const getSingleSecureNotes = (id) => {

    const MasterPassword = reactLocalStorage.get('masterPassword')

    return async dispatch => {
        try {

            dispatch({ type: GET_SECURE_NOTES_DETAILS_LOADING })

            const response = await getSingleSecureNotesAPI({
                "note_id": id,
                "master_password": MasterPassword
            })
            dispatch(setGetSingleSecureNotes(response.data.data))

        } catch (error) {
            // console.log(error, 'error action Emergency details')
        }
    }
}

const setGetSingleSecureNotes = (data) => ({
    type: GET_SECURE_NOTES_DETAILS,
    payload: {
        data,
    },
})