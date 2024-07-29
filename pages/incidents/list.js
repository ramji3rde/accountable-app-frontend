import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import IncidentsSort from "../../components/incidents/form/IncidentsSort";
import ListItem from "../../components/incidents/list_Item";
import AddNew from "../../components/tenants/add_user_button";
import BottomNavigation from "../../components/public-com/bottom_navigation";
import SubHeader from "../../components/public-com/header";
import { getContractors } from "../../redux/action/contractors";
import { getTenantsFilter } from "../../redux/action/tenants";
import { reactLocalStorage } from "reactjs-localstorage";
import { useSelector } from "react-redux";
import { getIncidents } from "../../redux/action/incidents";

function Incidentslist() {
  const dispatch = useDispatch();
  const clients = useSelector((state) => state?.incidents?.incidents);

  useEffect(() => {
    let data = {
      posts_per_page: "-1",
      paged: "1",
      sort_by_field: "a-z",
      search_by_keyword: "",
    };

    dispatch(getContractors(data));
    dispatch(getTenantsFilter(data));
    dispatch(getIncidents(data));
  }, [dispatch]);

  return (
    <>
      <SubHeader title={"Incidents"} />

      {clients.length > 0 && <IncidentsSort />}
      <ListItem />

      <BottomNavigation />
    </>
  );
}

export default Incidentslist;
