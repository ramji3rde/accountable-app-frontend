import { TenantsGetAlllist } from "../APIS/API";
import { GET_TENANTS_PROJECT_REQUEST, GET_TENANTS_PROJECT_REQUEST_LOADING } from "./type";

export const getTenantsUserList = (data) => {
    return async dispatch => {
        try {

            dispatch({ type: GET_TENANTS_PROJECT_REQUEST_LOADING })

            const respon = await TenantsGetAlllist(data);

            dispatch(setTenantsUserList(respon.data))

        } catch (error) { }

    };
};


const setTenantsUserList = (data) => ({
    type: GET_TENANTS_PROJECT_REQUEST,
    payload: {
        data,
        clientName: 'manager',
    },

})