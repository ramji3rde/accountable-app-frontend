import { GET_ASSIGN_TENANTS } from "./type";


export const getAssignTenants = (item) => {

    return async dispatch => {
        try {

            dispatch(setGetAssignTenants(item))


        } catch (err) { console.log(err) }

    }

}



const setGetAssignTenants = data => ({
    type: GET_ASSIGN_TENANTS,
    payload: {
        data,
    },
})