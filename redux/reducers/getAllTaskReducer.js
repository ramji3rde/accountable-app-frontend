import { GET_TASK, GET_TASK_LOADING } from "../action/type"


const initalState = {
    task_group: null,
    loading: false
}


export const getAllTaskReducer = (state = initalState, action) => {
    switch (action.type) {
        case GET_TASK:
            return {

                ...state,

                task_group: action.payload.data,

                loading: false
            };
        case GET_TASK_LOADING:
            return {

                ...state,

                loading: true
            };
        default:
            return state;

    }
}