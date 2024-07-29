import { getAllSupportTeamAPI } from "../APIS/API"
import { GET_SUPPORT, GET_SUPPORT_LOADING } from "./type"


export const getSupportTeam = (data) => {
    return async dispatch => {
        try {

            dispatch({ type: GET_SUPPORT_LOADING })

            const res = await getAllSupportTeamAPI(data)

            dispatch(setSupportTeam(res.data))


        } catch (err) { console.log(err, 'Suppport') }
    }
}

const setSupportTeam = data => ({
    type: GET_SUPPORT,
    payload: {
        data,
        clientName: 'Support',
    },
})