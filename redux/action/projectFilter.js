import { filterProjectsAPI } from "../APIS/API"
import { GET_PROJECTS, GET_PROJECTS_LOADING } from "./type"



export const getProjectFilter = (data) => {
    return async dispatch => {
        try {

            dispatch({ type: GET_PROJECTS_LOADING })

            const respon = await filterProjectsAPI(data)

            dispatch(setProjects(respon.data))


        } catch (error) {
            console.log(error)
        }
    }
}

const setProjects = data => ({
    type: GET_PROJECTS,
    payload: {
        data,
        clientName: 'Projects',
    },
})