import { GET_ASSIGN_CONTRACTORS, DELETE_ASSIGN_CONTRACTORS, RESET_ASSIGN_CONTRACTORS } from "../action/type"

const initalState = {
    getAssignContractors: [],
}

export const getAssignContractorsReducers = (state = initalState, action) => {

    switch (action.type) {
        case GET_ASSIGN_CONTRACTORS:
            return {

                ...state,

                getAssignContractors: [...state.getAssignContractors, action.payload.data],


            };
        case DELETE_ASSIGN_CONTRACTORS:
            const Delete_item = state.getAssignContractors.filter((item, index) => item !== action.payload.data)
            return {

                ...state,

                getAssignContractors: Delete_item,

            };
        case RESET_ASSIGN_CONTRACTORS:
            return {

                ...state,

                getAssignContractors: [],

            };
        default:
            return state
    }
};