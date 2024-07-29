import { getTenantDetailAPI } from "../APIS/API";
import { TENANTS_DETAIL_LOADING, TENANTS_DETAIL } from "./type";

export const getTenantDetail = (item) => {

  return async (dispatch) => {
    try {
      dispatch({ type: TENANTS_DETAIL_LOADING });

      const respon = await getTenantDetailAPI(item);

      dispatch(setTenantDetail(respon.data));

      
    } catch (error) {}
  };
  
};

const setTenantDetail = (data) => ({
  type: TENANTS_DETAIL,
  payload: {
    data,
  },
});
