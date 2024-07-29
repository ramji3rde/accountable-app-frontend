import { postProjectDetailsAPI } from "../APIS/API";
import { PROJECT_DETAIL_LOADING, PROJECT_DETAIL } from "./type"


export const ProjectDetail = (id) => {
    return async dispatch => {
        try {

            dispatch({ type: PROJECT_DETAIL_LOADING })

            const respon = await postProjectDetailsAPI(id);


            dispatch(setProjectDetail(respon))
        } catch (error) {
            console.log(error);
        }

    }
}

const setProjectDetail = data => ({
    type: PROJECT_DETAIL,
    payload: {
        data,
    },
})