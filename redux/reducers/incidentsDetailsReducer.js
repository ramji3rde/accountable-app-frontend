import { INCIDENTS_DETAILS, INCIDENTS_DETAILS_LOADING, } from "../action/type";


const initalState = {
  incidentsDetails: null,
  loading: false
}

export const incidentsDetailsReducer = (state = initalState, action) => {
  switch (action.type) {
    case INCIDENTS_DETAILS:
      return {

        ...state,

        incidentsDetails: action.payload.data,

        loading: false

      }
    case INCIDENTS_DETAILS_LOADING:
      return {

        ...state,

        loading: true

      }

    default:
      return state;
  }

}