import BottomNavigation from "../../components/public-com/bottom_navigation";
import SubHeader from "../../components/public-com/header";
// import Sort from "../../components/manager/sort";
import List from "../../components/manager/list";

function ManegerList() {
  return (
    <div className="">
      <SubHeader title={"Manager List"} />

      {/* <Sort /> */}
      <List />

      <BottomNavigation />
    </div>
  );
}

export default ManegerList;
