import { GET_EXPENSES, GET_EXPENSES_LOADING } from "../action/type";

const initialState = {
    expenses: [],
    loading: false,
    clientName: 'Expenses',
}

export const expenseReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_EXPENSES: {
            return {
                ...state,
                expenses: action.payload.data,

                clientName: action.payload.clientName,

                loading: false
            }
        }
        case GET_EXPENSES_LOADING: {
            return {
                ...state,
                loading: true
            }
        }

        default:
            return state
    }
}