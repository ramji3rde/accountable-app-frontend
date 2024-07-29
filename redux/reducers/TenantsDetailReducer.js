import { TENANTS_DETAIL_LOADING, TENANTS_DETAIL } from "../action/type";

const initalState = {
    tenantsDetails: null,
    loading: false
}

export const tenantsDetailsReducer = (state = initalState, action) => {
    switch (action.type) {
        case TENANTS_DETAIL:
            return {

                ...state,

                tenantsDetails: action.payload.data,

                loading: false

            };
        case TENANTS_DETAIL_LOADING:
            return {

                ...state,

                loading: true

            };
        default:
            return state;
    }
};