import { getMessageslist } from "../APIS/API";
import { GET_TENANTS_MESSAGE, GET_TENANTS_MESSAGE_LOADING } from "./type";

export const getTenantMessageList = (data) => {
    return async dispatch => {
        try {

            dispatch({ type: GET_TENANTS_MESSAGE_LOADING })

            const respon = await getMessageslist(data);

            dispatch(setTenantsMessagesList(respon.data))

        } catch (error) { }

    };
};


const setTenantsMessagesList = (data) => ({
    type: GET_TENANTS_MESSAGE,
    payload: {
        data,
        clientName: 'projectMessage',
    },

})