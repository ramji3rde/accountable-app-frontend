import { GET_PROFILE, GET_PROFILE_LOADING } from "../action/type"

const initalState = {
    profile: null,
    loading: false
}

export const getProfileReducer = (state = initalState, action) => {

    switch (action.type) {
        case GET_PROFILE:
            return {

                ...state,

                profile: action.payload.data,

                loading: false

            };
        case GET_PROFILE_LOADING:
            return {

                ...state,


                loading: true
            }
        default:
            return state
    }
};