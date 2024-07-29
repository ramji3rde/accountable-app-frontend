import { getSingleIncidentsAPI } from "../APIS/API"
import { INCIDENTS_DETAILS, INCIDENTS_DETAILS_LOADING } from "./type"



export const getIncidentsDetails = (id) => {
    return async dispatch => {
        try {
            dispatch({ type: INCIDENTS_DETAILS_LOADING })

            const response = await getSingleIncidentsAPI({ incidentId: id })

            dispatch(setIncidentsDetails(response.data.data))

        } catch (error) {
            console.log(error)
        }
    }
}

const setIncidentsDetails = (data) => ({
    type: INCIDENTS_DETAILS,
    payload: {
        data,
    },
})