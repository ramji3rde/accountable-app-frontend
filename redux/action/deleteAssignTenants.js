import { DELETE_ASSIGN_TENANTS } from "./type";


export const deleteAssignTenants = (item) => {

    return async dispatch => {
        try {

            dispatch(setDeleteAssignTenants(item))

        } catch (err) { console.log(err) }
    }
}


const setDeleteAssignTenants = data => ({
    type: DELETE_ASSIGN_TENANTS,
    payload: {
        data,
    },
})