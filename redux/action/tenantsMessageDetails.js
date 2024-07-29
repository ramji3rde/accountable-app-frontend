import { getDetailsMessage } from "../APIS/API";
import { GET_TENANTS_MESSAGE_DETAILS, GET_TENANTS_MESSAGE_DETAILS_LOADING } from "./type";

export const getMessageUserDetails = (data) => {
    return async dispatch => {
        try {

            dispatch({ type: GET_TENANTS_MESSAGE_DETAILS_LOADING })

            const respon = await getDetailsMessage(data);

            dispatch(setMessageUserDetails(respon.data))

        } catch (error) { }

    };
};


const setMessageUserDetails = (data) => ({
    type: GET_TENANTS_MESSAGE_DETAILS,
    payload: {
        data,
        clientName: 'projectMessage',
    },

})