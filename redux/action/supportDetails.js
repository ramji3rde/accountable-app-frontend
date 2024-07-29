import { getSingleSupportTeamAPI } from "../APIS/API"
import { SUPPORT_DETAIL, SUPPORT_DETAIL_LOADING } from "./type"


export const singleSupport = (id) => {
    return async dispatch => {
        try {

            dispatch({ type: SUPPORT_DETAIL_LOADING })


            const respon = await getSingleSupportTeamAPI(id)

            dispatch(setSingleSupport(respon))


        } catch (err) { console.log(err) }
    }


}

const setSingleSupport = data => ({
    type: SUPPORT_DETAIL,
    payload: {
        data,
    },
})

