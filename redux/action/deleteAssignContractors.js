import { DELETE_ASSIGN_CONTRACTORS } from "./type";


export const deleteAssignContractors = (item) => {

    return async dispatch => {
        try {

            dispatch(setDeleteAssignContractors(item))

        } catch (err) { console.log(err) }
    }
}


const setDeleteAssignContractors = data => ({
    type: DELETE_ASSIGN_CONTRACTORS,
    payload: {
        data,
    },
})