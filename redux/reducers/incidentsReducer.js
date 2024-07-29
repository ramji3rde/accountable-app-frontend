import { GET_INCIDENTS  , GET_INCIDENTS_LOADING} from "../action/type"


const initalState = {
    incidents: [],
    loading: false,
    clientName: null
}

export const incidentsReducer = (state =  initalState , action) =>{
    switch (action.type) {
        case GET_INCIDENTS:
             return {
                ...state ,

                incidents : action.payload.data,

                clientName: action.payload.clientName,

                loading: false
             }
          
        case GET_INCIDENTS_LOADING:
            return {
                ...state ,
                loading: true
            }
    
        default:
         return state
    }
}