import { GET_SUPPORT, GET_SUPPORT_LOADING } from "../action/type";


const initalState = {
    support: [],
    loading: false,
    clientName: null,
}

export const supportTeamReducer = (state = initalState, action) => {
    switch (action.type) {
        case GET_SUPPORT:
            return {

                ...state,

                support: action.payload.data,
                clientName: action.payload.clientName,

                loading: false
            };
        case GET_SUPPORT_LOADING:
            return {

                ...state,

                loading: true
            };
        default:
            return state

    }
};