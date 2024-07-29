import { GET_CURRENT_TRANSACTION, GET_CURRENT_TRANSACTION_LOANING } from "../action/type"


const initalState = {
    current_transaction: [],
    loading: false,
    clientName: null
}

export const getCurrentTransactionReducer = (state = initalState, action) => {
    switch (action.type) {
        case GET_CURRENT_TRANSACTION:
            return {

                ...state,

                current_transaction: action.payload.data,

                clientName: action.payload.clientName,

                loading: false

            };
        case GET_CURRENT_TRANSACTION_LOANING:
            return {

                ...state,

                loading: true

            };
        default:
            return state;
    }
};
