import { PROJECT_DETAIL, PROJECT_DETAIL_LOADING } from "../action/type"


const initalState = {
    details: null,
    loading: false
}


export const ProjectDetailsReducer = (state = initalState, action) => {
    switch (action.type) {
        case PROJECT_DETAIL:
            return {

                ...state,

                details: action.payload.data,

                loading: false
            };
        case PROJECT_DETAIL_LOADING:
            return {

                ...state,

                loading: true
            };

        default:
            return state;

    }
}