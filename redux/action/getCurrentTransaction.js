import { getTenantsTransactionAPI } from "../APIS/API"
import { GET_CURRENT_TRANSACTION, GET_CURRENT_TRANSACTION_LOANING } from "./type"



export const getCurrentTransaction = (data) => {
    return async dispatch => {
        try {

            dispatch({ type: GET_CURRENT_TRANSACTION_LOANING })

            const respon = await getTenantsTransactionAPI(data)

            dispatch(setCurrentTransaction(respon.data))


        } catch (error) {
            console.log(error)
        }
    }
}

const setCurrentTransaction = data => ({
    type: GET_CURRENT_TRANSACTION,
    payload: {
        data,
        clientName: 'CurrentTransaction',
    },
})