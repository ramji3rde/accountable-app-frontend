import { USER_ACTIVE, USER_ACTIVE_LOADING } from "../action/type";

const initalState = {
    user: null,
    loading: false
}

export const UserActiveReducer = (state = initalState, action) => {
    switch (action.type) {
        case USER_ACTIVE:
            return {
                ...state,

                user: action.payload.data,

                loading: false

            };
        case USER_ACTIVE_LOADING:
            return {

                ...state,

                loading: true

            };
        default:
            return state;

    };
};