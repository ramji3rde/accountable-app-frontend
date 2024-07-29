import { USER_ACTIVE, USER_ACTIVE_LOADING } from "./type"


export const UserActive = (data) => {
    return async dispatch => {
        try {

            dispatch({ type: USER_ACTIVE_LOADING })

            dispatch(setUserActive(data))

        } catch (error) { }
    }
}

const setUserActive = data => ({
    type: USER_ACTIVE,
    payload: {
        data,
    },
})