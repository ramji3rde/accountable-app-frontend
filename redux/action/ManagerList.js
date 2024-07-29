import { AdminGetAllManager } from "../APIS/API";
import { GET_MANAGER_LIST, GET_MANAGER_LIST_LOADING } from "./type";

export const getAdminManagerList = (data) => {
    return async dispatch => {
        try {

            dispatch({ type: GET_MANAGER_LIST_LOADING })

            const respon = await AdminGetAllManager(data);

            dispatch(setManagerList(respon.data))

        } catch (error) { }

    };
};


const setManagerList = (data) => ({
    type: GET_MANAGER_LIST,
    payload: {
        data,
        clientName: 'manager',
    },

})