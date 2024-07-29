import { checkStripeUserAPI } from "../APIS/API";
import { CHECK_STRIPE_USER, CHECK_STRIPE_USER_LOADING } from "./type";


export const checkStripeUser = (data) => {

    return async dispatch => {
        try {

            dispatch({ type: CHECK_STRIPE_USER_LOADING })

            const respon = await checkStripeUserAPI(data)

            dispatch(setStripeUser(respon.data))


        } catch (err) { console.log(err) }

    }



}

const setStripeUser = data => ({
    type: CHECK_STRIPE_USER,
    payload: {
        data,
    },
})