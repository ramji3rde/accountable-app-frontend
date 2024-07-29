// import { FILTER_SCHEDULE, FILTER_SCHEDULE_LOADING } from "../action/type"
import { GET_ALL_TRANSACTION, GET_ALL_TRANSACTION_LOANING } from "../action/type"


const initalState = {
    transaction: [],
    loading: false,
    clientName: null
}

export const getallTransactionReducer = (state = initalState, action) => {
    switch (action.type) {
        case GET_ALL_TRANSACTION:
            return {

                ...state,

                transaction: action.payload.data,
                clientName: action.payload.clientName,

                loading: false

            };
        case GET_ALL_TRANSACTION_LOANING:
            return {

                ...state,

                loading: true

            };
        default:
            return state;
    }
};
