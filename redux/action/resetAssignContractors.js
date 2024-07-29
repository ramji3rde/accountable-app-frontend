import { RESET_ASSIGN_CONTRACTORS } from "./type";


export const resetAssignContractors = () => {

    return async dispatch => {
        try {

            dispatch(setresetAssignContractors())

        } catch (err) { console.log(err) }
    }
}


const setresetAssignContractors = () => ({
    type: RESET_ASSIGN_CONTRACTORS,
})