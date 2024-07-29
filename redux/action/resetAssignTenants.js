import { RESET_ASSIGN_TENANTS } from "./type";


export const resetAssignTenants = () => {

    return async dispatch => {
        try {

            dispatch(setresetAssignTenants())

        } catch (err) { console.log(err) }
    }
}


const setresetAssignTenants = () => ({
    type: RESET_ASSIGN_TENANTS,
})