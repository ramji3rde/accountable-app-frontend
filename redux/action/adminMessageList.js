import { adminGetAllMessage } from "../APIS/API";
import { GET_ADMIN_MESSAGE, GET_ADMIN_MESSAGE_LOADING } from "./type";

export const getAdminMessageList = (data) => {
    return async dispatch => {
        try {

            dispatch({ type: GET_ADMIN_MESSAGE_LOADING })

            const respon = await adminGetAllMessage(data);

            dispatch(setAdminMessagesList(respon.data))

        } catch (error) { }

    };
};


const setAdminMessagesList = (data) => ({
    type: GET_ADMIN_MESSAGE,
    payload: {
        data,
        clientName: 'adminMessageList',
    },

})