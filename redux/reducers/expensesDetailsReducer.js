import { EXPENSES_DETAILS , EXPENSES_DETAILS_LOADING  } from "../action/type";


const initialState = {
    expenseDetails :null,
    loading : false

}

export const expenseDetailsReducer = (state = initialState , action)=>{
    switch (action.type) {
        case EXPENSES_DETAILS:{
            return {
                ...state,
                 expenseDetails : action.payload,
                 loading:false
            }
        }
          case EXPENSES_DETAILS_LOADING:{
            return {
                ...state ,
                loading:true,
            }
          }
    
        default:
           return state
    }
}