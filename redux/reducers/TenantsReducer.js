import { reactLocalStorage } from "reactjs-localstorage";
import { GET_TENANTS, GET_TENANTS_LOADING } from "../action/type";

const initalState = {
    tenants: [],
    loading: false,
    clientName: null
}




export const tenantsReducer = (state = initalState, action) => {
    switch (action.type) {
        case GET_TENANTS:
            return {

                ...state,

                tenants: action.payload.data,

                loading: false,

                clientName: action.payload.clientName

            };
        case GET_TENANTS_LOADING:
            return {

                ...state,

                loading: true

            };
        default:
            return state;
    }
};