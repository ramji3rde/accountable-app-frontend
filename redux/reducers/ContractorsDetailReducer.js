import { CONTRACTORS_DETAIL, CONTRACTORS_DETAIL_LOADING } from "../action/type"

const initalState = {
    contractorsDetail: null,
    loading: false
}


export const contractorsDetailReducer = (state = initalState, action) => {
    switch (action.type) {
        case CONTRACTORS_DETAIL:
            return {

                ...state,

                contractorsDetail: action.payload.data,

                loading: false

            };
        case CONTRACTORS_DETAIL_LOADING:
            return {

                ...state,

                loading: true

            };
        default:
            return state;
    }
};


