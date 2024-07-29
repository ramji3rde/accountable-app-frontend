import { GET_PROJECTS, GET_PROJECTS_LOADING } from "../action/type"


const initalState = {
    projects: [],
    loading: false,
    clientName: null
}

export const projectsReducer = (state = initalState, action) => {
    switch (action.type) {
        case GET_PROJECTS:
            return {

                ...state,

                projects: action.payload.data,
                clientName: action.payload.clientName,

                loading: false

            };
        case GET_PROJECTS_LOADING:
            return {

                ...state,

                loading: true

            };
        default:
            return state;
    }
};
