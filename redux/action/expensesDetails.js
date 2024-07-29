import { getSingleExpensesAPI } from "../APIS/API"
import { EXPENSES_DETAILS, EXPENSES_DETAILS_LOADING } from "./type"



export const getExpensesDetails = (id) => {
    return async dispatch => {
        try {
            dispatch({ type: EXPENSES_DETAILS_LOADING })


            const response = await getSingleExpensesAPI({ expenseId: id })
            dispatch(setExpenseDetails(response.data.data))

        } catch (error) {
            console.log(error)
        }
    }
}

const setExpenseDetails = (data) => ({
    type: EXPENSES_DETAILS,
    payload: {
        data,
    },
})