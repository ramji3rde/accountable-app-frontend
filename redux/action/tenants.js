import { filterTenantsAPI, getTenantsAPI } from "../APIS/API";
import { GET_TENANTS, GET_TENANTS_LOADING } from "./type";

export const getTenants = () => {
    return async dispatch => {
        try {

            dispatch({ type: GET_TENANTS_LOADING })

            const respon = await getTenantsAPI();

            dispatch(setTenants(respon.data))

        } catch (error) { }


    };
};


export const getTenantsFilter = (datas) => {
    return async dispatch => {
        try {



            dispatch({ type: GET_TENANTS_LOADING })

            const respon = await filterTenantsAPI(datas);

            dispatch(setTenants(respon.data))

        } catch (error) {

            console.log(error)
        }


    };
};

const setTenants = (data) => ({
    type: GET_TENANTS,
    payload: {
        data,
        clientName: 'Tenants',
    },

})