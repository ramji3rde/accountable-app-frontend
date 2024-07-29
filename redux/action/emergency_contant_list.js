import { getAllEmergencyContactAPI } from "../APIS/API";
import { GET_EMERGENCY_CONTACTS, GET_EMERGENCY_CONTACTS_LOADING } from "./type";



export const getEmergencyContanctFilter = (data) => {
    return async dispatch => {
        try {
            dispatch({ type: GET_EMERGENCY_CONTACTS_LOADING })

            const res = await getAllEmergencyContactAPI(data)
            dispatch(setGetEmergencyContancts(res?.data))

        } catch (error) {

        }
    }
}

const setGetEmergencyContancts = (data) => ({
    type: GET_EMERGENCY_CONTACTS,
    payload: {
        data,
        clientName: 'EMERGENCY_CONTACTS',
    }
})