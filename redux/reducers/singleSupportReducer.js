import { SUPPORT_DETAIL, SUPPORT_DETAIL_LOADING } from "../action/type"

const initalState = {
    singleSupport: null,
    loading: false
}

export const singleSupportReducer = (state = initalState, action) => {
    switch (action.type) {
        case SUPPORT_DETAIL:

            return {
                ...state,

                singleSupport: action.payload.data,

                loading: false
            }

        case SUPPORT_DETAIL_LOADING:

            return {

                ...state,

                loading: true,


            }

        default:
            return state;
    }

}