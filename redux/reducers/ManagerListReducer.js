import { GET_MANAGER_LIST, GET_MANAGER_LIST_LOADING } from "../action/type";

const initalState = {
    managerList: [],
    loading: false,
    clientName: null
}


export const getManagerListReducer = (state = initalState, action) => {
    switch (action.type) {
        case GET_MANAGER_LIST:
            return {

                ...state,

                managerList: action.payload.data,

                loading: false,

                clientName: action.payload.clientName

            };
        case GET_MANAGER_LIST_LOADING:
            return {

                ...state,

                loading: true

            };
        default:
            return state;
    }
};