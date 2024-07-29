import { getAllExpensesAPI } from "../APIS/API";
import { GET_EXPENSES , GET_EXPENSES_LOADING} from "./type";



export const getExpense = (data) => {
    return async dispatch => {
        try {
            dispatch({type : GET_EXPENSES_LOADING})

            const res  = await getAllExpensesAPI(data)
            dispatch(setExpenses(res?.data))

        } catch (error) {
            
        }
    }
}

const setExpenses = (data) => ({
   type: GET_EXPENSES,
   payload: {
    data,
    clientName: 'Expenses',
   }
})