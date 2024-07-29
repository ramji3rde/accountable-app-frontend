import { getContractorsDetailAPI } from "../APIS/API"
import { CONTRACTORS_DETAIL, CONTRACTORS_DETAIL_LOADING } from "./type";


export const getContractorsDetail = (id) => {
    return async dispatch => {
        try {

            dispatch({ type: CONTRACTORS_DETAIL_LOADING })

            const respon = await getContractorsDetailAPI(id)

            dispatch(setContractorsDetail(respon.data))

        } catch (error) { }
    };
};

const setContractorsDetail = data => ({
    type: CONTRACTORS_DETAIL,
    payload: {
        data,
    }
})