import { createConnectAccountAPI } from "../APIS/API";
import { CREATE_CONNECT_ACCOUNT_STRIPE, CREATE_CONNECT_ACCOUNT_STRIPE_LOADING } from "./type";


export const createConnectAccountOnStripe = (data) => {

    return async dispatch => {
        try {

            dispatch({ type: CREATE_CONNECT_ACCOUNT_STRIPE_LOADING })

            const respon = await createConnectAccountAPI(data)

            dispatch(setcreateConnectAccountOnStripe(respon.data))


        } catch (err) { console.log(err) }

    }



}

const setcreateConnectAccountOnStripe = data => ({
    type: CREATE_CONNECT_ACCOUNT_STRIPE,
    payload: {
        data,
    },
})