import { getSingleEmergencyContactAPI } from "../APIS/API"
import { GET_EMERGENCY_CONTACTS_DETAILS, GET_EMERGENCY_CONTACTS_DETAILS_LOADING } from "./type"



export const getSingleEmergencyContact = (id) => {
    return async dispatch => {
        try {
            dispatch({ type: GET_EMERGENCY_CONTACTS_DETAILS_LOADING })


            const response = await getSingleEmergencyContactAPI({ "emergencyId": id })
            dispatch(setGetSingleEmergencyContact(response.data.data))

        } catch (error) {
            console.log(error)
        }
    }
}

const setGetSingleEmergencyContact = (data) => ({
    type: GET_EMERGENCY_CONTACTS_DETAILS,
    payload: {
        data,
    },
})