import { getDetailsProjectRequest } from "../APIS/API";
import { GET_TENANTS_PROJECT_REQUEST_DETAILS, GET_TENANTS_PROJECT_REQUEST_DETAILS_LOADING } from "./type";

export const getTenantsUserDetails = (data) => {
    return async dispatch => {
        try {

            dispatch({ type: GET_TENANTS_PROJECT_REQUEST_DETAILS_LOADING })

            const respon = await getDetailsProjectRequest(data);

            dispatch(setTenantsUserList(respon.data))

        } catch (error) { }

    };
};


const setTenantsUserList = (data) => ({
    type: GET_TENANTS_PROJECT_REQUEST_DETAILS,
    payload: {
        data,
        clientName: 'projectRequestTenants',
    },

})