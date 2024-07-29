import { GET_TENANTS_MESSAGE_DETAILS, GET_TENANTS_MESSAGE_DETAILS_LOADING } from "../action/type";

const initalState = {
    tenantsMessageDetails: [],
    loading: false,
    clientName: null
}


export const getTenantsMessageDetailsReducer = (state = initalState, action) => {
    switch (action.type) {
        case GET_TENANTS_MESSAGE_DETAILS:
            return {

                ...state,

                tenantsMessageDetails: action.payload.data,

                loading: false,

                clientName: action.payload.clientName

            };
        case GET_TENANTS_MESSAGE_DETAILS_LOADING:
            return {

                ...state,

                loading: true

            };
        default:
            return state;
    }
};