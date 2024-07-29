import { GET_ASSIGN_CONTRACTORS } from "./type";


export const getAssignContractors = (item) => {

    return async dispatch => {
        try {

            dispatch(setGetAssignContractors(item))


        } catch (err) { console.log(err) }

    }

}



const setGetAssignContractors = data => ({
    type: GET_ASSIGN_CONTRACTORS,
    payload: {
        data,
    },
})