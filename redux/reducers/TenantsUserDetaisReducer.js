import { GET_TENANTS_PROJECT_REQUEST_DETAILS, GET_TENANTS_PROJECT_REQUEST_DETAILS_LOADING } from "../action/type";

const initalState = {
    tenantsUserDetails: null,
    loading: false,
    clientName: null
}


export const getTenantsUserDetailsReducer = (state = initalState, action) => {
    switch (action.type) {
        case GET_TENANTS_PROJECT_REQUEST_DETAILS:
            return {

                ...state,

                tenantsUserDetails: action.payload.data,

                loading: false,

                clientName: action.payload.clientName

            };
        case GET_TENANTS_PROJECT_REQUEST_DETAILS_LOADING:
            return {

                ...state,

                loading: true

            };
        default:
            return state;
    }
};