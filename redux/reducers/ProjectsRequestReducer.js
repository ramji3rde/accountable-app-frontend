import { GET_PPROJECT_REQUEST, GET_PPROJECT_REQUEST_LOADING } from "../action/type"


const initalState = {
    projectsRequest: [],
    loading: false,
    clientName: null
}

export const projectsRequestReducer = (state = initalState, action) => {
    switch (action.type) {
        case GET_PPROJECT_REQUEST:
            return {

                ...state,

                projectsRequest: action.payload.data,
                clientName: action.payload.clientName,

                loading: false

            };
        case GET_PPROJECT_REQUEST_LOADING:
            return {

                ...state,

                loading: true

            };
        default:
            return state;
    }
};
