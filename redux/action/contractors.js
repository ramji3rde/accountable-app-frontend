import { filterContractorsAPI, getContractorsAPI } from "../APIS/API"
import { GET_CONTRACTORS, GET_CONTRACTORS_LOADING } from "./type"


export const getContractors = () => {
    return async dispatch => {
        try {

            dispatch({ type: GET_CONTRACTORS_LOADING })

            const respon = await getContractorsAPI();

            dispatch(setContractors(respon.data))

        } catch (error) {

        }


    };
};


export const getContractorsFilter = (data) => {
    return async dispatch => {
        try {

            dispatch({ type: GET_CONTRACTORS_LOADING })

            const respon = await filterContractorsAPI(data)

            dispatch(setContractors(respon.data))

        } catch (error) {

            console.log(error)

        }
    }
}

const setContractors = data => ({
    type: GET_CONTRACTORS,
    payload: {
        data,
        clientName: 'Contractors'
    },

})