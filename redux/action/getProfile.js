import { getProfile } from "../APIS/API";
import { GET_PROFILE, GET_PROFILE_LOADING } from "./type";


export const getProfileData = () => {

    return async dispatch => {
        try {

            dispatch({ type: GET_PROFILE_LOADING })

            const respon = await getProfile()

            dispatch(setGetProfileData(respon.data))


        } catch (err) { console.log(err) }

    }



}

const setGetProfileData = data => ({
    type: GET_PROFILE,
    payload: {
        data,
    },
})