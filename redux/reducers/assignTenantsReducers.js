import { GET_ASSIGN_TENANTS, DELETE_ASSIGN_TENANTS, RESET_ASSIGN_TENANTS } from "../action/type"

const initalState = {
    getAssignTenants: [],
}

export const assignTenantsReducers = (state = initalState, action) => {

    switch (action.type) {
        case GET_ASSIGN_TENANTS:
            return {

                ...state,

                getAssignTenants: [...state.getAssignTenants, action.payload.data],


            };
        case DELETE_ASSIGN_TENANTS:
            const Delete_item = state.getAssignTenants.filter((item, index) => item !== action.payload.data)
            return {

                ...state,

                getAssignTenants: Delete_item,

            };
        case RESET_ASSIGN_TENANTS:
            return {

                ...state,

                getAssignTenants: [],

            };
        default:
            return state
    }
};