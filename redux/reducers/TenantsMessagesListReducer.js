import { GET_TENANTS_MESSAGE, GET_TENANTS_MESSAGE_LOADING } from "../action/type";

const initalState = {
    tenantsMessageList: [],
    loading: false,
    clientName: null
}


export const getTenantsMessageListReducer = (state = initalState, action) => {
    switch (action.type) {
        case GET_TENANTS_MESSAGE:
            return {

                ...state,

                tenantsMessageList: action.payload.data,

                loading: false,

                clientName: action.payload.clientName

            };
        case GET_TENANTS_MESSAGE_LOADING:
            return {

                ...state,

                loading: true

            };
        default:
            return state;
    }
};