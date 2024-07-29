import { GET_CONTRACTORS, GET_CONTRACTORS_LOADING } from "../action/type"

const initalState = {
    contractors: [],
    loading: false,
    clientName: null
}


export const contractorsReducer = (state = initalState, action) => {
    switch (action.type) {
        case GET_CONTRACTORS:
            return {

                ...state,

                contractors: action.payload.data,

                clientName: action.payload.clientName,

                loading: false

            };
        case GET_CONTRACTORS_LOADING:
            return {

                ...state,

                loading: true

            };
        default:
            return state;
    }
};


