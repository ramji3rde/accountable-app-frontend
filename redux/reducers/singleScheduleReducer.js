import { SINGLE_SCHEDULE_LOADING, SINGLE_SCHEDULE } from "../action/type";

const initalState = {
    singleSchedule: null,
    loading: false
}

export const singleScheduleReducer = (state = initalState, action) => {
    switch (action.type) {
        case SINGLE_SCHEDULE:
            return {

                ...state,

                singleSchedule: action.payload.data,

                loading: false,

            };

        case SINGLE_SCHEDULE_LOADING:
            return {

                ...state,

                loading: true,

            };
        default:
            return state;
    }
};