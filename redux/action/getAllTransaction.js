import {  getAllTransactionAPI } from "../APIS/API"
import { GET_ALL_TRANSACTION, GET_ALL_TRANSACTION_LOANING } from "./type"



export const getallTransaction = (data) => {
    return async dispatch => {
        try {

            dispatch({ type: GET_ALL_TRANSACTION_LOANING })

            const respon = await getAllTransactionAPI(data)

            dispatch(setTransaction(respon.data))


        } catch (error) {
            console.log(error)
        }
    }
}

const setTransaction = data => ({
    type: GET_ALL_TRANSACTION,
    payload: {
        data,
        clientName: 'Transaction',
    },
})