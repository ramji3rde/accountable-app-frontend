import { GET_TENANTS_PROJECT_REQUEST, GET_TENANTS_PROJECT_REQUEST_LOADING } from "../action/type";

const initalState = {
    tenantsUserList: [],
    loading: false,
    clientName: null
}


export const getTenantsUserListReducer = (state = initalState, action) => {
    switch (action.type) {
        case GET_TENANTS_PROJECT_REQUEST:
            return {

                ...state,

                tenantsUserList: action.payload.data,

                loading: false,

                clientName: action.payload.clientName

            };
        case GET_TENANTS_PROJECT_REQUEST_LOADING:
            return {

                ...state,

                loading: true

            };
        default:
            return state;
    }
};