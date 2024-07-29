import { reactLocalStorage } from "reactjs-localstorage"

export const token = (data = null) => {
    try {
        if (data) {

            return ({

                headers: {
                    'Authorization': `Bearer ${data}`
                }
            })
        } else {
            const token = reactLocalStorage.get("token", false)
            return ({
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

        }


    } catch (error) {

    }

}