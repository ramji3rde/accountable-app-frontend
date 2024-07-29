import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProjectList from "../../components/projects/list";
import Sort from "../../components/projects/sort";
import AddNew from "../../components/tenants/add_user_button";
import BottomNavigation from "../../components/public-com/bottom_navigation";
import SubHeader from "../../components/public-com/header";
import { getContractors } from "../../redux/action/contractors";
import { getTenantsFilter } from "../../redux/action/tenants";
import DefultScreen from "../../components/public-com/DefultScreen";
import { getProjectFilter } from "../../redux/action/projectFilter";
import { reactLocalStorage } from "reactjs-localstorage";

function ProjectsList() {
  const dispatch = useDispatch();

  const item = useSelector(
    (state) => state.projects.projects.any_record_created
  );

  useEffect(() => {
    let data = {
      posts_per_page: "-1",
      paged: "1",
      sort_by_field: "a-z",
      search_by_keyword: "",
    };
    dispatch(getProjectFilter(data));
    dispatch(getContractors(data));
    dispatch(getTenantsFilter(data));
  }, [dispatch]);

  const Manager = reactLocalStorage.get("user_role");

  return (
    <div className="App bg ">
      <SubHeader title={"Projects"} />

      {item === "yes" ? (
        <>
          {" "}
          <Sort /> <ProjectList />
          {Manager === "app_manager" ? null : (
            <AddNew href={"/projects/form"} />
          )}
        </>
      ) : (
        <DefultScreen
          Title={"Create a new project"}
          ButtonTitle={"Create Project"}
          ButtonUrl={"/projects/form"}
        />
      )}

      <BottomNavigation />
    </div>
  );
}

export default ProjectsList;
