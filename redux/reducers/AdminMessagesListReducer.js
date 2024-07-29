import { GET_ADMIN_MESSAGE, GET_ADMIN_MESSAGE_LOADING } from "../action/type";

const initalState = {
    adminMessageList: [],
    loading: false,
    clientName: null
}


export const getAdminMessageListReducer = (state = initalState, action) => {
    switch (action.type) {
        case GET_ADMIN_MESSAGE:
            return {

                ...state,

                adminMessageList: action.payload.data,

                loading: false,

                clientName: action.payload.clientName

            };
        case GET_ADMIN_MESSAGE_LOADING:
            return {

                ...state,

                loading: true

            };
        default:
            return state;
    }
};