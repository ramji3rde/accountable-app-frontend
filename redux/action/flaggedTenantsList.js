import { getFlaggedTenantListAPI } from "../APIS/API";
import { TENANTS_DETAIL_LOADING, FLAGGED_TENANTS_LIST } from "./type";

export const getFlaggedTenantList = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: TENANTS_DETAIL_LOADING });
      const respon = await getFlaggedTenantListAPI();

      dispatch(setFlaggedTenantList(respon));
    } catch (error) {
      console.log(error);
    }
  };
};

const setFlaggedTenantList = (data) => ({
  type: FLAGGED_TENANTS_LIST,
  payload: {
    data,
  },
});
