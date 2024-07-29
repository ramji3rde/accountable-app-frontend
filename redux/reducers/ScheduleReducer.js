import { FILTER_SCHEDULE, FILTER_SCHEDULE_LOADING } from "../action/type"


const initalState = {
    schedule: [],
    loading: false,
    clientName: null
}

export const scheduleReducer = (state = initalState, action) => {
    switch (action.type) {
        case FILTER_SCHEDULE:
            return {

                ...state,

                schedule: action.payload.data,
                clientName: action.payload.clientName,

                loading: false

            };
        case FILTER_SCHEDULE_LOADING:
            return {

                ...state,

                loading: true

            };
        default:
            return state;
    }
};
