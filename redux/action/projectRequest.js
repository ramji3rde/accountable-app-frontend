import { AdminProjectRequestListAPI } from "../APIS/API";
import { GET_PPROJECT_REQUEST, GET_PPROJECT_REQUEST_LOADING } from "./type";

export const getProjectRequest = (data) => {
    return async dispatch => {
        try {



            dispatch({ type: GET_PPROJECT_REQUEST_LOADING })

            const respon = await AdminProjectRequestListAPI(data);

            dispatch(setProjectRequest(respon.data))

        } catch (error) {

            console.log(error)
        }


    };
};

const setProjectRequest = (data) => ({
    type: GET_PPROJECT_REQUEST,
    payload: {
        data,
        clientName: 'ProjectRequest',
    },

})